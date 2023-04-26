import '../App.css';
import React, {useEffect, useState} from 'react';
import FavouriteList from './../components/FavouriteList';

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if(!localStorage.length) return;
    let temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      temp = [...temp, JSON.parse(localStorage.getItem(key))];
    }
    setFavourites(temp);
  }, []);

  return (
    <div className="App">
      <section>
        <article>
          <h1 className='title'>Favourites</h1>
          {favourites.length ? (
            <FavouriteList data={favourites}/>
          ) : (
            <p className='subtitle'>The list is empty</p>
          )}
        </article>
      </section>
    </div>
  );
}