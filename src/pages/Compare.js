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
        setSuggestions(
          matches.map((pokemon) => ({
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
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
          <div
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              margin: "5px",
            }}
          >
            <img src={suggestion.imageUrl} alt={suggestion.name} />
            <p style={{ marginLeft: "10px" }}>{suggestion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonSearch;