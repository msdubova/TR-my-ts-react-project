import { NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul>

        {/* <li>
          <NavLink to="/trends">Trending</NavLink>
        </li> */}
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/genres">Genres</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
