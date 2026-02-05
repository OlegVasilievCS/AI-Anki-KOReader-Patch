import {Button} from "@mui/material";
import {useState} from "react";
import {supabase} from "../../supabaseClient.js";

const CreateDeckPage = () => {
    const [deckName, setDeckName] = useState('')

    const handleChange = (event) => {
        setDeckName(event.target.value);
    };

    async function addDeck(){
        const userEmail = await (await supabase.auth.getSession()).data.session.user.email
        const{error} = await supabase
            .from('user_decks')
            .insert({
                deck_name: deckName,
                email: userEmail
            })


    }

    return(
        <div>
            <Button
                variant="contained"
                size="small" onClick={addDeck}>
                Create
            </Button>

            <input type="text"
                   value={deckName}
                   onChange={handleChange}/>
        </div>
    )
}

export default CreateDeckPage