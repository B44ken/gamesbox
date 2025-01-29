import { useEffect, useState } from 'react'

export default ({ supabaseClient }) => {
    const [data, setData] = useState(null)
    const [cell, setCell] = useState(null)
    const [start, setStart] = useState(null) // todo
    const [answers, setAnswers] = useState({})


    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseClient.from('nyt_data')
                .select('json').eq('game', 1).eq('date', '2025-01-27')

            if (error)
                console.error(error)
            else if (data.length == 0)
                console.error('No data found')
            else
                setData(data[0].json)
        })()
    }, [])

    if (!data)
        return <div>Loading</div>

    const { board: svg, clues, cells } = data.body[0]

    const formatClues = () => {
        const formatClue = (label, clue, highlight) =>
            <div key={label}>
                <b>({label})</b> {highlight && <b> {clue} </b> || <span> {clue} </span>}
            </div>

        const directions = { Down: [], Across: [] }

        for(let i = 0; i < clues.length; i++) {
            const highlights = cells[cell]?.clues || []
            const el = formatClue(clues[i].label, clues[i].text[0].plain, highlights.includes(i))

            directions[clues[i].direction].push(el)
        }

        return <div>
            <b>Down</b> {directions.Down}
            <br />
            <b>Across</b> {directions.Across}
        </div>
    }

    const makeInputs = () => {
        const setAnswer = ({ target }) =>
            setAnswers({ ...answers, [cell]: target.value.toUpperCase() })

        const { width, height } = data.body[0].dimensions
        const contents = Array(width * height).fill('')
        const inputs = contents.map((_, i) => 
            <input key={i} maxLength={1} onSelect={() => setCell(i)} onChange={setAnswer} value={answers[i] || ''}
                className={`text-center text-black text-xl w-1/${width} aspect-square`} />)
        return inputs
    }

    const didWin = () => {
        // todo
    }


    return (
        <div>
            <h1>Crossword Game</h1>
            <div className='flex flex-row flex-grow justify-center h-1/3'>

                <div className="w-1/3 m-2 inline-block relative">
                    <div className="bg-white w-full absolute" dangerouslySetInnerHTML={{ __html: svg }}></div>
                    <div style={{ position: 'absolute' }}>
                        { makeInputs() }
                    </div>
                </div>
                <div className="w-1/3 m-2 inline-block">
                    { formatClues() }
                </div>
            </div>
        </div>
    )
}