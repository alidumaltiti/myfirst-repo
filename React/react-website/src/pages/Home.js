import React from 'react';
import '../components/Hero.css';

const Home = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Your Smart Partner for Business Success</h1>
            <p className="hero-subtitle">Validate ideas, create business plans, get AI insights, and access resources — all in one hub.</p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="/calculator">Start Feasibility Test</a>
              <a className="btn btn-secondary" href="/resources">Explore Resources</a>
            </div>
          </div>
        </div>
      </section>

      <section className="features" style={{padding:'48px 24px'}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <h2>Everything You Need to Succeed</h2>
          <p>Comprehensive tools and insights to turn your business ideas into reality</p>
          <div>
            <div>
              { /* Features grid */ }
              {require('../components/HomeSections').FeaturesGrid()}
            </div>
            <div>
              { /* Testimonials */ }
              {require('../components/HomeSections').Testimonials()}
            </div>
            <div>
              { /* CTA */ }
              {require('../components/HomeSections').CTASection()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
