from flask import Flask, request
from urllib.parse import unquote

app = Flask(__name__)

@app.route('/send', methods=['POST'])
def receive_word():
    word = request.form.get('word')
    clean_word = unquote(word)
    print(f"\n[SUCCESS] Received: {clean_word}")
    return "OK", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)