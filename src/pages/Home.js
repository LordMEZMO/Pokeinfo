import '../App.css';
import PokemonList from '../components/PokemonList';
import { useQuery, useQueries } from 'react-query';
import { getPokemonsList, getPokemonData } from '../Helpers';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faList } from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react';
import PokemonTable from '../components/PokemonTable';


function Home() {
  const {isLoading, data} = useQuery({queryKey: 'pokemonList', queryFn: getPokemonsList});
  const [viewMode, switchViewMode] = useReducer((state, action) => {
    switch(action.id) {
      case 0:
        return 'card'
      case 1:
        return 'table'
      default:
        return 'card'
    }
  }, 'card')
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

  const handleSwitchViewMode = (id) => {
    switchViewMode({id})
  };

  return (
    <div className="App">
      <section>
        <div className='field has-addons is-justify-content-flex-end m-4'>
          <div className="control">
            <button className={(viewMode === 'card' ? 'is-primary' : '') + ' button'} onClick={() => {handleSwitchViewMode(0)}}>
              <FontAwesomeIcon icon={faTable}/>
            </button>
          </div>
          <div className="control">
            <button className={(viewMode === 'table' ? 'is-primary' : '') + ' button'} onClick={() => {handleSwitchViewMode(1)}}>
              <FontAwesomeIcon icon={faList}/>
            </button>
          </div>
        </div>
        <article>
          {pokemonsData.filter((fetchedData) => fetchedData.isSuccess).length === pokeList.length ?
           (viewMode === 'card' ? <PokemonList allPokemonsData={allPokemonsData}/> : <PokemonTable allPokemonsData={allPokemonsData}/>)
           : 'loading'}
        </article>
      </section>
    </div>

  );
}

export default Home;