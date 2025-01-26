

function gameCard(game) {
    return (
        <div key={game.id} className="bg-white rounded-lg m-2 pb-2">
            <img src={game.img} alt="Game" className="rounded-t-lg" />
            <p className="text-black/75 p-4">{game.description}</p>
            <div className="mx-2"><button className="w-full outline-2 outline-black/75 hover:outline-blue-400 text-black/75 font-bold py-2 px-4 rounded-3xl">Play</button></div>
        </div>
    );
}

export default function MainScreen({ supabaseClient }) {
    async function signOut() {
        const { error } = await supabaseClient.auth.signOut()
    }

    const games = [
        { id: 1, img: "https://placehold.co/200x175", description: "This is a game" },
        { id: 2, img: "https://placehold.co/200x175", description: "This is another game" },
        { id: 3, img: "https://placehold.co/200x175", description: "This is a third game" },
    ];

    return (
        <>
        <div className="static w-screen left-0 top-0">
            <h1 className="flex justify-center text-white/50 mb-4">Games Box</h1>
            <button className="absolute right-2 top-3 outline-2 outline-white hover:outline-blue-400 hover:text-blue-400 text-white font-bold py-2 px-4 rounded-lg" onClick={signOut}>Sign out</button>
        </div>

        <div className="flex flex-wrap justify-center">
            {games.map(gameCard)}
        </div>
        </>
    );
}