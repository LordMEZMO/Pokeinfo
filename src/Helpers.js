import Pokedex from 'pokedex-promise-v2';

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
