import React, { useEffect, useMemo, useState } from 'react';
import { sections, defaultAnswers, computeScores, analyzeStrengthsWeaknesses } from '../utils/feasibilityConfig';
import ScoreGauge from '../components/ScoreGauge';
import jsPDF from 'jspdf';

const STORAGE_KEY = 'vl_feasibility_reports';

const Slider = ({ value, onChange }) => (
  <input type="range" min="0" max="100" value={value} onChange={e=>onChange(Number(e.target.value))} />
);

const Calculator = () => {
  const [answers, setAnswers] = useState(defaultAnswers);
  const [title, setTitle] = useState('My Business Idea');

  const { overall, breakdown } = useMemo(()=> computeScores(answers), [answers]);
  const { strengths, weaknesses } = useMemo(()=> analyzeStrengthsWeaknesses(answers), [answers]);

  const saveReport = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const report = { id: Date.now(), title, answers, overall, breakdown, createdAt: new Date().toISOString() };
    const updated = [report, ...existing].slice(0,50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    alert('Saved to Dashboard');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('VentureLens 3.0 – Feasibility Report', 14, 16);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    doc.text(`Title: ${title}`, 14, 26);
    doc.text(`Overall Score: ${overall}`, 14, 34);
    breakdown.forEach((b, i)=>{
      doc.text(`${b.title}: ${b.score}`, 14, 44 + i*8);
    });
    const y0 = 44 + breakdown.length*8 + 6;
    doc.text('Strengths:', 14, y0);
    strengths.forEach((s, i)=> doc.text(`• ${s.label} (${s.score})`, 18, y0 + 8 + i*8));
    const y1 = y0 + 8 + strengths.length*8 + 6;
    doc.text('Weaknesses:', 14, y1);
    weaknesses.forEach((w, i)=> doc.text(`• ${w.label} (${w.score})`, 18, y1 + 8 + i*8));
    doc.save('feasibility-report.pdf');
  };

  useEffect(()=>{
    const last = JSON.parse(localStorage.getItem('vl_last_answers') || 'null');
    if(last) setAnswers(last);
  },[]);
  useEffect(()=>{
    localStorage.setItem('vl_last_answers', JSON.stringify(answers));
  },[answers]);

  return (
    <div className="container" style={{padding:'24px', maxWidth:1100, margin:'0 auto'}}>
      <h1>Feasibility & Viability Calculator</h1>

      <div style={{display:'grid', gridTemplateColumns:'1.2fr .8fr', gap:24}}>
        <div>
          <label style={{display:'block', fontWeight:600, margin:'12px 0 6px'}}>Idea Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bgElev)', color:'var(--text)'}} />

          {sections.map(sec => (
            <div key={sec.id} style={{border:'1px solid var(--border)', borderRadius:12, padding:16, marginTop:16, background:'var(--bgElev)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{margin:0}}>{sec.title}</h3>
                <span style={{color:'var(--muted)'}}>Weight: {Math.round(sec.weight*100)}%</span>
              </div>
              <div style={{display:'grid', gap:14, marginTop:12}}>
                {sec.questions.map(q => {
                  const key = `${sec.id}.${q.id}`;
                  const val = answers[key];
                  return (
                    <div key={key}>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <label style={{fontWeight:600}} title={q.help||''}>{q.label}</label>
                        <span style={{color:'var(--muted)'}}>{val}</span>
                      </div>
                      <Slider value={val} onChange={(v)=> setAnswers(a=> ({...a, [key]: v}))} />
                      {q.help && <small style={{color:'var(--muted)'}}>{q.help}</small>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)'}}>
            <h3 style={{marginTop:0}}>Summary</h3>
            <ScoreGauge score={overall} />
            <div style={{marginTop:12}}>
              {breakdown.map(b => (
                <div key={b.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px dashed var(--border)'}}>
                  <span>{b.title}</span>
                  <strong>{b.score}</strong>
                </div>
              ))}
            </div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button className="btn btn-primary" onClick={saveReport}>Save</button>
              <button className="btn btn-secondary" onClick={exportPDF}>Export PDF</button>
            </div>
          </div>
          <div style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)', marginTop:16}}>
            <h3 style={{marginTop:0}}>Insights</h3>
            <div>
              <h4>Strengths</h4>
              <ul>
                {strengths.map(s => <li key={s.key}>{s.label} ({s.score})</li>)}
              </ul>
              <h4>Weaknesses</h4>
              <ul>
                {weaknesses.map(w => <li key={w.key}>{w.label} ({w.score})</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
