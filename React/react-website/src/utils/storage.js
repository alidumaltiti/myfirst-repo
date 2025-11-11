export const REPORTS_KEY = 'vl_feasibility_reports';

export function getReports(){
  try { return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]'); } catch { return []; }
}
export function getLatestReport(){
  const list = getReports();
  return list && list.length ? list[0] : null;
}
