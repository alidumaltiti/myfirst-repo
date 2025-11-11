import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FeaturesGrid = () => {
  const { t } = useTranslation();
  const features = [
    {icon:'fa-calculator', title:'Smart Feasibility Calculator', link:'/calculator', desc:'Analyze market, costs, and competition with weighted scoring.'},
    {icon:'fa-robot', title:'LensAI Assistant', link:'/analyzer', desc:'24/7 AI-powered insights and recommendations.'},
    {icon:'fa-file-alt', title:'Business Plan Generator', link:'/plan', desc:'Create professional plans with export to PDF/Word.'},
    {icon:'fa-chart-line', title:'Financial Estimators', link:'/estimators', desc:'Cost, revenue projection, and break-even tools.'},
    {icon:'fa-graduation-cap', title:'Resource Center', link:'/resources', desc:'Curated guides, videos, and templates.'},
    {icon:'fa-users', title:'Mentorship Hub', link:'/mentorship', desc:'Connect with experienced mentors.'},
  ];
  return (
    <div className="features-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:20, marginTop:20}}>
      {features.map((f,i)=> (
        <a key={i} href={f.link} className="feature-card" style={{border:'1px solid var(--border)', padding:16, borderRadius:12, background:'var(--bgElev)', color:'inherit', textDecoration:'none'}}>
          <div className={`feature-icon fas ${f.icon}`} style={{fontSize:24, color:'var(--primary)'}}></div>
          <h3 style={{margin:'8px 0'}}>{f.title}</h3>
          <p style={{color:'var(--muted)', margin:0}}>{f.desc}</p>
        </a>
      ))}
    </div>
  );
};

export const Testimonials = () => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setIdx(i => (i+1)%3), 3500);
    return ()=> clearInterval(id);
  },[]);
  const items = [
    { name:'Sarah Johnson', title:'Founder, EcoPackage Solutions', quote:'VentureLens 3.0 helped me identify critical gaps and launch successfully!' },
    { name:'Michael Chen', title:'CEO, TechStart Innovations', quote:'The plan generator saved me weeks. Investor-ready and professional.' },
    { name:'Emily Rodriguez', title:'Founder, Local Marketplace App', quote:'LensAI plus projections helped me secure funding.' },
  ];
  return (
    <div style={{marginTop:32}}>
      <h3>{t('home.testimonials')}</h3>
      <div style={{position:'relative'}}>
        {items.map((it, i)=> (
          <div key={i} style={{
            border:'1px solid var(--border)', padding:16, borderRadius:12, background:'var(--bgElev)',
            position: i===idx? 'relative':'absolute', inset:0, opacity: i===idx?1:0, transition:'opacity .5s'
          }}>
            <div style={{color:'var(--muted)'}}>★★★★★</div>
            <p style={{margin:'6px 0 10px'}}>&ldquo;{it.quote}&rdquo;</p>
            <strong>{it.name}</strong>
            <div style={{color:'var(--muted)'}}>{it.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CTASection = () => {
  const { t } = useTranslation();
  return (
  <div style={{border:'1px solid var(--border)', borderRadius:12, padding:20, marginTop:32, background:'var(--bgElev)', textAlign:'center'}}>
    <h3>{t('home.ctaTitle')}</h3>
    <p>{t('home.ctaSub')}</p>
    <div style={{display:'flex', gap:8, justifyContent:'center'}}>
      <a className="btn btn-primary" href="/calculator">{t('home.ctaStart')}</a>
      <a className="btn btn-secondary" href="/signup">{t('home.ctaSignup')}</a>
    </div>
  </div>
);
}
