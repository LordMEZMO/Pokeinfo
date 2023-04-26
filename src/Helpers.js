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

export const getPokemonData = (pokemonName) => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonByName(pokemonName)
}

const getPokemonSpecies = (pokemonName) => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonSpeciesByName(pokemonName)
}

export const usePokemonData = (pokemonName) => {
	return useQuery(['pokemon', `${pokemonName}`], () => getPokemonData(pokemonName))
}

export const usePokemonSprite = (pokemonName) => {
	const pokedex = new Pokedex()
	return useQuery(['pokemonSprite', pokemonName], async () => {
		const data = await pokedex.getPokemonByName(pokemonName);
		if(data.sprites.front_default != null){
			return data.sprites.front_default;
		} else {
			const speciesData = await pokedex.getPokemonSpeciesByName(data.species.name)
			const variety = speciesData.varieties.find((variety) => variety.is_default)
			const varietyData = await pokedex.getPokemonByName(variety.pokemon.name)
			return varietyData.sprites.front_default
		}
	})
}
