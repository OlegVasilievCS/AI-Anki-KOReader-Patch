import {Button} from "@mui/material";
import {supabase} from "../../supabaseClient.js";

const RemoveDeckButton = ({dataFromDB, onUpdate}) => {

    async function removeDeck(){
        const{error} = await supabase
            .from("user_decks")
            .update({deck_removed: true})
            .eq('id', dataFromDB.deckId)

        onUpdate(dataFromDB.deckId)
    }

    return(
        <div>
            <Button
                variant="contained"
                size="small"
                onClick={removeDeck}
            >
                Delete Deck
            </Button>
        </div>
    )
}

export default RemoveDeckButton