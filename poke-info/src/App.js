import './App.css';
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
          <PokemonList/>
        </article>
      </section>
      <footer>
        &copy;
      </footer>
    </div>

  );
}

export default App;
