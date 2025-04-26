import { Link } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        <FaHome /> Home
      </Link>
      {" | "}
      <Link to="/create" className="nav-link">
        <FaPlus /> Create Post
      </Link>
    </nav>
  );
}
