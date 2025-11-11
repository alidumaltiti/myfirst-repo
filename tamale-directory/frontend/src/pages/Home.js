import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home(){
  const [businesses, setBusinesses] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=> {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/businesses');
    setBusinesses(res.data);
  };

  const search = async (e) => {
    e.preventDefault();
    const res = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/businesses?q=' + encodeURIComponent(q));
    setBusinesses(res.data);
  }

  return (
    <div>
      <form onSubmit={search} className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search businesses..." className="border p-2 mr-2"/>
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Search</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businesses.map(b => (
          <div key={b._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold text-lg">{b.name} {b.premium ? '⭐' : ''}</h2>
            <p className="text-sm text-gray-600">{b.category}</p>
            <p className="mt-2">{b.description?.slice(0,120)}</p>
            <div className="mt-3">
              <Link className="text-blue-600" to={'/business/' + b._id}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
