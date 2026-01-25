import os
import re
import time
from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.environ.get('GEMINI_KEY')
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")


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


def insert_sentence_to_supabase(word, user_email, english, target):
    supabase = get_supabase_client()
    if not supabase: return

    try:
        data_to_insert = {
            "word": str(word),
            "email": str(user_email),
            "target_language": str(target),
            "translation_language": str(english)
        }

        result = supabase.table("anki_saved_words").insert(data_to_insert).execute()

        if hasattr(result, 'data') and len(result.data) > 0:
            print(f"SUCCESS: Saved '{word}' to Supabase. ID: {result.data[0].get('id')}")
        else:
            print("️DB ERROR: Insert sent but no data returned. Check RLS Policies.")
    except Exception as e:
        print(f"SUPABASE ERROR: {e}")


def gemini_call(clean_word, user_email):
    MODEL_ID = "gemini-3-flash-preview"

    max_retries = 3
    for attempt in range(max_retries):
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            prompt = (
                f"Use '{clean_word}' to make a short sentence in French for a learner. "
                f"Return the English translation first between curly-brackets and then "
                f"the French sentence between curly-brackets. Example: {{The cat is red}}{{Le chat est rouge}}"
            )

            response = client.models.generate_content(model=MODEL_ID, contents=prompt)

            if response and response.text:
                english, french = parse_gemini_sentence(response.text)
                print(f"AI GENERATED: {french} ({english})")
                insert_sentence_to_supabase(clean_word, user_email, english, french)
                return
            else:
                print("Gemini returned an empty response.")
                break

        except Exception as e:
            if "429" in str(e):
                print(f"⏳ Quota hit (429). Retry attempt {attempt + 1} in 10s...")
                time.sleep(20)
            else:
                print(f"GEMINI ERROR: {e}")
                break


@app.route('/')
def home():
    return "Anki Backend is Active and Healthy!", 200


@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    user_email = request.form.get('email')

    if not word or not user_email:
        return "Missing word or email", 400

    clean_word = unquote(word)
    print(f"RECEIVED: {clean_word}. Processing now...")

    gemini_call(clean_word, user_email)

    return "OK", 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)