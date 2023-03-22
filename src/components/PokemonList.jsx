import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Pokedex from 'pokedex-promise-v2';

export default function PokemonList() {
	const [pokeList, setPokeList] = useState([]);

	useEffect(() => {
        const pokedex = new Pokedex();
        pokedex.getPokemonsList().then((data) => {
            setPokeList(data.results)
        })
	}, []);

	return (
        <div className='is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-content-space-evenly' style={{gap: '10px'}}>
            {pokeList.map((p, k) => <PokemonCard name={p.name} link={p.url} key={k} />)}
        </div>
    )
}
