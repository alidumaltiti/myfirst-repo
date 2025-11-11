// Config-driven feasibility assessment
export const sections = [
  {
    id: 'market', title: 'Market Potential', weight: 0.2,
    questions: [
      { id: 'demand', label: 'Estimated customer demand', help: 'How strong is demand in your target market?', weight: 0.35 },
      { id: 'size', label: 'Market size and growth', help: 'Total addressable market and growth rate', weight: 0.35 },
      { id: 'access', label: 'Ease of market access', help: 'Distribution channels, regulatory friction', weight: 0.30 },
    ]
  },
  {
    id: 'capital', title: 'Startup Capital', weight: 0.15,
    questions: [
      { id: 'cap_ready', label: 'Availability of startup capital', weight: 0.5 },
      { id: 'runway', label: 'Runway sufficiency (months)', weight: 0.5 },
    ]
  },
  {
    id: 'competition', title: 'Competition & Differentiation', weight: 0.15,
    questions: [
      { id: 'moat', label: 'Strength of differentiation (USP)', weight: 0.6 },
      { id: 'comp_intensity', label: 'Competition intensity (lower = better)', weight: 0.4, invert: true },
    ]
  },
  {
    id: 'model', title: 'Revenue Model', weight: 0.15,
    questions: [
      { id: 'clarity', label: 'Clarity of monetization', weight: 0.5 },
      { id: 'pricing', label: 'Pricing power / margins', weight: 0.5 },
    ]
  },
  {
    id: 'ops', title: 'Operations & Team', weight: 0.15,
    questions: [
      { id: 'capability', label: 'Team capability & experience', weight: 0.6 },
      { id: 'supply', label: 'Supply chain reliability', weight: 0.4 },
    ]
  },
  {
    id: 'sustain', title: 'Sustainability & Social Impact', weight: 0.1,
    questions: [
      { id: 'impact', label: 'Positive social/environmental impact', weight: 0.6 },
      { id: 'compliance', label: 'Compliance & ESG readiness', weight: 0.4 },
    ]
  },
  {
    id: 'risk', title: 'Risk', weight: 0.1,
    questions: [
      { id: 'reg', label: 'Regulatory risk (lower = better)', weight: 0.5, invert: true },
      { id: 'exec', label: 'Execution risk (lower = better)', weight: 0.5, invert: true },
    ]
  },
];

export const defaultAnswers = Object.fromEntries(
  sections.flatMap(s => s.questions.map(q => [ `${s.id}.${q.id}`, 50 ]))
);

export function computeScores(answers){
  // answers: 0..100
  const breakdown = sections.map(s => {
    const sectionScore = s.questions.reduce((acc,q)=>{
      const key = `${s.id}.${q.id}`;
      const raw = Number(answers[key] ?? 0);
      const val = (q.invert ? (100 - raw) : raw);
      return acc + (val/100) * q.weight; // section internal weighting (0..1)
    }, 0);
    // Normalize by total question weights
    const totalQWeight = s.questions.reduce((a,b)=>a + b.weight, 0);
    const normalized = (sectionScore / totalQWeight) * 100; // 0..100
    return { id: s.id, title: s.title, weight: s.weight, score: Math.round(normalized) };
  });
  const overall = Math.round(breakdown.reduce((acc,sec)=> acc + sec.score * sec.weight, 0));
  return { overall, breakdown };
}

export function analyzeStrengthsWeaknesses(answers){
  const entries = sections.flatMap(s => s.questions.map(q => {
    const key = `${s.id}.${q.id}`;
    const raw = Number(answers[key] ?? 0);
    const effective = q.invert ? (100 - raw) : raw;
    return { key, label: `${s.title}: ${q.label}`, score: effective };
  }));
  const sorted = [...entries].sort((a,b)=> b.score - a.score);
  const strengths = sorted.slice(0,3);
  const weaknesses = [...sorted].reverse().slice(0,3);
  return { strengths, weaknesses };
}
