import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const API_BASE = process.env.NODE_ENV === 'development' 
  ? `http://localhost:8000/api/v1` 
  : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {


    if(!ignore){
      getGames();
    }

    return () => { ignore = true; }
  }, [])

  const getGames = async () => {
    try{
      await fetch(`${API_BASE}/games/`)
          .then(response => response.json())
          .then(data => {
            console.log({data})
            setGames(data)
      })
    } catch(error){
      setError(error.message || "Unexpected Error Occurred!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
       <h1>Games:</h1>
        <ul>
          <li>Games</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
