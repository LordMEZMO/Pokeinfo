import '../App.css';
import PokemonList from '../components/PokemonList';
import { useQuery, useQueries } from 'react-query';
import { getPokemonsList, getPokemonData } from '../Helpers';
import { useEffect } from 'react';

function Home() {
  const {isLoading, data} = useQuery({queryKey: 'pokemonList', queryFn: getPokemonsList});
	const pokeList = data ?? []

  const pokemonsData = useQueries(
		pokeList.map((pokemon) => {
			return {
				queryKey: ['pokemon', `${pokemon.name}`],
				queryFn: () => getPokemonData(pokemon.name)
			};
		})
	);

  const allPokemonsData = pokemonsData
					.filter((fetchedData) => fetchedData.isSuccess)
					.map((fetchedData) => fetchedData.data);

  return (
    <div className="App">
      <section>
        <article>
          {pokemonsData.filter((fetchedData) => fetchedData.isSuccess).length === pokeList.length ? <PokemonList allPokemonsData={allPokemonsData}/> : 'loading'}

        </article>
      </section>
    </div>

  );
}

export default Home;