import '../items.css';
import React, { useState, useEffect } from 'react';

function Abilities() {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/ability?limit=100');
        const data = await response.json();
        const abilityPromises = data.results.map(async (ability) => {
          const abilityResponse = await fetch(ability.url);
          return abilityResponse.json();
        });
        const abilityData = await Promise.all(abilityPromises);
        setAbilities(abilityData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchAbilities();
  }, []);

  const getGenerationRomanNumeral = (generationUrl) => {
    const regex = /\/generation\/(\d+)\//;
    const match = generationUrl.match(regex);
    if (match && match.length > 1) {
      const number = parseInt(match[1]);
      return convertToRomanNumeral(number);
    }
    return '';
  };

  const convertToRomanNumeral = (number) => {
    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];

    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
      while (number >= romanNumerals[i].value) {
        result += romanNumerals[i].symbol;
        number -= romanNumerals[i].value;
      }
    }
    return result;
  };

  return (
    <div className="App">
      <center><b><h1>Abilities</h1></b></center>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Generation</th>
          </tr>
        </thead>
        <tbody>
          {abilities.map((ability, index) => (
            <tr key={index}>
              <td>{ability.name}</td>
              <td>{ability.effect_entries.find((entry) => entry.language.name == 'en').effect}</td>
              <td>{getGenerationRomanNumeral(ability.generation.url)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Abilities;
