import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-name">VentureLens</span>
            <span className="brand-version">2.0</span>
          </div>
          <p className="brand-tagline">See your business potential clearly</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Platform</h4>
            <a href="/calculator">Feasibility Calculator</a>
            <a href="/analyzer">AI Assistant</a>
            <a href="/plan">Business Plans</a>
            <a href="/estimators">Financial Tools</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="/resources">Learning Center</a>
            <a href="/mentorship">Mentorship</a>
            <a href="/contact">Contact</a>
            <a href="#">Feedback</a>
          </div>
          <div>
            <h4>Account</h4>
            <a href="/signup">Sign Up</a>
            <a href="/login">Login</a>
            <a href="/dashboard">Dashboard</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div>
            <h4>Stay Updated</h4>
            <form className="newsletter" onSubmit={(e)=>e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email" />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 VentureLens 2.0. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
