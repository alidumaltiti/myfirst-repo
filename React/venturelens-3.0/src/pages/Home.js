import React from 'react';
import '../components/Hero.css';

const Home = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{require('react-i18next').useTranslation().t('home.heroTitle')}</h1>
            <p className="hero-subtitle">{require('react-i18next').useTranslation().t('home.heroSubtitle')}</p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="/calculator">{require('react-i18next').useTranslation().t('home.startTest')}</a>
              <a className="btn btn-secondary" href="/resources">{require('react-i18next').useTranslation().t('home.explore')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="features" style={{padding:'48px 24px'}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <h2>{require('react-i18next').useTranslation().t('home.everything')}</h2>
          <p>{require('react-i18next').useTranslation().t('home.sub')}</p>
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
