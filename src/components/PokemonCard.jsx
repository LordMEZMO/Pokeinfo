import React from 'react'
import PokemonType from './PokemonType'
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function PokemonCard({ name, link }) {
	const capitalize = (text) => text.at(0).toUpperCase() + text.slice(1)
	const format = (text) => text.replaceAll("-", " ")

	const [types, setTypes] = useState([]);
	const [sprite, setSprite] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [pokemonId, setPokemonId] = useState(0)

	useEffect(() => {
		const pokedex = new Pokedex();
		setIsLoading(true)
		pokedex.getPokemonByName(name).then((data) => {
			setTypes(data.types)
			setPokemonId(data.id)
			fetch(data.sprites.front_default)
				.then((res) => res.blob())
				.then((imgBlob) => {
					let imgUrl = URL.createObjectURL(imgBlob)
					setSprite(imgUrl)
					setIsLoading(false)
				})
		})
	}, [link])


	return (
		<div className='card is-flex is-flex-direction-column is-justify-content-space-between'>
			<div className="card-image is-flex is-justify-content-center is-align-items-center">
				{!isLoading ?
					<figure className="image">
						<img src={sprite} alt="" />
					</figure> :
					<LoadingSpinner/>
				}

			</div>
			<div className="card-header is-flex-direction-column">
				<span className='tag '>#{pokemonId}</span>
				<h5 className="card-header-title rows">
					<a href={link} className="">{format(capitalize(name))}</a>
				</h5>
			</div>
			<div className='card-footer are-small'>
				{
					types.map((n, key) => {
						return <PokemonType type={capitalize(n.type.name)} key={key} />
					})
				}
			</div>
		</div>
	)
}

export default PokemonCard