import testMini from './mini.json'

import { useEffect, useState } from 'react'

export default ({ supabaseClient }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseClient.from('nyt_data')
                .select('json').eq('game', 1).eq('date', '2025-01-27')

            if (error)
                console.error(error)
            else if(data.length == 0)
                console.error('No data found')
            else
                setData(data[0].json)
        })()
    }, [])

    if (!data)
        return <div>Loading</div>
    
    const svg = data.body[0].board

    return (
        <div>
            <h1>Crossword Game</h1>
            <div className='w-1/2 bg-white' dangerouslySetInnerHTML={{ __html: svg }}></div>
        </div>
    )
}