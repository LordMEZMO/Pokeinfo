import { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import Pokedex from 'pokedex-promise-v2';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PokemonDetails() {
    let {name} = useParams();

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
                    <p>Types:</p>
					{
                        types ? types.map((type, k) => (
							<p key={k}>{type.type.name}</p>
                        )) : "none"
                    }
                    <p>Stats:</p>
					{
                        stats ? stats.map((stat) => {
                            <p>{stat.base_stat}: {stat.stat.name}</p>
                        }) : "none"
                    }
                </article>
            </section>
        </div>
    )
}