import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import { useEffect, useState } from "react";
import {supabase} from "../../supabaseClient.js";
import SavedWordCard from "./SavedWordCard.jsx";


const SavedWords = () => {
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('anki_saved_words')
                .select()
                .eq('email', (await supabase.auth.getSession()).data.session.user.email)
                .eq('added_to_anki', 'False');


            if (error) {
                setFetchError('Could not fetch the records')
                setData(null)
                console.log(error)
            }
            if (data) {
                setData(data)
                setFetchError(null)
            }
        }
        fetchData()

    }, []);

    return (
       <div>
           {fetchError && (<p>{fetchError}</p>)}
           {data && (
               <div>
                   {data.map(data => (
                       <div>
                           <SavedWordCard dataFromDB={{
                               target_lang: data.target_language,
                               trans_lang: data.translation_language,
                               row_id: data.id
                           }}/></div>
                   ))}
                   <br/>
               </div>
           )}


       </div>

    );
}
export default SavedWords
