import '../items.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/item?limit=100');
        const data = await response.json();
        const itemPromises = data.results.map(async (item) => {
          const itemResponse = await fetch(item.url);
          return itemResponse.json();
        });
        const itemData = await Promise.all(itemPromises);
        setItems(itemData);
      } catch (error) {
        console.error('fetch error:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container">
      <center><h1><b>Items</b></h1></center>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
            {items.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.effect_entries[0].effect}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;