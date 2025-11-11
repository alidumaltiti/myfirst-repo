import React from 'react';
import ReactLogo from './ReactLogo';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-logo">
            <ReactLogo size={120} />
          </div>
          <h1 className="hero-title">VentureLens 2.0</h1>
          <p className="hero-subtitle">
            Your Smart Partner for Business Success
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Learn React</button>
            <button className="btn btn-secondary">API Reference</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;