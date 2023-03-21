import React from 'react'
import PokemonType from './PokemonType'
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';

function PokemonCard({name, link}) {
	const capitalize = (text) => text.at(0).toUpperCase() + text.slice(1)

	let [types, setTypes] = useState([]);
	
	useEffect(() => {
		const pokedex = new Pokedex();
		let getPokemonData = async () => {
            const data = await pokedex.getPokemonByName(name)
			setTypes(data.types)
			console.log(data);
        }

		getPokemonData()
	}, [])
	

  return (
	<div className='card'>
		<div className="card-header">
			<h5 className="card-header-title">
				<a href={link}>{capitalize(name)}</a>
			</h5>
		</div>
		<div className='card-footer tags are-small'>
			{
				types.map((n)=> {
					console.log(n);
					return <PokemonType type={capitalize(n.type.name)}/>
				})
			}
		</div>
	</div>
  )
}

export default PokemonCard