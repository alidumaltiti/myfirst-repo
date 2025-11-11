import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddListing(){
  const [form, setForm] = useState({ name:'', category:'', phone:'', address:'', description:'' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/businesses', form);
    nav('/business/' + res.data._id);
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add a listing</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Business name" className="w-full border p-2"/>
        <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})} placeholder="Category (tailor, barber...)" className="w-full border p-2"/>
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone number" className="w-full border p-2"/>
        <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Address" className="w-full border p-2"/>
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Short description" className="w-full border p-2"/>
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Create listing</button>
      </form>
    </div>
  )
}
