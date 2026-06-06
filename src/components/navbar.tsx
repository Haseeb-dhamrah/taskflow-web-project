import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Tasks</Link>
      <Link to="/create" className="nav-link">New Task</Link>
    </nav>
  );
};