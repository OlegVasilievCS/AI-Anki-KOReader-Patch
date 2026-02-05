import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SavedWords from "./components/SavedWords.jsx";
import Layout from "./components/Layout.jsx";


function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
    };

    const signUp = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
                queryParams: {
                    prompt: 'select_account'
                }
            }
        });
    };

    if (!session) {
        return (
            <>
                {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />; */}
                <button onClick={signUp}>Sign in with Google</button>
            </>

        );
    } else {
        return (
            <div>
                <h2>Welcome, {session?.user?.email}</h2>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>

                            <Route index element={<Home />} />

                            <Route path="savedwords" element={<SavedWords />} />

                        </Route>
                    </Routes>
                </Router>
                <button onClick={signOut}>Sign out</button>
            </div>
        );
    }
}

export default App;