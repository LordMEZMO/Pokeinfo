import '../App.css';
// import Navigation from '../components/Layout';
import PokemonList from '../components/PokemonList';

function Home() {
  return (
    <div className="App">
      <header>PokeInfo</header>
      <section>
        <article>
          <PokemonList/>
        </article>
      </section>
      <footer>
        &copy; PokeInfo 2023
      </footer>
    </div>

  );
}

export default Home;