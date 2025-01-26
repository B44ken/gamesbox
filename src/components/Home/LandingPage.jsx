import { Auth } from "@supabase/auth-ui-react";
import { useState } from "react";

export default function LandingPage({ supabaseClient }) {
    const [showAuth, setShowAuth] = useState(false);
    function signIn() {
        setShowAuth(true);
    }

    return (
        <div>
        {!showAuth && <><h1 className="text-white/50 mb-4 align-text-top">Games Box</h1>
        <p className="mb-8">To see games and stuff create an account or login.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={signIn}>Login</button></>}
        {showAuth && <Auth supabaseClient={supabaseClient} />}
        </div>
    );
}