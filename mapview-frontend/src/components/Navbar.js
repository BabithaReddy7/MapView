import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Add CSS for horizontal navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
