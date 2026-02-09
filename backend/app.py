import os
import re
import time
from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
from supabase import create_client
import firebase_admin
from firebase_admin import credentials, messaging

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.environ.get('GEMINI_KEY')
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# cred = credentials.Certificate('firebaseKey.json')
# firebase_admin.initialize_app(cred)
#
#
#
# def send_notification():
#     print("Sending FMC Notification")
#
#     message = messaging.Message(
#         notification=messaging.Notification(
#             title='New Message',
#             body='Hello Anton!'
#         ),
#         data={'score': '850', 'time': '2:45'},
#         token="user_token"
#     )
#     messaging.send(message)
#
#     print(cred.get_credential())

def get_supabase_client():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("CRITICAL: Supabase credentials missing from Environment Variables.")
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"FAILED to connect to Supabase: {e}")
        return None


def parse_gemini_sentence(text):
    text_array = re.findall(r'{(.*?)}', text)
    if len(text_array) < 2:
        return "Translation unavailable", text
    return text_array[0].strip(), text_array[1].strip()

def insert_token_to_supabase(user_email, token):
    supabase = get_supabase_client()
    if not supabase:
        print("❌ Error connecting the Database")
        return
    try:
        data_to_insert = {
            "email": str(user_email),
            "fcm_token": str(token)

        }
        result = supabase.table("user_fcm_tokens").upsert(data_to_insert).execute()


    except Exception as e:
        print(f" Supabase Error Adding Token: {e}")



def insert_input_word_to_supabase(word):
    supabase = get_supabase_client()
    if not supabase:
        print("❌ Error connecting the Database")
        return
    try:
        data_to_insert = {
            "word": str(word)
        }
        result = supabase.table("anki_saved_words").insert(data_to_insert).execute()

        return result.data[0].get('id')

    except Exception as e:
        print(f" Supabase Error: {e}")


def insert_sentence_to_supabase(insert_word_id, word, user_email, english, target):
    supabase = get_supabase_client()
    if not supabase:
        return

    try:
        data_to_insert = {
            "email": str(user_email),
            "target_language": str(target),
            "translation_language": str(english)
        }

        result = (supabase.table("anki_saved_words")
                  .update(data_to_insert)
                  .eq("id",insert_word_id)
                  .execute()
                  )

        if hasattr(result, 'data') and len(result.data) > 0:
            print(f"✅ SUCCESS: Saved '{word}' to Supabase. ID: {result.data[0].get('id')}")
        else:
            print("⚠️ DB ERROR: Insert sent but no data returned. Check RLS Policies.")
    except Exception as e:
        print(f"❌ SUPABASE ERROR: {e}")


def gemini_call(insert_word_id, clean_word, user_email):
    MODEL_ID = ["gemini-3-flash-preview",
                "gemini-2.5-pro",
                "gemini-2.5-flash",
                "gemini-3-pro-preview",
                "gemini-2.5-flash-preview-09-2025",
                "gemini-2.5-flash-lite",
                "gemini-2.5-flash-lite-preview-09-2025",
                "gemini-2.5-flash-preview-tts"]

    max_retries = len(MODEL_ID)
    for attempt in range(max_retries):
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            prompt = (
                f"Use '{clean_word}' to make a short sentence in French for a learner. "
                f"Return the English translation first between curly-brackets and then "
                f"the French sentence between curly-brackets. Example: {{The cat is red}}{{Le chat est rouge}}"
            )

            response = client.models.generate_content(model=MODEL_ID[attempt], contents=prompt)

            if response and response.text:
                english, french = parse_gemini_sentence(response.text)
                print(f"🤖 AI GENERATED: {french} ({english})")
                print(f"Generated with {MODEL_ID[attempt]}")
                insert_sentence_to_supabase(insert_word_id, clean_word, user_email, english, french)
                return
            else:
                print("❌ Gemini returned an empty response.")
                break

        except Exception as e:
            if "429" or "503" in str(e):
                print(f"⏳ Quota hit (429). Retry attempt {attempt + 1} in 10s...")
                time.sleep(20)
            else:
                print(f"❌ GEMINI ERROR: {e}")
                break


@app.route('/')
def home():
    return "Anki Backend is Active and Healthy!", 200

@app.route('/register-token', methods=['POST'])
def receive_token():
    json_data = request.get_json(silent=True)

    user_email = json_data.get('email')
    token = json_data.get('fcm_token')
    print(token)
    print("FCM:  " + token)
    insert_token_to_supabase(user_email, token)

    return {"status": "success", "message": "Token registered"}, 200

@app.route('/send', methods=['POST'])
def receive_word():
    # 1. Try to get data from JSON (Flutter)
    json_data = request.get_json(silent=True)

    if json_data:
        word = json_data.get('word')
        user_email = json_data.get('email')
        fcm = json_data.get('FCM')
    else:
        # 2. Try to get data from Form (Lua / KOReader)
        word = request.form.get('word')
        user_email = request.form.get('email')
        fcm = json_data.get('FCM')

    if not word or not user_email:
        print(f"❌ REJECTED: Missing data. Word: {word}, Email: {user_email}")
        return "Missing word or email", 400

    clean_word = unquote(word)
    print(fcm)
    print(f"📥 RECEIVED: {clean_word} from {user_email}. Processing...")

    insert_word_id = insert_input_word_to_supabase(word)

    gemini_call(insert_word_id, clean_word, user_email)

    return "OK", 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=8080)