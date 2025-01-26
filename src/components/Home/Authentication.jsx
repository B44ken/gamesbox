import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Authentication({ supabaseClient }) {
    return (

    <div className="h-screen flex justify-center items-center">
        <div className="w-1/3">
            <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
        </div>
    </div>
);
}