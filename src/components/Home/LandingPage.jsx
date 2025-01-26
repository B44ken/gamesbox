import { Auth } from "@supabase/auth-ui-react";
import { useState } from "react";
import { Link } from "react-router";

export default function LandingPage({ supabaseClient }) {
    const [showAuth, setShowAuth] = useState(false);
    function signIn() {
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-white/50 mb-4 align-text-top">Games Box</h1>
        <p className="mb-8">To see games and stuff create an account or login.</p>
        <Link className="outline-2 outline-white hover:outline-blue-400 hover:text-blue-400 text-white font-bold py-2 px-4 rounded-lg" to="/authentication">Login/Signup</Link>
        </div>
    );
}