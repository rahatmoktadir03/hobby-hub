import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>HobbyHub 🎮</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/create">Create Post</Link>
      </nav>
    </header>
  );
}

export default Header;
