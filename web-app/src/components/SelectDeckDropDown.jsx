import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {useState} from "react";


const SelectDeckDropDown = () => {
    const[deck, setDeck] = useState('')

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