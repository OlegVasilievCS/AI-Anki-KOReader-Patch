import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient.js";
import {embertest} from "globals";


const SelectDeckDropDown = () => {
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
    }

    return(
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="label-id">Deck Name</InputLabel>
            <Select
                labelId="label-id"
                value={deck}
                label="Deck Name"
                onChange={handleChange}
            >
                <MenuItem value="New">New</MenuItem>

            </Select>
        </FormControl>
    )
}
export default SelectDeckDropDown