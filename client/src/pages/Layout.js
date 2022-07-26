import "../App.css"

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/likedmovies">My Liked Movies</Link>
          </li>
          <li>
            <Link to="/dislikedmovies">My Disliked Movies</Link>
          </li>
          <li>
            <Link to="/match">Match</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;