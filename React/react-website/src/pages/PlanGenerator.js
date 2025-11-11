import React, { useState } from 'react';
import jsPDF from 'jspdf';

const sections = [
  { id:'exec', label:'Executive Summary' },
  { id:'problem', label:'Problem Statement' },
  { id:'market', label:'Market Analysis' },
  { id:'product', label:'Product/Service' },
  { id:'financial', label:'Financial Plan' },
  { id:'marketing', label:'Marketing Strategy' },
  { id:'risk', label:'Risk Analysis' },
  { id:'conclusion', label:'Conclusion' },
];

const PlanGenerator = () => {
  const [title, setTitle] = useState('My Business Plan');
  const [values, setValues] = useState(Object.fromEntries(sections.map(s=>[s.id,''])));

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 14, 16);
    doc.setFontSize(12);
    let y = 26;
    sections.forEach(s=>{
      doc.setFont(undefined, 'bold');
      doc.text(s.label, 14, y);
      y += 6; doc.setFont(undefined, 'normal');
      const text = values[s.id] || '';
      const lines = doc.splitTextToSize(text || '...', 180);
      lines.forEach(line => { doc.text(line, 14, y); y += 6; });
      y += 6;
      if(y > 270){ doc.addPage(); y = 20; }
    });
    doc.save('business-plan.pdf');
  };

  return (
    <div className="container" style={{padding:'24px', maxWidth:1000, margin:'0 auto'}}>
      <h1>Business Plan Generator</h1>
      <label style={{display:'block', fontWeight:600, margin:'12px 0 6px'}}>Plan Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bgElev)', color:'var(--text)'}} />

      <div style={{display:'grid', gap:16, marginTop:16}}>
        {sections.map(s=> (
          <div key={s.id} style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)'}}>
            <label style={{fontWeight:600}}>{s.label}</label>
            <textarea rows={6} value={values[s.id]} onChange={e=>setValues(v=>({...v, [s.id]: e.target.value}))} style={{width:'100%', marginTop:8, padding:12, border:'1px solid var(--border)', borderRadius:8, background:'var(--bgElev)', color:'var(--text)'}} />
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:8, marginTop:12}}>
        <button className="btn btn-primary" onClick={exportPDF}>Export PDF</button>
      </div>
    </div>
  );
};
export default PlanGenerator;
