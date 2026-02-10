📚 Anki Language Flow
Automated card creation for readers.

Traditional card creation is slow. 

For 10 cards, you might spend 20 minutes writing. With this project, it takes 1-2 minutes, allowing you to stay in the "flow" of your reading.

🌟 Purpose
This project automates the creation of Anki cards so you can focus on reading. Whether you are reading a physical book or a digital file (EPUB/PDF) on a Kindle or Phone, you can instantly turn new vocabulary into high-quality flashcards with AI-generated context sentences.

💡 Why use this?
Language acquisition grows on comprehensible input. When we read material that interests us, we find and translate words. Learning these words makes future reading easier—like a snowball rolling down a hill, gathering momentum.

The Difference:

Without this project: Writing the word, finding a sentence, and creating both sides of a card for 10 words takes 15-20 minutes.

With this project: It takes 1-2 minutes. No pen or paper required.

🛠 Tools Required
Anki Desktop (Windows/Mac/Linux)

Android Phone (For the app) and/or Kindle (For KOReader)


Instructions:

For the physical books:
1. Download and install my App found here: https://storage.googleapis.com/anki-app/anki-app.apk 

2. Download and install the Anki desktop application found here:
 https://apps.ankiweb.net/
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/8e8d32b0-76f0-4a36-9d99-603c7d9d9167" />



3. Once the Anki desktop is installed, press “Create Deck” at the button, to create a deck.


4. Add the Anki Connect addon. Press ‘Tools’ -> ‘Add-ons’ -> ‘Get Add-ons’ and paste ‘2055492159’. You can see documentation on the addon here. https://ankiweb.net/shared/info/2055492159

Once the add-on ‘AnkiConnect’ is showing, press Config and paste the following:

{
"apiKey": null,
"apiLogPath": null,
"ignoreOriginList": [],
"webBindAddress": "0.0.0.0",
"webBindPort": 8765,
"webCorsOriginList": [
"http://localhost",
"http://localhost:5173",
"http://localhost:3000",
"https://anki-ai-web.web.app"
]
}

<img width="800" height="800" alt="image" src="https://github.com/user-attachments/assets/7defa15c-30cd-42fa-842c-c103a77ab234" />


5. Open the app on your phone and send a word.

   <img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/bce46615-add2-4fa6-a188-9431efdff0bc" />


6. Go to https://anki-ai-web.web.app/ and log in, this is the portal where you can manage the sentences and decks you want to use to create your cards.
7. Press ‘Create New Deck’ tab and enter the exact deck name you created at step 3.

   <img width="656" height="483" alt="image" src="https://github.com/user-attachments/assets/de956e1c-59a9-4788-b5b0-3e9b65ebb0f8" />


8. Now press the ‘Saved Words’ tab. If you like the generated sentence press ‘Send to Anki’ if you want to remove the sentence from the list press ‘Remove Sentence’ and if you want a different generated sentence press ‘Generate New Sentence’.

<img width="957" height="321" alt="image" src="https://github.com/user-attachments/assets/02775cc0-b014-404a-9392-7abe7b31ff98" />


For the non-physical books:

1. Download and install KOReader app here https://github.com/koreader/koreader/releases

   <img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/8134f098-d03f-4bd3-ba86-34f837508ec2" />


2. Download the KOReader patch and add-on from here:
https://storage.googleapis.com/anki-app/koreader.patch.zip


3. Once downloaded, open your file explorer on your phone and navigate to \koreader 

a. Place ‘2-Send-Word-Button.lua’ file from the zip in step 2 into \koreader\patches
(create the patches folder in case it does not exist)

<img width="895" height="526" alt="image" src="https://github.com/user-attachments/assets/1f20c3dc-ae89-4367-8994-4c7582b4dd4d" />


b. Place wordpusher.koplugin folder from the zip in step 2 in \koreader\plugins
(create the plugins folder in case it does not exist)


<img width="760" height="501" alt="image" src="https://github.com/user-attachments/assets/101eb8b2-f2ba-4d21-80f8-5dcbebc02ebe" />



4. Open the KOReader App and set up your email.
a. Click on the left tab and press ‘NEW:AI-Anki Configuration’

<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/eaf672f8-2c2e-4483-a871-9a6abaa0909d" />


b. Enter your email and press save.

<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/41a3fa2d-ba33-4c4c-9a3d-84ae84da098f" />

.

5. Now while reading press to select and word and click ‘Send to Flask’


<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/227210d6-2c39-499d-90f2-682e32d1e369" />




6. Download and install the Anki desktop application found here:
 https://apps.ankiweb.net/

<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/8e8d32b0-76f0-4a36-9d99-603c7d9d9167" />


7. Once the Anki desktop is installed, press “Create Deck” at the button, to create a deck.


8. Add the Anki Connect addon. Press ‘Tools’ -> ‘Add-ons’ -> ‘Get Add-ons’ and paste ‘2055492159’. You can see documentation on the addon here. https://ankiweb.net/shared/info/2055492159

Once the add-on ‘AnkiConnect’ is showing, press Config and paste the following:

{
"apiKey": null,
"apiLogPath": null,
"ignoreOriginList": [],
"webBindAddress": "0.0.0.0",
"webBindPort": 8765,
"webCorsOriginList": [
"http://localhost",
"http://localhost:5173",
"http://localhost:3000",
"https://anki-ai-web.web.app"
]
}

<img width="800" height="800" alt="image" src="https://github.com/user-attachments/assets/7defa15c-30cd-42fa-842c-c103a77ab234" />


9. Go to https://anki-ai-web.web.app/ and log in, this is the portal where you can manage the sentences and decks you want to use to create your cards.
10. Press ‘Create New Deck’ tab and enter the exact deck name you created at step 3.

       <img width="656" height="483" alt="image" src="https://github.com/user-attachments/assets/de956e1c-59a9-4788-b5b0-3e9b65ebb0f8" />


11. Now press the ‘Saved Words’ tab. If you like the generated sentence press ‘Send to Anki’ if you want to remove the sentence from the list press ‘Remove Sentence’ and if you want a different generated sentence press ‘Generate New Sentence’.

<img width="957" height="321" alt="image" src="https://github.com/user-attachments/assets/02775cc0-b014-404a-9392-7abe7b31ff98" />

