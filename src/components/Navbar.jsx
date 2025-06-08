import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/seminal-papers">Seminal Papers</Link></li>
        <li><Link to="/new-research">New Research</Link></li>
        <li><Link to="/video-library">Video Library</Link></li>
        <li><Link to="/interactive-tools">Interactive Tools</Link></li>
      </ul>
    </nav>
  );
}