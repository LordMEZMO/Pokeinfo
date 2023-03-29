import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Favourites from './pages/Favourites'
import Compare from './pages/Compare'
import News from './pages/News'
import Register from './pages/Register'
import Login from './pages/Login'
import Moves from './pages/Moves';
import Abilities from './pages/Abilities';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="favourites" element={<Favourites/>}/>
          <Route path="moves" element={<Moves/>}/>
          <Route path="abilities" element={<Abilities/>}/>
          <Route path="compare" element={<Compare/>}/>
          <Route path="news" element={<News/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
