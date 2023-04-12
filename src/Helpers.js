import Pokedex from "pokedex-promise-v2";

export const pokemonDataCacheMap = new Map()

export const getPokemonData = (pokemonName) => {
    return new Promise((myResolve, myReject) => {
        if (!pokemonDataCacheMap.has(pokemonName)) {
            const pokedex = new Pokedex();
            pokedex.getPokemonByName(pokemonName).then(async (data) => {
                if (data.sprites.front_default != null) {
                    await fetch(data.sprites.front_default)
                        .then((res) => res.blob())
                        .then((imgBlob) => {
                            let imgUrl = URL.createObjectURL(imgBlob)
                            data.imgURL = imgUrl
                        })
                } else {
                    pokedex.getPokemonSpeciesByName(data.species.name).then((name) => {
                        pokedex.getPokemonByName(name.varieties.find(variety => variety.is_default).pokemon.name).then(async (data) => {
                            await fetch(data.sprites.front_default)
                                .then((res) => res.blob())
                                .then((imgBlob) => {
                                    let imgUrl = URL.createObjectURL(imgBlob)
                                    data.imgURL = imgUrl
                                })
                        })
                    })
                }



                pokemonDataCacheMap.set(pokemonName, data)
                myResolve(data)
            })
        } else {
            myResolve(pokemonDataCacheMap.get(pokemonName))
        }
    })
}

