import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../helpers/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    console.log(session, "session");
    return (
        <AuthContext.Provider value={{ user: session?.user }}>
            {children}
        </AuthContext.Provider>
    );
}
