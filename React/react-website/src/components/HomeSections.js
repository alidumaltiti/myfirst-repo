import React from 'react';

export const FeaturesGrid = () => {
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
  const items = [
    { name:'Sarah Johnson', title:'Founder, EcoPackage Solutions', quote:'VentureLens 2.0 helped me identify critical gaps and launch successfully!' },
    { name:'Michael Chen', title:'CEO, TechStart Innovations', quote:'The plan generator saved me weeks. Investor-ready and professional.' },
    { name:'Emily Rodriguez', title:'Founder, Local Marketplace App', quote:'LensAI plus projections helped me secure funding.' },
  ];
  return (
    <div style={{marginTop:32}}>
      <h3>What Our Users Say</h3>
      <div style={{display:'grid', gap:16}}>
        {items.map((t, i)=> (
          <div key={i} style={{border:'1px solid var(--border)', padding:16, borderRadius:12, background:'var(--bgElev)'}}>
            <div style={{color:'var(--muted)'}}>★★★★★</div>
            <p style={{margin:'6px 0 10px'}}>&ldquo;{t.quote}&rdquo;</p>
            <strong>{t.name}</strong>
            <div style={{color:'var(--muted)'}}>{t.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CTASection = () => (
  <div style={{border:'1px solid var(--border)', borderRadius:12, padding:20, marginTop:32, background:'var(--bgElev)', textAlign:'center'}}>
    <h3>Ready to Turn Your Idea Into Reality?</h3>
    <p>Join thousands of entrepreneurs using VentureLens 2.0</p>
    <div style={{display:'flex', gap:8, justifyContent:'center'}}>
      <a className="btn btn-primary" href="/calculator">Start Free Assessment</a>
      <a className="btn btn-secondary" href="/signup">Create Account</a>
    </div>
  </div>
);
