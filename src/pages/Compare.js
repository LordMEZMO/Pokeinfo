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

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <label htmlFor="searchLeft">select the first pokemon</label>
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
        <label htmlFor="searchRight">select the second pokemon</label>
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
            <p>
              HP: {selectedPokemonLeft.stats[0].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[0].base_stat -
                    selectedPokemonRight.stats[0].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[0].base_stat -
                            selectedPokemonRight.stats[0].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[0].base_stat -
                        selectedPokemonRight.stats[0].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              ATK: {selectedPokemonLeft.stats[1].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[1].base_stat -
                    selectedPokemonRight.stats[1].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[1].base_stat -
                            selectedPokemonRight.stats[1].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[1].base_stat -
                        selectedPokemonRight.stats[1].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              DEF: {selectedPokemonLeft.stats[2].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[2].base_stat -
                    selectedPokemonRight.stats[2].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[2].base_stat -
                            selectedPokemonRight.stats[2].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[2].base_stat -
                        selectedPokemonRight.stats[2].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SATK: {selectedPokemonLeft.stats[3].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[3].base_stat -
                    selectedPokemonRight.stats[3].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[3].base_stat -
                            selectedPokemonRight.stats[3].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[3].base_stat -
                        selectedPokemonRight.stats[3].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SDEF: {selectedPokemonLeft.stats[4].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[4].base_stat -
                    selectedPokemonRight.stats[4].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[4].base_stat -
                            selectedPokemonRight.stats[4].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[4].base_stat -
                        selectedPokemonRight.stats[4].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SPE: {selectedPokemonLeft.stats[5].base_stat}
              {selectedPokemonRight && (
                <>
                  {selectedPokemonLeft.stats[5].base_stat -
                    selectedPokemonRight.stats[5].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonLeft.stats[5].base_stat -
                            selectedPokemonRight.stats[5].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonLeft.stats[5].base_stat -
                        selectedPokemonRight.stats[5].base_stat})
                    </span>
                  )}
                </>
              )}
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
            <p>
              HP: {selectedPokemonRight.stats[0].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[0].base_stat -
                    selectedPokemonLeft.stats[0].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[0].base_stat -
                            selectedPokemonLeft.stats[0].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[0].base_stat -
                        selectedPokemonLeft.stats[0].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              ATK: {selectedPokemonRight.stats[1].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[1].base_stat -
                    selectedPokemonLeft.stats[1].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[1].base_stat -
                            selectedPokemonLeft.stats[1].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[1].base_stat -
                        selectedPokemonLeft.stats[1].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              DEF: {selectedPokemonRight.stats[2].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[2].base_stat -
                    selectedPokemonLeft.stats[2].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[2].base_stat -
                            selectedPokemonLeft.stats[2].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[2].base_stat -
                        selectedPokemonLeft.stats[2].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SATK: {selectedPokemonRight.stats[3].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[3].base_stat -
                    selectedPokemonLeft.stats[3].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[3].base_stat -
                            selectedPokemonLeft.stats[3].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[3].base_stat -
                        selectedPokemonLeft.stats[3].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SDEF: {selectedPokemonRight.stats[4].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[4].base_stat -
                    selectedPokemonLeft.stats[4].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[4].base_stat -
                            selectedPokemonLeft.stats[4].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[4].base_stat -
                        selectedPokemonLeft.stats[4].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
            <p>
              SPE: {selectedPokemonRight.stats[5].base_stat}
              {selectedPokemonLeft && (
                <>
                  {selectedPokemonRight.stats[5].base_stat -
                    selectedPokemonLeft.stats[5].base_stat !== 0 && (
                    <span
                      style={{
                        color:
                          selectedPokemonRight.stats[5].base_stat -
                            selectedPokemonLeft.stats[5].base_stat <
                          0
                            ? "red"
                            : "green",
                      }}
                    >
                      ({selectedPokemonRight.stats[5].base_stat -
                        selectedPokemonLeft.stats[5].base_stat})
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonSearch;
