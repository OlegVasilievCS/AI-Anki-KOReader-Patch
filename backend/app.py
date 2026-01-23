import os
import re
from flask import Flask, request
from urllib.parse import unquote
from google import genai
from google.genai import types
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.environ.get('GEMINI_KEY')
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")


def get_supabase_client():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("CRITICAL: Supabase credentials missing.")
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"FAILED to connect to Supabase: {e}")
        return None


def parse_gemini_sentence(text):
    text_array = re.findall(r'{(.*?)}', text)
    return text_array[0].strip(), text_array[1].strip()


def insert_sentence_to_supabase(word, user_email, english, target):
    supabase = get_supabase_client()
    if not supabase: return


    data_to_insert = {
        "word": str(word),
        "email": str(user_email),
        "target_language": str(target),
        "translation_language": str(english)
    }

    supabase.table("anki_saved_words").insert(data_to_insert).execute()


def gemini_call(clean_word, user_email):

    client = genai.Client(api_key=GEMINI_API_KEY)

    prompt = (
        f"Use '{clean_word}' to make a short sentence in French for a learner. "
        f"Return the English translation first between curly-brackets and then "
        f"the French sentence between curly-brackets. Example: {{The cat is red}}{{Le chat est rouge}}"
    )

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )

    english, french = parse_gemini_sentence(response.text)

    insert_sentence_to_supabase(clean_word, user_email, english, french)

@app.route('/')
def home():
    return "Anki Backend is Active", 200


@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    user_email = request.form.get('email')


    clean_word = unquote(word)

    gemini_call(clean_word, user_email)

    return "OK", 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)