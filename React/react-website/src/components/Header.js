import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './Header.css';

const Header = () => {
  const { theme, toggle } = useTheme();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-section">
            <span className="brand-name">VentureLens</span>
            <span className="version">2.0</span>
          </div>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/calculator" className="nav-link">Calculator</Link>
          <Link to="/analyzer" className="nav-link">LensAI</Link>
          <Link to="/plan" className="nav-link">Business Plans</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
        <div className="header-right">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/login" className="github-link">Login</Link>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
