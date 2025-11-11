import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);

const Estimators = () => {
  const [startupCost, setStartupCost] = useState(5000);
  const [fixedMonthly, setFixedMonthly] = useState(1000);
  const [variablePerUnit, setVariablePerUnit] = useState(5);
  const [pricePerUnit, setPricePerUnit] = useState(12);
  const [unitsPerMonth, setUnitsPerMonth] = useState(400);

  const monthlyRevenue = pricePerUnit * unitsPerMonth;
  const monthlyCost = fixedMonthly + variablePerUnit * unitsPerMonth;
  const monthlyProfit = monthlyRevenue - monthlyCost;

  const breakEvenUnits = Math.ceil((fixedMonthly + startupCost/12) / (pricePerUnit - variablePerUnit));

  const projection = useMemo(()=>{
    const months = [...Array(12)].map((_,i)=>`M${i+1}`);
    let cum = -startupCost; // start with initial investment
    const data = months.map(()=>{
      cum += monthlyProfit;
      return cum;
    });
    return { months, data };
  }, [startupCost, monthlyProfit]);

  const chartData = {
    labels: projection.months,
    datasets: [{
      label: 'Cumulative Profit',
      data: projection.data,
      borderColor: 'var(--primary)',
      backgroundColor: 'transparent',
      tension: 0.25
    }]
  };
  const options = { plugins:{ legend:{ display:true } }, scales:{ y:{ grid:{ color:'rgba(0,0,0,0.1)' } } } };

  return (
    <div className="container" style={{padding:'24px', maxWidth:1000, margin:'0 auto'}}>
      <h1>Market & Financial Estimators</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <div style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)'}}>
          <h3>Inputs</h3>
          <label>Startup Cost</label>
          <input type="number" value={startupCost} onChange={e=>setStartupCost(Number(e.target.value))} />
          <label>Fixed Monthly Cost</label>
          <input type="number" value={fixedMonthly} onChange={e=>setFixedMonthly(Number(e.target.value))} />
          <label>Variable Cost per Unit</label>
          <input type="number" value={variablePerUnit} onChange={e=>setVariablePerUnit(Number(e.target.value))} />
          <label>Price per Unit</label>
          <input type="number" value={pricePerUnit} onChange={e=>setPricePerUnit(Number(e.target.value))} />
          <label>Units per Month</label>
          <input type="number" value={unitsPerMonth} onChange={e=>setUnitsPerMonth(Number(e.target.value))} />
        </div>
        <div style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)'}}>
          <h3>Results</h3>
          <p>Monthly Revenue: <strong>{monthlyRevenue.toFixed(2)}</strong></p>
          <p>Monthly Cost: <strong>{monthlyCost.toFixed(2)}</strong></p>
          <p>Monthly Profit: <strong>{monthlyProfit.toFixed(2)}</strong></p>
          <p>Break-even Units (approx): <strong>{isFinite(breakEvenUnits)? breakEvenUnits : 'N/A'}</strong></p>
        </div>
      </div>
      <div style={{border:'1px solid var(--border)', borderRadius:12, padding:16, background:'var(--bgElev)', marginTop:16}}>
        <h3>12-Month Cumulative Profit Projection</h3>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
export default Estimators;
