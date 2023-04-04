import React from 'react'
import { useEffect, useState } from 'react'
import Pokedex from 'pokedex-promise-v2'

function MovesListElement({name, url}) {
    const capitalize = (text) => {
        if(text.length > 0)
            return text.at(0).toUpperCase() + text.slice(1)
        else return ""
    }
	const format = (text) => text.replaceAll("-", " ").split(' ').map(word => capitalize(word)).join(' ')
    
    const [data, setData] = useState({})
    const [moveType, setMoveType] = useState("")
    const [target, setTarget] = useState("")
    const [moveName, setMoveName] = useState("")

    useEffect(() => {
        setMoveName(format(name))
        const pokedex = new Pokedex()
        pokedex.getMoveByName(name).then((res) => {
            setData(res)
            setMoveType(res.type.name)
            setTarget(format(res.target.name))
        })
    }, [name, url])
    

    return (
        <tr>
            <td><a href={url}>{moveName}</a></td>
            <td>{moveType}</td>
            <td>{data.accuracy}</td>
            <td>{data.power}</td>
            <td>{data.pp}</td>
            <td>{target}</td>
        </tr>
    )
}

export default MovesListElement