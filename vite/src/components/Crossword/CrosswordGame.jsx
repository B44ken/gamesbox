import testMini from './mini.json'

import { useEffect, useState } from 'react'

export default ({ supabaseClient }) => {
    const [data, setData] = useState(null)
    const [board, setBoard] = useState(null)

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

    const { board: svg, clues } = data.body[0]

    console.log(data)

    const formatClues = (clues, dir) =>
        clues
            .filter(c => c.direction == dir)
            .map(c => 
                <div key={c.cells}>
                    <b>({c.label})</b> {c.text[0].plain}
                </div>)

    const makeInputs = () => {
        const { width, height } = data.body[0].dimensions
        const contents = Array(width * height).fill('')
        const inputs = contents.map((_, i) => 
            <input key={i} type='text' maxLength={1} className='text-center border-2 border-white m-[-1px]' style={{
                width: 1/width * 100 + '%',
                height: 1/height * 100 + '%'
            }} onChange={e => console.log(e, i)} />)
        setBoard(contents)
        return inputs
    }

    makeInputs()

    return (
        <div>
            <h1>Crossword Game</h1>
            <div className='flex flex-row flex-grow justify-center h-1/3'>

                <div className="w-1/4 m-2 inline-block relative">
                    <div className="bg-white h-full" dangerouslySetInnerHTML={{ __html: svg }}></div>
                </div>
                <div className="w-1/4 m-2 inline-block">
                    <div><b>Down</b></div>
                    {formatClues(clues, 'Down')}
                    <br />
                    <div><b>Across</b></div>
                    {formatClues(clues, 'Across')}
                </div>
                <div className='w-1/4'>
                    { makeInputs() }
                </div>
            </div>
        </div>
    )
}