import '../App.css';
import MovesList from '../components/MovesList';

export default function Moves() {
  return (
    <div className="App">
      <section>
        <article>
            <h1>Moves</h1>
            <MovesList/>
        </article>
      </section>
    </div>
  );
}