import './App.css';
import data from './data/pokemons.json';
import NavLink from './components/NavLink';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div className="App">
      <header>PokeInfo</header>
      <nav>
        <ul>
          <NavLink name="Link"/>
          <NavLink name="Link"/>
          <NavLink name="Link"/>
          <NavLink name="Link"/>
        </ul>
      </nav>
      <section>
        <article>
          {
           data.results.map((p, k) => {
              return(
                <ul>
                  <PokemonList name={p.name} link={p.url}/>
                </ul>
              )
           }) 
          }
        </article>
      </section>
      <footer>
        &copy;
      </footer>
    </div>

  );
}

export default App;
