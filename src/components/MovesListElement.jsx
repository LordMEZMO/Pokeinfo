import React from 'react'
import { useEffect, useState } from 'react'
import Pokedex from 'pokedex-promise-v2'
import LoadingSpinner from './LoadingSpinner'

function MovesListElement({ name, url }) {
    const capitalize = (text) => {
        if (text.length > 0)
            return text.at(0).toUpperCase() + text.slice(1)
        else return ""
    }
    const format = (text) => text.replaceAll("-", " ").split(' ').map(word => capitalize(word)).join(' ')

    const [data, setData] = useState({})
    const [moveType, setMoveType] = useState("")
    const [target, setTarget] = useState("")
    const [moveName, setMoveName] = useState("")
    const [moveDesc, setMoveDesc] = useState([])
    const [effectChance, setEffectChance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setMoveName(format(name))
        const pokedex = new Pokedex()
        pokedex.getMoveByName(name === "pound" ? "1" : name).then((res) => {
            setData(res)
            setMoveType(res.type.name)
            setTarget(format(res.target.name))
            setMoveDesc(res.effect_entries)
            setEffectChance(res.effect_chance)
            setIsLoading(false)
        })

    }, [name, url])

    const replaceEffectChance = (desc) => desc.replace("$effect_chance", effectChance)

    const moveRow = <tr>
        <td><a href={url}>{moveName}</a></td>
        <td>{moveType}</td>
        <td>{data.accuracy}</td>
        <td>{data.power}</td>
        <td>{data.pp}</td>
        <td>{target}</td>
        <td>{moveDesc.map((desc, k) => <p key={k}>{replaceEffectChance(desc.short_effect)}</p>)}</td>
    </tr>
    
    const loadingMoveRow = <tr>
        <td colSpan={7} align='center'><LoadingSpinner/></td>
    </tr>

    return (isLoading ? loadingMoveRow : moveRow)
}

export default MovesListElement