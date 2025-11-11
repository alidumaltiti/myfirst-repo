import React, { useEffect, useRef, useState } from 'react';
import { getLatestReport } from '../utils/storage';

/* replaced by askAI */

  // Simple placeholder: echo with basic tips and recent score
  const latest = getLatestReport();
  const scoreInfo = latest ? `Latest feasibility score: ${latest.overall}. ` : '';
  const tips = 'Tip: Strengthen your differentiation, validate with 5–10 customers, and prototype a simple MVP.';
  return `${scoreInfo}${tips}\n\nYou asked: "${prompt}"`;
};

const Analyzer = () => {
  const [messages, setMessages] = useState(()=>{
    const latest = getLatestReport();
    if(latest){
      return [{ role:'system', content:`Context: Latest report "${latest.title}" with score ${latest.overall}.` }];
    }
    return [{ role:'system', content:'Context: No feasibility report yet. Use the Calculator for best results.' }];
  });
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(()=>{
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if(!input.trim()) return;
    const userMsg = { role:'user', content: input.trim() };
    setMessages(m=>[...m, userMsg, { role:'assistant', content:'Thinking...' }]);
    setInput('');
    const { askAI } = await import('../utils/ai');
    const reply = await askAI(userMsg.content);
    setMessages(m=> m.slice(0, -1).concat({ role:'assistant', content: reply }));
  };

  return (
    <div className="container" style={{padding:'24px', maxWidth:900, margin:'0 auto'}}>
      <h1>LensAI – Business Idea Analyzer</h1>
      <div style={{border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', background:'var(--bgElev)'}}>
        <div ref={listRef} style={{maxHeight:400, overflow:'auto', padding:16, display:'grid', gap:12}}>
          {messages.map((m,i)=> (
            <div key={i} style={{justifySelf: m.role==='user'?'end':'start', background: m.role==='user'? 'var(--primary)':'#0000', color: m.role==='user'?'#fff':'inherit', padding:'10px 12px', borderRadius:10, maxWidth:'80%'}}>
              <div style={{opacity:.7, fontSize:12}}>{m.role}</div>
              <div>{m.content}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex', gap:8, padding:12, borderTop:'1px solid var(--border)'}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your idea, market, pricing..." style={{flex:1, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bgElev)', color:'var(--text)'}} />
          <button className="btn btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default Analyzer;
