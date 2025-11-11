import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Business(){
  const { id } = useParams();
  const [b, setB] = useState(null);

  useEffect(()=> {
    axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/businesses/' + id)
      .then(res => setB(res.data))
      .catch(()=> setB(null));
  }, [id]);

  if(!b) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">{b.name} {b.premium ? '⭐ Premium' : ''}</h2>
      <p className="text-sm text-gray-600">{b.category} • {b.address}</p>
      <p className="mt-4">{b.description}</p>
      <div className="mt-4">
        <a href={'tel:' + b.phone} className="inline-block bg-green-600 text-white px-3 py-2 rounded">Call</a>
      </div>
    </div>
  )
}
