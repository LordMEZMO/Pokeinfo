import Pokedex from 'pokedex-promise-v2';
import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

export const getPokemonSprite = (pokemonName) => {
	const pokedex = new Pokedex();
	return pokedex.getPokemonByName(pokemonName).then(async (data) => {
		if (data.sprites.front_default != null) {
			await fetch(data.sprites.front_default)
				.then((res) => res.blob())
				.then((imgBlob) => {
					return URL.createObjectURL(imgBlob);
				});
		} else {
			pokedex.getPokemonSpeciesByName(data.species.name).then((name) => {
				pokedex
					.getPokemonByName(name.varieties.find((variety) => variety.is_default).pokemon.name)
					.then(async (data) => {
						await fetch(data.sprites.front_default)
							.then((res) => res.blob())
							.then((imgBlob) => {
								return URL.createObjectURL(imgBlob);
							});
					});
			});
		}
	});
};

const getPokemonData = (pokemonName) => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonByName(pokemonName)
}

const getPokemonSpecies = (pokemonName) => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonSpeciesByName(pokemonName)
}

export const usePokemonData = (pokemonName) => {
	return useQuery(['pokemon', `${pokemonName}`], ({ queryKey }) => getPokemonData(queryKey[1]))
}

const usePokemonSpeciesSprite = (pokemonName) => {
	// const { data: species, isLoading: speciesIsLoading } = useQuery(['species'], () => getPokemonSpecies(pokemonName))
	// const speciesId = species?.id
	// let variety
	// if(!speciesIsLoading) {
	// 	variety = species.varieties.find((variety) => variety.is_default).pokemon.name
	// }

	// return useQuery(
	// 	['pokemon', `${variety}`],
	// 	({ queryKey }) => {
	// 		console.log(variety);
	// 		return getPokemonData(queryKey[1])
	// 	},
	// 	{ enabled: !!speciesId }
	// )
}

export const useSprite = (pokemonName) => {
	const [sprite, setSprite] = useState(null)
	const { isLoading, data } = usePokemonData(pokemonName)
	const pokemonData = data ?? { sprites: { front_default: '' } }
	const speciesSprite = usePokemonSpeciesSprite(pokemonName)

	if (!isLoading) {
		if (pokemonData.sprites.front_default != null) {
			return pokemonData.sprites.front_default
		} else {
			return speciesSprite
		}
	}

	return sprite
}