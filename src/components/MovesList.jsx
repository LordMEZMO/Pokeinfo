import React from 'react'
import { useState, useEffect } from 'react'
import Pokedex from 'pokedex-promise-v2'
import MovesListElement from './MovesListElement'

function MovesList() {
    const [movesList, setMovesList] = useState([])

    useEffect(() => {
        const pokedex = new Pokedex()
        pokedex.getMovesList().then((data) => {
            setMovesList(data.results)
        })
    }, [])

    return (
        <div>
            <center><b><h1>Moves</h1></b></center>
            <table className='table' width={'100%'}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Accuracy</th>
                        <th>Power</th>
                        <th><span data-tooltip="Power Points" className='has-tooltip-top has-tooltip-arrow'>PP</span></th>
                        <th>Target</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {movesList.map((move, k) =>
                        <MovesListElement name={move.name} url={move.url} key={k} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MovesList