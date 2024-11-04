import { Link } from "react-router-dom";

const Nav = () => {
  // display the navigation bar and link between the pages
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/savedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
