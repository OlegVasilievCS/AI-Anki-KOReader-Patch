from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
import os, re
from supabase import create_client, Client

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_KEY')

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
supabase: Client = create_client(url, key)


app = Flask(__name__)

def insert_sentence_to_supabase(word, user_email, english_sentence, target_language_sentence):
    response = (
        supabase.table("anki_saved_words")
        .insert({"word": str(word),
                 "email": str(user_email),
                 "target_language": str(target_language_sentence),
                 "translation_language": str(english_sentence)})
        .execute()
    )

def gemini_call(clean_word, user_email):
    client = genai.Client(api_key=GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents=f"Use {clean_word} to make a sentence in French for someone trying to "
                                                 f"learn the french language. Also return a translation of the french sentence in English"
                                                 f"Have the English sentence first between curly-brackets and then the French sentence between"
                                                 f"curly-brackets."
    )
    english_sentence, target_language_sentence = parse_gemini_sentence(response.text)
    print(english_sentence)
    print(target_language_sentence)
    insert_sentence_to_supabase(clean_word, user_email, english_sentence, target_language_sentence)

def parse_gemini_sentence(text):
    text_array = re.findall('{(.+?)}', text)
    english_sentence = text_array[0]
    target_language_sentence = text_array[1]
    return english_sentence, target_language_sentence

@app.route('/')
def home():
    return "Server is running!", 200

@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    user_email = request.form.get('email')
    clean_word = unquote(word)
    print(f"\n[SUCCESS] Received: {clean_word} from {user_email}")
    gemini_call(clean_word, user_email)
    return "OK", 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))

    app.run(host='0.0.0.0', port=port)