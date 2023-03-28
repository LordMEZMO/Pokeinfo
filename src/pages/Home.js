import '../App.css';
import PokemonList from '../components/PokemonList';

function Home() {
  return (
    <div className="App">
      <section>
        <article>
          <PokemonList/>
        </article>
      </section>
    </div>

  );
}

export default Home;