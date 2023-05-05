import '../com.css';

import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonSearch() {
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [searchTermRight, setSearchTermRight] = useState("");
  const [suggestionsLeft, setSuggestionsLeft] = useState([]);
  const [suggestionsRight, setSuggestionsRight] = useState([]);

  const handleChangeLeft = (event) => {
    setSearchTermLeft(event.target.value);
  };

  const handleChangeRight = (event) => {
    setSearchTermRight(event.target.value);
  };

  useEffect(() => {
    if (searchTermLeft.length === 0) {
      setSuggestionsLeft([]);
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=1118`)
      .then((response) => {
        const regex = new RegExp(`^${searchTermLeft}`, "i");
        const matches = response.data.results.filter((pokemon) =>
          regex.test(pokemon.name)
        );
        setSuggestionsLeft(
          matches.map((pokemon) => ({
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
          }))
        );
        if (matches.some((pokemon) => pokemon.name === searchTermLeft.toLowerCase())) {
          setSuggestionsLeft([]);
        }
      })
      .catch((error) => console.log(error));
  }, [searchTermLeft]);

  useEffect(() => {
    if (searchTermRight.length === 0) {
      setSuggestionsRight([]);
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=1118`)
      .then((response) => {
        const regex = new RegExp(`^${searchTermRight}`, "i");
        const matches = response.data.results.filter((pokemon) =>
          regex.test(pokemon.name)
        );
        setSuggestionsRight(
          matches.map((pokemon) => ({
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
          }))
        );
        if (matches.some((pokemon) => pokemon.name === searchTermRight.toLowerCase())) {
          setSuggestionsRight([]);
        }
      })
      .catch((error) => console.log(error));
  }, [searchTermRight]);

  const handleSuggestionClick = (suggestion, field) => {
    if (field === "left") {
      setSearchTermLeft(suggestion.name);
      setSuggestionsLeft([]);
    } else if (field === "right") {
      setSearchTermRight(suggestion.name);
      setSuggestionsRight([]);
    }
  };

  

  const handleCompareClick = () => {
    console.log(`Comparing ${searchTermLeft} with ${searchTermRight}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <label htmlFor="searchLeft">Wyszukaj pokemona po lewej stronie:</label>
        <input
          type="text"
          id="searchLeft"
          name="searchLeft"
          value={searchTermLeft}
          onChange={handleChangeLeft}
        />
        <div>
          {suggestionsLeft.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion, "left")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
             
<img src={suggestion.imageUrl} alt={suggestion.name} />
<span style={{ marginLeft: "10px" }}>{suggestion.name}</span>
</div>
))}
</div>

</div>
<button onClick={handleCompareClick}>Porównaj</button>
<div>
<label htmlFor="searchRight">Wyszukaj pokemona po prawej stronie:</label>
<input
       type="text"
       id="searchRight"
       name="searchRight"
       value={searchTermRight}
       onChange={handleChangeRight}
     />
<div>

{suggestionsRight.map((suggestion, index) => (
<div
key={index}
onClick={() => handleSuggestionClick(suggestion, "right")}
style={{
display: "flex",
alignItems: "center",
cursor: "pointer",
}}
>
<img src={suggestion.imageUrl} alt={suggestion.name} />
<span style={{ marginLeft: "10px" }}>{suggestion.name}</span>
</div>
))}
</div>
</div>

</div>
);
}

export default PokemonSearch;
