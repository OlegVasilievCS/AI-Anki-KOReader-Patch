import {supabase} from "../../supabaseClient.js";
import {Button} from "@mui/material";

export default function SendToAnkiButton({ dataFromDB, onAdd, deckValue }) {
    function handleClick(action, version, params={}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('error', () => reject('failed to issue request'));
            xhr.addEventListener('load', () => {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (Object.getOwnPropertyNames(response).length != 2) {
                        throw 'response has an unexpected number of fields';
                    }
                    if (response.error) {
                        throw response.error;
                    }
                    resolve(response.result);
                } catch (e) {
                    reject(e);
                }
            });

            xhr.open('POST', 'http://192.168.2.39:8765');
            xhr.send(JSON.stringify({action, version, params}));
        });
    }
    async function turn_card_added_true_on_DB() {
        const { error } = await supabase
            .from('anki_saved_words')
            .update({ added_to_anki: true })
            .eq('id', dataFromDB.row_id)

        onAdd(dataFromDB.row_id);


    }

    return (
        <Button
            variant="contained"
            size="small"
            onClick={async () => {
            try {
                console.log({deckValue})
                await turn_card_added_true_on_DB();
                const result = await handleClick('addNote', 6, {
                    "note": {
                        "deckName": deckValue,
                        "modelName": "Basic",
                        "fields": {
                            "Front": dataFromDB.trans_lang,
                            "Back": dataFromDB.target_lang,
                        }
                    }
                });
            } catch (err) {
                alert("Anki Error: " + err);
            }
        }}>
            Send To Anki
        </Button>
    );
}
