from flask import Flask, request
from urllib.parse import unquote
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_KEY')


app = Flask(__name__)

def gemini_call(clean_word):
    client = genai.Client(api_key=GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents=f"Use {clean_word} to make a sentence in French for someone trying to "
                                                 f"learn the french language. Do not put anything like **, "
                                                 f"and only return the sentence in French"
    )
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