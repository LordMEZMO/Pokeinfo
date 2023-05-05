import '../com.css';

import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=1118`)
      .then((response) => {
        const regex = new RegExp(`^${searchTerm}`, "i");
        const matches = response.data.results.filter((pokemon) =>
          regex.test(pokemon.name)
        );
        setSuggestions(matches.map((pokemon) => pokemon.name));
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      
    </div>
  );
}



export default function Compare() {
  return (
    <div id="all">
        <div id="p1">
        <label htmlFor="search">Wyszukaj pokemona:</label>
      <input type="text" id="search" name="search" value={searchTerm} onChange={handleChange} />
      <div>
        {suggestions.map((suggestion, index) => (
          <p key={index}>{suggestion}</p>
        ))}
      </div>
        </div>
        <div id="p2">
          <p>select second pokemon</p>
        </div>
    </div>
  );
}