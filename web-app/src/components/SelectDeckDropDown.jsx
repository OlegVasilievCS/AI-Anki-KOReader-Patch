import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient.js";
import {embertest} from "globals";


const SelectDeckDropDown = ({deckValue, onDropDownChange}) => {
    const[deck, setDeck] = useState('')
    const [data, setData] = useState(null)
    const [fetchError, setFetchError] = useState('')



    useEffect( () => {
        // const userEmail = (await supabase.auth.getSession()).data.session.user.email
        // console.log(userEmail)

        const uploadDeckList  = async () => {
            const {data, error} = await supabase
                .from('user_decks')
                .select()
                .eq('email', (await supabase.auth.getSession()).data.session.user.email)
                .eq('deck_removed', 'False')

            if(!data){
                console.log(error)
                setData(null)
            }


            if(data){
                setData(data)
                console.log(data)
            }

        }
        uploadDeckList()
    }, []);

    const handleChange = (event) => {
        setDeck(event.target.value)
        onDropDownChange(event.target.value)

    }

    return(
        <div>
        {data && (
    <FormControl sx={{m: 1, minWidth: 200}}>
        <InputLabel id="label-id">Deck Name</InputLabel>
        <Select
            labelId="label-id"
            value={deckValue}
            label="Deck Name"
            onChange={handleChange}
        >
            {data.map((item) => <MenuItem value={item.deck_name}>{item.deck_name}</MenuItem>)}


        </Select>
    </FormControl>
        )
        }</div>
    )
}
export default SelectDeckDropDown