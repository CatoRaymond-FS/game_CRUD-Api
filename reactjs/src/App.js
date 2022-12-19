import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import authService from './services/auth.service';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [])
  
  const logout = () => {
    authService.logout();
  }

  return (
    <div>
      <h1>Game Log In</h1>
      <div>
        {
        currentUser
         ? <h2>logged in</h2>
         : <h2>not logged in</h2>
        }
      </div>
        <section>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/game/:id" exact element={<Game />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/" exact element={<Home />} />
          </Routes>
        </section>
      </div>
  );
}

export default App;
