import { GoogleGenAI } from "@google/genai";
import {buttonClasses} from "@mui/material";
import {supabase} from "../../supabaseClient.js";
import {useState} from 'react';

const GenerateSentenceButton = ({ dataFromDB, onGenerate}) => {

    const [loading, setLoading] = useState(false)


    async function handleGeneration() {
        setLoading(true)

        const gemeniKey = import.meta.env.VITE_GEMINI_KEY
        const ai = new GoogleGenAI({apiKey:gemeniKey});
        const MODEL_ID = ["gemini-3-pro-preview",
            "gemini-3-flash-preview",
            "gemini-2.5-pro",
            "gemini-2.5-flash",
            "gemini-2.5-flash-preview-09-2025",
            "gemini-2.5-flash-lite",
            "gemini-2.5-flash-lite-preview-09-2025",
            "gemini-1.5-flash",
            "gemini-2.0-flash",
            ]
        var aiTextOutput = null;

        for(var i = 0; i < MODEL_ID.length; i++){
            try {
                console.log(`Attempting ${MODEL_ID[i]}...`)

                const result = await ai.models.generateContent({
                    model: MODEL_ID[i],
                    contents: "Use " + dataFromDB.target_word + " to make a short sentence in French" +
                        " that is different from " + dataFromDB.target_lang + "for a French learner."
                        + "Return the English translation first between curly-brackets and then "
                        + "the French sentence between curly-brackets. Example: {{The cat is red}}{{Le chat est rouge}}",
                });

                if(result && result.text) {
                    aiTextOutput = result.text
                    console.log(MODEL_ID[i] + ' generated output')
                    console.log(aiTextOutput)
                    break
                }

            } catch (e){
                console.error(`Error with ${MODEL_ID[i]}:`, e.message);
                await new Promise(r => setTimeout(r, 2000));
            }
            }



        const regex = /{{(.*?)}}/g;
        const matches = [...aiTextOutput.matchAll(regex)].map(match => match[1]);

        const translation_language = matches[0]
        const target_language = matches[1]


        const{error} = await supabase
            .from('anki_saved_words')
            .update({
                target_language: target_language,
                translation_language: translation_language
            })
            .eq('id', dataFromDB.row_id)

        setLoading(false)

    }
    return(
        <button
            disabled={loading}
            onClick={handleGeneration}>
            {loading?'Loading':'Generate'}
        </button>
    )
}
export default GenerateSentenceButton