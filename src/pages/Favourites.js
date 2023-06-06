import '../App.css';
import React, {useEffect, useState} from 'react';
import FavouriteList from './../components/FavouriteList';
import {isPokemonData} from '../utils/storageUtils';

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if(!localStorage.length) return;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if(!isPokemonData(key)) continue;
      setFavourites(prevState => {
        return [...prevState, JSON.parse(localStorage.getItem(key))];
      })
    }
  }, []);

  return (
    <div className="App">
      <section>
        <article>
          <h1 className='title'>Favourites</h1>
          {favourites.length ? (
            <>
              <h1 className='subtitle'>Your favourite pokemons</h1>
              <FavouriteList data={favourites}/>
            </>
          ) : (
            <p className='subtitle'>The list is empty</p>
          )}
        </article>
      </section>
    </div>
  );
}