import {supabase} from "../../supabaseClient.js";
import {Button} from "@mui/material";


const RemoveSentenceButton =  ({dataFromDB, onRemove}) => {
    async function RemoveSentence() {
        const {error} = await supabase
            .from('anki_saved_words')
            .update({remove_sentence: true})
            .eq('id', dataFromDB.row_id)

        onRemove(dataFromDB.row_id);

    }

    return (
        <Button
            variant="contained"
            size="small"
            onClick={ RemoveSentence }>
            Remove Sentence
        </Button>
    )

}
export default RemoveSentenceButton