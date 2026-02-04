import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import { useEffect, useState } from "react";
import {supabase} from "../../supabaseClient.js";
import SavedWordCard from "./SavedWordCard.jsx";


const SavedWords = () => {
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)

    function removeSentence(idToRemove) {
        if(!data){
            return;
        }
        setData(data.filter((entries) => entries.id !== idToRemove))

    }
    function addSentence(idToAdd){
        if(!data) {
            return;
        }
        setData(data.filter((item) => idToAdd !== item.id))
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('anki_saved_words')
                .select()
                .eq('email', (await supabase.auth.getSession()).data.session.user.email)
                .eq('added_to_anki', 'False')
                .eq('remove_sentence', 'False');


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
                   {data.map(item => (
                       <div>
                           <SavedWordCard
                               onRemove={removeSentence}
                               onAdd={addSentence}
                               onGenerate={removeSentence}

                               dataFromDB={{
                               target_word: item.word,
                               target_lang: item.target_language,
                               trans_lang: item.translation_language,
                               row_id: item.id
                           }}/></div>
                   ))}
                   <br/>
               </div>
           )}


       </div>

    );
}
export default SavedWords
