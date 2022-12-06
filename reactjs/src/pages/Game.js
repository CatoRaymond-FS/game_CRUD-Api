import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Game() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    title: '',
    genre: ''
  })

  const { id } = useParams();
  const navigate = useNavigate();


  const API_BASE = process.env.NODE_ENV === 'development' 
  ? `http://localhost:8000/api/v1` 
  : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {


    if(!ignore){
      getGame();
    }

    return () => { ignore = true; }
  }, [])

  const getGame = async () => {
    try{
      await fetch(`${API_BASE}/games/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log({data})
            setValues({
                title: data.title,
                genre: data.genre
            })
      })
    } catch(error){
      setError(error.message || "Unexpected Error Occurred!")
    } finally {
      setLoading(false)
    }
  }

  const deleteGame = async () => {
    try{
        await fetch(`${API_BASE}/games/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
              setGames(data)
              navigate('/dashboard', { replace: true })
        })
      } catch(error){
        setError(error.message || "Unexpected Error Occurred!")
      } finally {
        setLoading(false)
      }
    }

    const updateGame = async () => {
        try{
            await fetch(`${API_BASE}/games/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then(data => {
                  console.log({data})
            })
          } catch(error){
            setError(error.message || "Unexpected Error Occurred!")
          } finally {
            setLoading(false)
          }
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateGame();
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
       <h1>Game Profile:</h1>
       <h3>{values && values.title}</h3>
       <h5>{values && values.genre}</h5>
       <button onClick={() => deleteGame()}>Delete Game</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

    <form onSubmit={(event) => handleSubmit(event)}>
        <label>
            Title:
            <input type="text" name="title" value={values.title} onChange={handleInputChanges} />
        </label>
        <label>
            Genre:
            <input type="text" name="genre" value={values.genre} onChange={handleInputChanges} />
        </label>
        <input type="submit" value="Submit" />
    </form>

      </header>
    </div>
  );
}

export default Game;
