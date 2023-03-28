import '../App.css';
import PokemonList from '../components/PokemonList';

function Home() {
  return (
    <div className="App">
      <section>
        <article>
          <label>Search by name: </label>
          <input type="search"/>
        </article>
        <article>
          <PokemonList/>
        </article>
      </section>
    </div>

  );
}

export default Home;