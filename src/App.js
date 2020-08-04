import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [input, setInput] = useState(undefined);

  useEffect(() => {
    fetchPokemon()
  },[]);

  const fetchPokemon = () => {
    let pokeID = 0;
    let pokeArray = [];
    while( pokeID++ < 20) {
      pokeArray.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`)
        .then(response => response.json())
        .then(data => data)
      );
    }
    Promise.all(pokeArray)
    .then(data => {
      console.log(data);
      setPokemons(data)
    });
  }

  const displayPokemon = () => {
    let displayPokemons = filterPokemon()
    return displayPokemons.map((pokemon, i) => {
      return (
        <div key={i} className="poke-info-container">
          <div className="poke-name">{pokemon.name}</div>
          <img className="poke-img" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
        </div>
      );
    });
  }

  const displayType = () => {
    return pokemons.map((pokemon, i) => {
      return (pokemon.types.map((type,i) => {
        return (console.log(type.type.name))
      }))
    })
  }

  const filterPokemon = () => {
    return pokemons.filter((poke) => {
      if(!input) {
        return poke.name
      } else if(input) {
        return poke.name.includes(input)
      }
    })
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="App">
    {displayType()}
      <div className="header">
        <h1>Pokemon Search</h1>
        <input onChange={handleChange} value={input} placeholder="Search for a Pokemon"></input>

      </div>
      <div className="poke-grid">
        {displayPokemon()}
      </div>
    </div>
  );
}

export default App;
