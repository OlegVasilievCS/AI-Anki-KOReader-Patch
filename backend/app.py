from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_KEY')

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
supabase: Client = create_client(url, key)


app = Flask(__name__)

def insert_sentence_to_supabase(word, sentence):
    response = (
        supabase.table("anki_saved_words")
        .insert({"word": str(word), "email": "voleg239@gmail.com", "sentence": str(sentence)})
        .execute()
    )

def gemini_call(clean_word):
    client = genai.Client(api_key=GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents=f"Use {clean_word} to make a sentence in French for someone trying to "
                                                 f"learn the french language. Do not put anything like **, "
                                                 f"and only return the sentence in French"
    )
    insert_sentence_to_supabase(clean_word, response.text)
    print(response.text)

@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    clean_word = unquote(word)
    print(f"\n[SUCCESS] Received: {clean_word}")
    gemini_call(clean_word)
    return "OK", 200




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)