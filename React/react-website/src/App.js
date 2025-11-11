import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Analyzer from './pages/Analyzer';
import PlanGenerator from './pages/PlanGenerator';
import Estimators from './pages/Estimators';
import Resources from './pages/Resources';
import Mentorship from './pages/Mentorship';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/plan" element={<PlanGenerator />} />
          <Route path="/estimators" element={<Estimators />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
