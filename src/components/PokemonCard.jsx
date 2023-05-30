import React from 'react'
import PokemonType from './PokemonType'
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Pokedex from 'pokedex-promise-v2'
import {usePokemonData, usePokemonSprite} from '../Helpers'
import { format } from '../utils/otherUtils';


function PokemonCard({ name, link, isShowStats }) {
	const {isLoading, data} = usePokemonData(name)
	const pokemonData = data ?? {types: [], id: null, stats: [], sprites: {}}
	const {data: sprite, isLoading: isSpriteLoading} = usePokemonSprite(name)

	const [types, setTypes] = useState([]);
	const [pokemonId, setPokemonId] = useState(0)
	const [stats, setStats] = useState([])

	useEffect(() => {
		setTypes(pokemonData.types)
		setPokemonId(pokemonData.id)
		setStats(pokemonData.stats)
	}, [pokemonData, name])

	return (
		<div className='card'>
			<div className="card-image is-flex is-justify-content-center is-align-items-center">
				{!isSpriteLoading ?
					<figure className="image">
						<img src={sprite} alt="" />
					</figure> :
					<LoadingSpinner />
				}

			</div>
			<div className="card-header is-flex-direction-column">
				<span className='tag '>#{pokemonId}</span>
				<h5 className="card-header-title rows">
					<Link to={"pokemon/" + name.toLowerCase()}>{format(name)}</Link>
				</h5>
			</div>

			{isShowStats ?
				<div className='card-content p-2'>
					<div className="content has-background-light is-size-7 px-2 py-1">
						{stats.map((x, k) =>
							<div className='is-flex is-justify-content-space-between is-align-content-center is-flex-wrap-wrap' key={k}>
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
						return <PokemonType type={n.type.name} key={key} />
					})
				}
			</div>
		</div>
	)
}

const areEqual = (prevProps, nextProps) => {
	return prevProps.pokemonData === nextProps.pokemonData && prevProps.name === nextProps.name && prevProps.isShowStats === nextProps.isShowStats;
  };

export default React.memo(PokemonCard, areEqual)