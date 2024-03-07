import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TownButton from './TownButton';
function Navbar({ towns }) {
    return (
      <div className="navbar">
        {towns.map((town) => (
          <Link key={town} to={`/${town}`}>
            <TownButton town={town} />
          </Link>
        ))}
      </div>
    );
  }
  export default Navbar;