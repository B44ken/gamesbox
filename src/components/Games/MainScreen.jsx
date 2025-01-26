import { useState, useEffect } from 'react'

function GameCard({ game }) {
    return (
        <div key={game.id} className="bg-white rounded-lg m-2 pb-2">
            <img
                src={'https://placehold.co/200x150'}
                alt="Game"
                className="rounded-t-lg"
            />
            <p className="text-black/75 p-4 text-center text-2xl font-extrabold">{game.name}</p>
            <div className="mx-2">
                <button className="w-full outline-2 outline-black/75 hover:outline-blue-400 text-black/75 font-bold py-2 px-4 rounded-3xl">
                    Play
                </button>
            </div>
        </div>
    )
}

export default function MainScreen({ supabaseClient }) {
    async function signOut() {
        const { error } = await supabaseClient.auth.signOut()
    }

    const [games, setGames] = useState([])

    useEffect(() => {
        async function fetchGames() {
            const { data, error } = await supabaseClient.from('games').select()
            if (error) {
                console.error('Error fetching games:', error)
                setGames(null) // Or handle the error appropriately
            }

            setGames(data)
        }
        fetchGames()
    }, [])

    console.log(games)

    return (
        <>
            <div className="static w-screen left-0 top-0">
                <h1 className="flex justify-center text-white/50 mb-4">
                    Games Box
                </h1>
                <button
                    className="absolute right-2 top-3 outline-2 outline-white hover:outline-blue-400 hover:text-blue-400 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={signOut}
                >
                    Sign out
                </button>
            </div>

            <div className="flex flex-wrap justify-center">
                {games.map((g) => (
                    <GameCard game={g} />
                ))}
            </div>
        </>
    )
}
