import '../App.css';
import PokemonList from '../components/PokemonList';
import { useQuery } from 'react-query';
import { getPokemonsList } from '../Helpers';

function Home() {
  const {isLoading, data} = useQuery({queryKey: 'pokemonList', queryFn: getPokemonsList});
	const pokeList = data ?? []

  return (
    <div className="App">
      <section>
        <article>
          <PokemonList pokeList={pokeList}/>
        </article>
      </section>
    </div>

  );
}

export default Home;