import '../App.css';
import React, {useState} from 'react';
import { loadJSON, saveJSON } from '../utils/storageUtils';
import FavouriteList from './../components/FavouriteList';

export default function Favourites() {
  const [favourites, setFavourites] = useState(loadJSON('favouriteList'));

  return (
    <div className="App">
      <section>
        <article>
          <h1 className='title'>Favourites</h1>
          {favourites ? (
            <FavouriteList data={favourites}/>
          ) : (
            <p className='subtitle'>The list is empty</p>
          )}
        </article>
      </section>
    </div>
  );
}