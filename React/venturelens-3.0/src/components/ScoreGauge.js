import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

const ScoreGauge = ({ score=0 }) => {
  const data = {
    labels: ['Score', 'Remaining'],
    datasets: [{
      data: [score, 100-score],
      backgroundColor: ['var(--primary)', 'var(--border)'],
      borderWidth: 0,
      cutout: '70%'
    }]
  };
  const opts = { responsive:true, plugins:{ legend:{ display:false } }, rotation:-90, circumference:180 };
  return (
    <div style={{width:260, margin:'0 auto', position:'relative'}}>
      <Doughnut data={data} options={opts} />
      <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:700}}>{score}</div>
    </div>
  );
};

export default ScoreGauge;
