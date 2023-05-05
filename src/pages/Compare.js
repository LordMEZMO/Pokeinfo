import '../com.css';

import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <label htmlFor="search">Wyszukaj pokemona:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div>
        {suggestions.map((suggestion, index) => (
          <p
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ cursor: "pointer" }}
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PokemonSearch;