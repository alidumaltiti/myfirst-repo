import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './Header.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n, t } = useTranslation();

  const { theme, toggle } = useTheme();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-section">
            <span className="brand-name">{t('brand')}</span>
            <span className="version">{t('version')}</span>
          </div>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/calculator" className="nav-link">{t('nav.calculator')}</Link>
          <Link to="/analyzer" className="nav-link">{t('nav.lensai')}</Link>
          <Link to="/plan" className="nav-link">{t('nav.plans')}</Link>
          <Link to="/resources" className="nav-link">{t('nav.resources')}</Link>
          <Link to="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
        </nav>
        <div className="header-right">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <select aria-label="Language" onChange={(e)=> i18n.changeLanguage(e.target.value)} defaultValue={i18n.language} style={{marginRight:8}}>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
          <Link to="/login" className="github-link">{t('nav.login')}</Link>
          <Link to="/signup" className="btn btn-primary">{t('nav.getStarted')}</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
