import '../App.css'
import {useLocation} from 'react-router-dom';

export default function NotFound() {
    let location = useLocation();
    return (
        <div className="App">
            <section>
                <article>
                    <h1>Page was not found on {location.pathname}</h1>
                </article>
            </section>
        </div>
    )
}