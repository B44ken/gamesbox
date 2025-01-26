import './App.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import LandingPage from './components/Home/LandingPage'
import Authentication from './components/Home/Authentication'
import MainScreen from './components/Games/MainScreen'
import { Link, redirect } from 'react-router'

const supabase = createClient(
    'https://gwignjjcacmcoiguekfm.supabase.co/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aWduampjYWNtY29pZ3Vla2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NDMzMzIsImV4cCI6MjA1MzQxOTMzMn0.PZcX2vtC6Ph0RgwMX7i-DEkldubOCTtlRCHo_UFznsU'
)

function App({ showWhichPage }) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session && showWhichPage === 'landing') {
        return <LandingPage />
    } else if (!session && showWhichPage === 'authentication') {
        return <Authentication supabaseClient={supabase} />
    } else if (session) {
        return <MainScreen supabaseClient={supabase} />
    }
}

export default App
