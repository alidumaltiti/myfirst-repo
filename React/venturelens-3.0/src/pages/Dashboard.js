import React, { useState } from 'react';
import { REPORTS_KEY } from '../utils/storage';

const Dashboard = () => {
  const [reports, setReports] = useState(()=>{ try { return JSON.parse(localStorage.getItem('vl_feasibility_reports')||'[]'); } catch { return []; } });
  const del = (id) => {
    const next = reports.filter(r=> r.id !== id);
    setReports(next);
    localStorage.setItem('vl_feasibility_reports', JSON.stringify(next));
  };
  const reports = (()=>{ try { return JSON.parse(localStorage.getItem(REPORTS_KEY)||'[]'); } catch { return []; } })();
  return (
    <div className="container" style={{padding:'24px', maxWidth:1000, margin:'0 auto'}}>
      <h1>Dashboard</h1>
      <h3>Saved Feasibility Reports</h3>
      {!reports.length && <p>No saved reports yet. Use the Calculator.</p>}
      <div style={{display:'grid', gap:12}}>
        {reports.map(r => (
          <div key={r.id} style={{border:'1px solid var(--border)', borderRadius:10, padding:12, background:'var(--bgElev)'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <strong>{r.title}</strong>
              <span>{new Date(r.createdAt).toLocaleString()}</span>
            </div>
            <div style={{marginTop:8}}>Overall: <strong>{r.overall}</strong></div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:8, marginTop:8}}>
              {r.breakdown.map(b => (
                <div key={b.id} style={{border:'1px dashed var(--border)', borderRadius:8, padding:8}}>
                  <div>{b.title}</div>
                  <strong>{b.score}</strong>
                </div>
              ))}
            </div>
            <div style={{marginTop:8}}>
              <button className="btn btn-secondary" onClick={()=> del(r.id)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
