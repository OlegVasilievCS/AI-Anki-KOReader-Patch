import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient.js";
import Deck from "../components/Deck.jsx";
import RemoveDeckButton from "../components/RemoveDeckButton.jsx";

const CreateDeckPage = () => {
    const [deckName, setDeckName] = useState('')
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('user_decks')
                .select()
                .eq('email', (await supabase.auth.getSession()).data.session.user.email)
                .eq('deck_removed', false)


            if (error) {
                setFetchError('Could not fetch the records')
                setData(null)
                console.log(error)
            }
            if (data) {
                setData(data)
                setFetchError(null)
                console.log(data)
            }
        }
        fetchData()
    }, []);

    const handleChange = (event) => {
        setDeckName(event.target.value);
    };

    function updateList(deckId){
        if(!data){
            return
        }
        setData(data.filter((item) => item.id !== deckId))
    }


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
            <div>
                Your Deck List:
                <br/>
                {
                    data.map((item) => (
                        <div>
                            <Deck dataFromDB={{
                                deckId: item.id,
                                deckName: item.deck_name
                            }}/>
                            <RemoveDeckButton
                                onUpdate = {updateList}

                                dataFromDB={{
                                deckId: item.id,
                                deckName: item.deck_name

                            }}/>
                        </div>
                    ))}
                <br/>


            </div>
        </div>
    )
}

export default CreateDeckPage