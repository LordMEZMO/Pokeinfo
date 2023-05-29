import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonSearch() {
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [searchTermRight, setSearchTermRight] = useState("");
  const [suggestionsLeft, setSuggestionsLeft] = useState([]);
  const [suggestionsRight, setSuggestionsRight] = useState([]);
  const [selectedPokemonLeft, setSelectedPokemonLeft] = useState(null);
  const [selectedPokemonRight, setSelectedPokemonRight] = useState(null);

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

  const handleSuggestionClick = (suggestion, side) => {
    if (side === "left") {
      setSearchTermLeft(suggestion.name);
      setSuggestionsLeft([]);
    } else if (side === "right") {
      setSearchTermRight(suggestion.name);
      setSuggestionsRight([]);
    }
  };

  const handleCompareClick = () => {
    if (searchTermLeft && searchTermRight) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchTermLeft.toLowerCase()}`)
        .then((response) => {
          setSelectedPokemonLeft(response.data);
        })
        .catch((error) => console.log(error));

      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchTermRight.toLowerCase()}`)
        .then((response) => {
          setSelectedPokemonRight(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const renderStatWithDifference = (statName, statLeft, statRight) => {
    const diff = statLeft - statRight;
    let differenceString = "";
    if (diff < 0) {
      differenceString = `(${diff})`;
    } else if (diff > 0) {
      differenceString = `(+${diff})`;
    }

    return (
      <p>
        {statName}: {statLeft} {differenceString}
      </p>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <label htmlFor="searchLeft">Select first pokemon</label>
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
                cursor: "pointer",
              }}
            >
              <img src={suggestion.imageUrl} alt={suggestion.name} />
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="searchRight">select second pokemon</label>
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
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleCompareClick}>Compare</button>
      </div>
      <div>
        {selectedPokemonLeft && (
          <div>
            <h3>{selectedPokemonLeft.name}</h3>
            <img
              src={selectedPokemonLeft.sprites.front_default}
              alt={selectedPokemonLeft.name}
            />
            {renderStatWithDifference(
              "HP",
              selectedPokemonLeft.stats[0].base_stat,
              selectedPokemonRight.stats[0].base_stat
            )}
            {renderStatWithDifference(
              "Atak",
              selectedPokemonLeft.stats[1].base_stat,
              selectedPokemonRight.stats[1].base_stat
            )}
            {renderStatWithDifference(
              "Obrona",
              selectedPokemonLeft.stats[2].base_stat,
              selectedPokemonRight.stats[2].base_stat
            )}
            {renderStatWithDifference(
              "Specjalny atak",
              selectedPokemonLeft.stats[3].base_stat,
              selectedPokemonRight.stats[3].base_stat
            )}
            {renderStatWithDifference(
              "Specjalna obrona",
              selectedPokemonLeft.stats[4].base_stat,
              selectedPokemonRight.stats[4].base_stat
            )}
            {renderStatWithDifference(
              "Szybkość",
              selectedPokemonLeft.stats[5].base_stat,
              selectedPokemonRight.stats[5].base_stat
            )}
            <p>
              Typy:{" "}
              {selectedPokemonLeft.types
                .map((type) => type.type.name)
                .join(", ")}
            </p>
          </div>
        )}
      </div>
      <div>
        {selectedPokemonRight && (
          <div>
            <h3>{selectedPokemonRight.name}</h3>
            <img
              src={selectedPokemonRight.sprites.front_default}
              alt={selectedPokemonRight.name}
            />
            {renderStatWithDifference(
              "Hp",
              selectedPokemonRight.stats[0].base_stat,
              selectedPokemonLeft.stats[0].base_stat
            )}
            {renderStatWithDifference(
              "Atk",
              selectedPokemonRight.stats[1].base_stat,
              selectedPokemonLeft.stats[1].base_stat
            )}
            {renderStatWithDifference(
              "Def",
              selectedPokemonRight.stats[2].base_stat,
              selectedPokemonLeft.stats[2].base_stat
            )}
            {renderStatWithDifference(
              "S_atk",
              selectedPokemonRight.stats[3].base_stat,
              selectedPokemonLeft.stats[3].base_stat
            )}
            {renderStatWithDifference(
              "S_def",
              selectedPokemonRight.stats[4].base_stat,
              selectedPokemonLeft.stats[4].base_stat
            )}
            {renderStatWithDifference(
              "Spe",
              selectedPokemonRight.stats[5].base_stat,
              selectedPokemonLeft.stats[5].base_stat
            )}
            <p>
              Typy:{" "}
              {selectedPokemonRight.types
                .map((type) => type.type.name)
                .join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonSearch;
