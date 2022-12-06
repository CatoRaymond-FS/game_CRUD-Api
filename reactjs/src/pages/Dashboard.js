import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: '',
    genre: '',
    year: ''
  })


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

  const createGame = async () => {
    try{
        await fetch(`${API_BASE}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(() => getGames())
      } catch(error){
        setError(error.message || "Unexpected Error Occurred!")
      } finally {
        setLoading(false)
      }
    }


  const handleSubmit = (event) => {
    event.preventDefault();
    createGame();
}

const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
        ...values,
        [event.target.title]: event.target.value
    }))
}
  return (
    <div className="App">
      <header className="App-header">
       <h1>Games:</h1>
        <Link to="/">Home</Link>
        <ul>
          {
            games?.map(game => (
              <li key={game._id}>
                <Link to={`/game/${game._id}`}>{game.title}</Link>
              </li>
            ))
          }
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
        <label>
            Title:
            <input type="text" name="title" value={values.title} onChange={handleInputChanges} />
        </label>
        <label>
            Genre:
            <input type="text" name="genre" value={values.genre} onChange={handleInputChanges} />
        </label>
        <label>
            Year:
            <input type="text" name="year" value={values.year} onChange={handleInputChanges} />
        </label>
        <input type="submit" value="Submit" />
    </form>
      </header>
    </div>
  );
}

export default Dashboard;
