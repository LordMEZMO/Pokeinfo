import React from 'react'
import PokemonType from './PokemonType'
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function PokemonCard({ name, link }) {
	const capitalize = (text) => text.at(0).toUpperCase() + text.slice(1)

	let [types, setTypes] = useState([]);
	let [sprite, setSprite] = useState()
	let [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const pokedex = new Pokedex();
		setIsLoading(true)
		pokedex.getPokemonByName(name).then((data) => {
			setTypes(data.types)
			fetch(data.sprites.front_default)
				.then((res) => res.blob())
				.then((imgBlob) => {
					let imgUrl = URL.createObjectURL(imgBlob)
					setSprite(imgUrl)
					setIsLoading(false)
				})
		})
	}, [])


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
			<div className="card-header">
				<h5 className="card-header-title">
					<a href={link}>{capitalize(name)}</a>
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