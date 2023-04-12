import React from 'react'
import PokemonType from './PokemonType'
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

function PokemonCard({ name, link, isShowStats, cacheMap }) {
	const capitalize = (text) => {
		if (text.length > 0)
			return text.at(0).toUpperCase() + text.slice(1)
		else return ""
	}
	const format = (text) => text.replaceAll("-", " ").split(' ').map(word => capitalize(word)).join(' ')

	const [types, setTypes] = useState([]);
	const [sprite, setSprite] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [pokemonId, setPokemonId] = useState(0)
	const [stats, setStats] = useState([])

	const getPokemonData = (pokemonName) => {
		return new Promise((myResolve, myReject) => {
			if (!cacheMap.has(pokemonName)) {
				const pokedex = new Pokedex();
				pokedex.getPokemonByName(name).then((data) => {
					if (data.sprites.front_default != null) {
						fetch(data.sprites.front_default)
							.then((res) => res.blob())
							.then((imgBlob) => {
								let imgUrl = URL.createObjectURL(imgBlob)
								data.imgURL = imgUrl
								setSprite(imgUrl)
							})
					} else {
						pokedex.getPokemonSpeciesByName(data.species.name).then((name) => {
							pokedex.getPokemonByName(name.varieties.find(variety => variety.is_default).pokemon.name).then((data) => {
								fetch(data.sprites.front_default)
									.then((res) => res.blob())
									.then((imgBlob) => {
										let imgUrl = URL.createObjectURL(imgBlob)
										data.imgURL = imgUrl
										setSprite(imgUrl)
									})
							})
						})
					}



					cacheMap.set(pokemonName, data)
					myResolve(data)
				})
			} else {
				console.log(cacheMap);
				myResolve(cacheMap.get(pokemonName))
			}
		}
		)

	}

	useEffect(() => {
		setIsLoading(true)
		getPokemonData(name).then((data) => {
			console.log(data);
			setTypes(data.types)
			setPokemonId(data.id)
			setStats(data.stats)
			setSprite(data.imgURL)
			setIsLoading(false)			
		}, (error) => console.error(error))
	}, [link, name])


	return (
		<div className='card'>
			<div className="card-image is-flex is-justify-content-center is-align-items-center">
				{!isLoading ?
					<figure className="image">
						<img src={sprite} alt="" />
					</figure> :
					<LoadingSpinner />
				}

			</div>
			<div className="card-header is-flex-direction-column">
				<span className='tag '>#{pokemonId}</span>
				<h5 className="card-header-title rows">
					<Link to={"pokemon/" + format(name).toLowerCase()}>{format(name)}</Link>
				</h5>
			</div>

			{isShowStats ?
				<div className='card-content p-2'>
					<div className="content has-background-light is-size-7 px-2 py-1">
						{stats.map((x) =>
							<div className='is-flex is-justify-content-space-between is-align-content-center is-flex-wrap-wrap'>
								<p>{x.stat.name.toUpperCase()}</p>
								<p>{x.base_stat}</p>
							</div>
						)}
					</div>
				</div>
				: ""
			}

			<div className='card-footer are-small' style={{ justifySelf: 'flex-end' }}>
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