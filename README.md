📚 KOReader to Anki: Automated Language Learning Flow
This project creates a seamless bridge between reading on a mobile device / Kindle and building a high-quality Anki deck. With one tap on your e-reader, a word is sent to a backend that generates context, translates it, saves it to a database, and creates an Anki card with high-quality AI audio.

🔄 The Workflow
Selection (KOReader): Highlight a French word in any book on your e-reader.

Transmission: A custom Lua patch sends the word and your user email to a Flask backend.

AI Generation : Python calls Google Gemini to create a natural French sentence using that word and provides an English translation.

Database (Supabase): The word, sentence, and translation are logged for history and multi-device sync.

Anki Integration: The card is pushed to Anki via AnkiConnect.

🛠️ Technology Stack
Frontend (Embedded): Lua (KOReader Patch)

Backend: Python (Flask)

AI: Google Gemini API

Database: Supabase (PostgreSQL)

Flashcards: Anki + AnkiConnect

