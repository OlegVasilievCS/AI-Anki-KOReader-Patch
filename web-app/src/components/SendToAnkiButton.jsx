import {supabase} from "../../supabaseClient.js";

export default function SendToAnkiButton({ dataFromDB }) {
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

            xhr.open('POST', 'http://127.0.0.1:8765');
            xhr.send(JSON.stringify({action, version, params}));
        });
    }
    async function turn_card_added_true_on_DB() {
        const { error } = await supabase
            .from('anki_saved_words')
            .update({ added_to_anki: true })
            .eq('id', dataFromDB.row_id)

    }

    return (
        <button onClick = {() => { alert(dataFromDB.row_id);
            turn_card_added_true_on_DB();
            handleClick('addNote', 6, {
            "note": {
                    "deckName": "test1",
                    "modelName": "Basic",
                    "fields": {
                        "Front": dataFromDB.trans_lang,
                        "Back": dataFromDB.target_lang
                    }
            }
            })}}
        >
            Send To Anki
        </button>
    );
}
