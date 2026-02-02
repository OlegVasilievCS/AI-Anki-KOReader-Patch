import {supabase} from "../../supabaseClient.js";


const RemoveSentenceButton =  ({dataFromDB, onRemove}) => {
    async function RemoveSentence() {
        const {error} = await supabase
            .from('anki_saved_words')
            .update({remove_sentence: true})
            .eq('id', dataFromDB.row_id)

        onRemove(dataFromDB.row_id);

    }

    return (
        <button onClick={ RemoveSentence }>
            Remove Sentence
        </button>
    )

}
export default RemoveSentenceButton