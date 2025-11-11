import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Business from './pages/Business';
import AddListing from './pages/AddListing';

function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold"><Link to="/">Tamale Directory</Link></h1>
          <nav>
            <Link className="mr-4" to="/add">Add Listing</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/business/:id" element={<Business/>} />
          <Route path="/add" element={<AddListing/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
