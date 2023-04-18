import { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import Pokedex from 'pokedex-promise-v2';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PokemonDetails() {
    let {name} = useParams();

	const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
	const [sprite, setSprite] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [pokemonId, setPokemonId] = useState(0)
	const [stats, setStats] = useState([])

    useEffect(() => {
		const pokedex = new Pokedex();
		setIsLoading(true)
		pokedex.getPokemonByName(name).then((data) => {
			console.log(data)
			setAbilities(data.abilities)
			setTypes(data.types)
			setPokemonId(data.id)
			setStats(data.stats)
			if (data.sprites.front_default != null) {
				fetch(data.sprites.front_default)
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
	}, [name])

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
                    <h1>Here's all about {capitalize(name)}:</h1>
                    <div className="card-image is-flex is-justify-content-center is-align-items-center">
                        {!isLoading ? 
                            <figure className="image">
                                <img src={sprite} alt=""/>
                            </figure> :
                            <LoadingSpinner/>
                        }
                    </div>
                    <p>Pokemon id: {pokemonId}</p>

					<p>Abilities ({abilities.length})</p>
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
					
                    <p>Types ({types.length})</p>
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

                    <p>Stats:</p>
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
                </article>
            </section>
        </div>
    )
}