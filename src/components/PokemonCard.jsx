import React from 'react'
import PokemonType from './PokemonType'
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';

function PokemonCard({name, link}) {
	const capitalize = (text) => text.at(0).toUpperCase() + text.slice(1)

	let [types, setTypes] = useState([]);
	let [sprite, setSprite] = useState("")
	
	useEffect(() => {
		const pokedex = new Pokedex();

		let getPokemonData = async () => {
            const data = await pokedex.getPokemonByName(name)
			setTypes(data.types)
			setSprite(data.sprites.front_default)
        }

		getPokemonData()
	}, [])
	

  return (
	<div className='card is-flex is-flex-direction-column is-justify-content-space-between'>
		<div className="card-image">
		<figure className="image">
      		<img src={sprite} alt=""/>
    	</figure>
		</div>
		<div className="card-header">
			<h5 className="card-header-title">
				<a href={link}>{capitalize(name)}</a>
			</h5>
		</div>
		<div className='card-footer are-small'>
			{
				types.map((n, key)=> {
					return <PokemonType type={capitalize(n.type.name)} key={key}/>
				})
			}
		</div>
	</div>
  )
}

export default PokemonCard