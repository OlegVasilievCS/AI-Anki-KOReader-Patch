import { GoogleGenAI } from "@google/genai";
import {buttonClasses} from "@mui/material";

const GenerateSentenceButton = ({ dataFromDB, onGenerate}) => {


    async function generateSentence() {
        const gemeniKey = import.meta.env.VITE_GEMINI_KEY
        const ai = new GoogleGenAI({apiKey:gemeniKey});
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Explain how AI works in a few words",
        });
        console.log(response.text);
        alert(response.text)

    }
    return(
        <button onClick={generateSentence}>
            Generate
        </button>
    )
}
export default GenerateSentenceButton