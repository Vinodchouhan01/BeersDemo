import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data))
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search for a beer"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredBeers.map(beer => (
          <div className="beer-card border border-gray-300 rounded-lg p-4" key={beer.id} style={{ maxWidth: '300px' }}>
            <img src={beer.image_url} alt={beer.name} className="w-full h-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{beer.name}</h2>
            <p className="text-gray-600 mb-2">{beer.tagline}</p>
            <p className="text-gray-700">{beer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
