import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await authService.login(email, password).then (
            response => {
                navigate('/dashboard');
            },
            error => {
                console.log(error);
            }
        )} catch (error) {
            console.log(error);
        }
    }
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>Login Here!</h1>
       <Link to="/dashboard">Dashboard</Link>
       <section>
        <form onSubmit={handleLogin}>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
       </section>
      </header>
    </div>
  );
}

export default Login;
