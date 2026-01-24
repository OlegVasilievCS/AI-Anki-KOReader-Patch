import os
import re
from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.environ.get('GEMINI_KEY')
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_PUBLISHABLE_KEY")



def get_supabase_client():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("CRITICAL: Supabase credentials missing from environment.")
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"FAILED to connect to Supabase: {e}")
        return None


def parse_gemini_sentence(text):
    text_array = re.findall(r'{(.+?)}', text)
    if len(text_array) < 2:
        return text, text  # Fallback if parsing fails
    return text_array[0], text_array[1]


def insert_sentence_to_supabase(word, user_email, english, target):
    supabase = get_supabase_client()
    if not supabase:
        return

    supabase.table("anki_saved_words").insert({
        "word": str(word),
        "email": str(user_email),
        "target_language": str(target),
        "translation_language": str(english)
    }).execute()


def gemini_call(clean_word, user_email):
    if not GEMINI_API_KEY:
        print("ERROR: Gemini API Key missing.")
        return

    client = genai.Client(api_key=GEMINI_API_KEY)
    prompt = (
        f"Use '{clean_word}' to make a sentence in French for a learner. "
        f"Return the English translation first between curly-brackets and then "
        f"the French sentence between curly-brackets."
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    english, french = parse_gemini_sentence(response.text)
    print(f"Generated: {french} ({english})")
    insert_sentence_to_supabase(clean_word, user_email, english, french)



@app.route('/')
def home():
    status = "READY" if (SUPABASE_URL and GEMINI_API_KEY) else "MISSING_KEYS"
    return f"Server is running! (Status: {status})", 200


@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    user_email = request.form.get('email')

    if not word or not user_email:
        return "Missing data", 400

    clean_word = unquote(word)
    print(f"[SUCCESS] Processing: {clean_word} for {user_email}")

    gemini_call(clean_word, user_email)

    return "OK", 200



if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)