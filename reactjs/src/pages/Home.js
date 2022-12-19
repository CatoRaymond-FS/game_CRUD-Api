import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Game List for Nerds</h1>
       <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </header>
    </div>
  );
}

export default Home;
