import '../App.css';
import MovesList from '../components/MovesList';

export default function Moves() {
  return (
    <div className="App">
      <section>
        <article>
            <MovesList/>
        </article>
      </section>
    </div>
  );
}