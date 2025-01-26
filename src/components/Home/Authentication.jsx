import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link } from "react-router";

export default function Authentication({ supabaseClient }) {
    return (

    <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-1/3">
            <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
        </div>
        <Link to="/" className="outline-2 outline-white hover:outline-blue-400 hover:text-blue-400 text-white font-bold py-2 px-4 rounded-lg"> Back to Menu </Link> 
    </div>
);
}