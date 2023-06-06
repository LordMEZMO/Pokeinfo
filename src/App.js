import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Moves from './pages/Moves';
import Items from './pages/Items';
import Abilities from './pages/Abilities';
import Compare from './pages/Compare';
import News from './pages/News';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PokemonDetails from './pages/PokemonDetails';
import {QueryClientProvider, QueryClient} from 'react-query'
import MoveDetails from './pages/MoveDetails';
import AbilityDetails from './pages/AbilityDetails';


export default function App() {
  const queryClient = new QueryClient({defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }})

  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favourites" element={<Favourites/>}/>
            <Route path="moves" element={<Moves/>}/>
            <Route path="abilities" element={<Abilities/>}/>
            <Route path="items" element={<Items/>}/>
            <Route path="compare" element={<Compare/>}/>
            <Route path="items" element={<Items/>}/>
            <Route path="news" element={<News/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="pokemon/:name" element={<PokemonDetails/>}/>
            <Route path="move/:name" element={<MoveDetails/>}/>
            <Route path="ability/:name" element={<AbilityDetails/>}/>
            <Route path="pokemon/" element={
              <Navigate replace to="pikachu"/>
            }/>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
