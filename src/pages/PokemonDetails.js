import { useState, useEffect, useReducer, useCallback } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import Pokedex from 'pokedex-promise-v2';
import LoadingSpinner from '../components/LoadingSpinner';
import {saveJSON, deleteJSON, isFavourite} from '../utils/storageUtils';

export default function PokemonDetails() {
    let {name} = useParams();

	const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
	const [sprite, setSprite] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [pokemonId, setPokemonId] = useState(0)
	const [stats, setStats] = useState([])
	const [indices, setIndices] = useState([])
	const [moves, setMoves] = useState([])
	const [favourite, setFavourite] = useState();

	const toggleFavourite = useCallback(() => {
		const key = `pokemon:${pokemonId}`;
		if(isFavourite(key)){
			deleteJSON(key);
		}
		else {
			saveJSON(key, {
				pokemonId,
				name
			});
		}
		setFavourite(state => !state);
	}, [favourite])

    useEffect(() => {
		const pokedex = new Pokedex();
		setIsLoading(true)
		pokedex.getPokemonByName(name).then((data) => {
			setAbilities(data.abilities)
			setTypes(data.types)
			setPokemonId(data.id)
			setStats(data.stats)
			setIndices(data.game_indices)
			setMoves(data.moves)
			setFavourite(isFavourite(`pokemon:${pokemonId}`))
			if (data.sprites.other.dream_world.front_default != null) {
				fetch(data.sprites.other.dream_world.front_default)
					.then((res) => res.blob())
					.then((imgBlob) => {
						let imgUrl = URL.createObjectURL(imgBlob)
						setSprite(imgUrl)
						setIsLoading(false)
					})
			} else {
				pokedex.getPokemonSpeciesByName(data.species.name).then((name) => {
					pokedex.getPokemonByName(name.varieties.find(variety => variety.is_default).pokemon.name).then((data) => {
						fetch(data.sprites.front_default)
							.then((res) => res.blob())
							.then((imgBlob) => {
								let imgUrl = URL.createObjectURL(imgBlob)
								setSprite(imgUrl)
								setIsLoading(false)
							})
					})
				})
			}
		})
	}, [name, favourite])

	const capitalize = (text) => {
        if(text.length > 0)
            return text.at(0).toUpperCase() + text.slice(1)
        else return ""
    }

	const listAbilities = abilities.map((ab, k) => {
		return (
			<tr key={k}>
				<td>{ab.ability.name}</td>
				<td>
					{ab.is_hidden ? "yes" : "no"}
				</td>
			</tr>
		)
	})

    return (
        <div className="App">
            <section>
                <article>
					<h4 className='title is-4'>Here's all about {capitalize(name)}:</h4>
                    <div className="card-image is-flex is-justify-content-center is-align-items-center">
                        {!isLoading ? 
                            <figure className="image">
                                <img src={sprite} alt=""/>
                            </figure> :
                            <LoadingSpinner/>
                        }
                    </div>
                    <h5 className='tag subtitle is-5'>Pokemon ID: {pokemonId}</h5>
					<div className='buttons'>
						<button 
							className='subtitle button is-6'
							onClick={toggleFavourite}
						>
							{!favourite ? "Add to favourites" : "Unfavourite"}
						</button>
					</div>
					
					<h5 className='subtitle is-5'>Stats ({stats.length})</h5>
					<table className='table'>
						<thead>
							<tr>
								<th>base stat</th>
								<th>effort</th>
								<th>name</th>
							</tr>
						</thead>
						<tbody>
						{
							stats ? stats.map((stat, k) => {
								return (
									<tr key={k}>
										<td>{stat.base_stat}</td>
										<td>{stat.effort}</td>
										<td>{stat.stat.name}</td>
									</tr>
								)
							}) : <tr><td colSpan="3">none</td></tr>
						}
						</tbody>
					</table>

					<h5 className='moves'>Moves ({moves.length})</h5>
					<div className='is-flex is-flex-wrap-wrap  is-align-content-space-evenly is-justify-content-space-evenly'>
					{
							moves ? moves.map((move, k) => {
								return (
									<div key={k} className='card-image is-flex is-justify-content-center'>
										<a href={move.move.url}>{move.move.name}</a>
									</div>
								)
							}) : <div>none</div>
						}
					</div>

					<h5 className='subtitle is-5'>Abilities ({abilities.length})</h5>
					<table className='table'>
						<thead>
							<tr>
								<th>name</th>
								<th>hidden</th>
							</tr>
						</thead>
						<tbody>
							{listAbilities ? listAbilities : 
							<tr><td colSpan={2}>none</td></tr>}
						</tbody>
					</table>
					
                    <h5 className='subtitle is-5'>Types ({types.length})</h5>
					<table className='table'>
						<thead>
							<tr>
								<th>type</th>
							</tr>
						</thead>
						<tbody>
							{types ? types.map((type, k) => (
								<tr key={k}>
									<td>{type.type.name}</td>
								</tr>
							)) : <tr><td>none</td></tr>
							}
						</tbody>
					</table>

					<h5 className='subtitle is-5'>Game indices ({indices.length})</h5>
						<table className='table'>
							<thead>
								<tr>
									<th>index</th>
									<th>name</th>
								</tr>
							</thead>
							<tbody>
							{
								indices ? indices.map((index, k) => {
									return (
										<tr key={k}>
											<td>{index.game_index}</td>
											<td>{index.version.name}</td>
										</tr>
									)
								}) : <tr><td colspan="2">none</td></tr>
							}
							</tbody>
						</table>
                </article>
            </section>
        </div>
    )
}