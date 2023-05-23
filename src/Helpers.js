import Pokedex from 'pokedex-promise-v2';
import { useQuery } from 'react-query';

export const getPokemonsList = () => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonsList().then(data => data.results)
}

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

export const getPokemonData = async (pokemonName) => {
	const pokedex = new Pokedex()
	return await pokedex.getPokemonByName(pokemonName)
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

export const getMoveByName = async (moveName) => {
	const pokedex = new Pokedex()
	return await pokedex.getMoveByName(moveName === "pound" ? "1" : moveName)
}

export const getMovesList =  () => {
	const pokedex = new Pokedex()
	return pokedex.getMovesList().then(data => data.results)
}

export const getAbilitiesList = () => {
	const pokedex = new Pokedex()
	return pokedex.getAbilitiesList().then(data => data.results)
}

export const getAbilityByName = (name) => {
	const pokedex = new Pokedex()
	return pokedex.getAbilityByName(name)
}

export const convertMoveData = (moveData) => {
	const effectChance = moveData.effect_chance
	const moveDesc = moveData.effect_entries
	const replaceEffectChance = (desc) => {return desc.replace("$effect_chance", effectChance)}

	return {
		id: moveData.id,
		name: moveData.name,
		type: moveData.type.name,
		accuracy: moveData.accuracy,
		desc: moveDesc.map((desc) => replaceEffectChance(desc.short_effect)),
		target: moveData.target.name
	}
}

export const convertAllMovesData = (movesList) => {
	return [...movesList].map((move) => convertMoveData(move))
}