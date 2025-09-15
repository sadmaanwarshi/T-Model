import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api'; // Import the real apiFetch

// --- Start of SVG Icon Components ---
const LogoIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18V6C4 5.44772 4.44772 5 5 5H7C7.55228 5 8 5.44772 8 6V18C8 18.5523 7.55228 19 7 19H5C4.44772 19 4 18.5523 4 18Z" fill="currentColor"/><path d="M10 18V10C10 9.44772 10.4477 9 11 9H13C13.5523 9 14 9.44772 14 10V18C14 18.5523 13.5523 19 13 19H11C10.4477 19 10 18.5523 10 18Z" fill="currentColor"/><path d="M16 18V14C16 13.4477 16.4477 13 17 13H19C19.5523 13 20 13.4477 20 14V18C20 18.5523 19.5523 19 19 19H17C16.4477 19 16 18.5523 16 18Z" fill="currentColor"/></svg> );
const TruckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg> );
const AlertTriangleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> );
const CheckCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> );
const MapPinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> );
const ClockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> );
const BatteryChargingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline></svg> );
const TrafficConeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7.5 15H4.5L12 2z"/><path d="M8 17h8"/><path d="M6 21h12"/></svg> );

const RadialScore = ({ score = 0, size = 100, strokeWidth = 10, title }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    return ( <div style={{ textAlign: 'center' }}> {title && <h4>{title}</h4>} <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}> <circle stroke="#2a3a5a" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} /> <circle stroke="#007bff" fill="transparent" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" r={radius} cx={size / 2} cy={size / 2} style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease 0s' }} /> <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#fff" fontSize="20px" fontWeight="bold">{`${score}`}</text> <text x="50%" y="65%" textAnchor="middle" dy=".3em" fill="#a0a0c0" fontSize="12px">/ 100</text> </svg> </div> );
};

export default function LogisticsDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(()=> {
    (async ()=> {
      try {
        // Fetch data from your specific backend endpoint for this dashboard
        const res = await apiFetch('/health-score', { method: 'POST' }); 
        setData(res);
      } catch (err) { 
        console.error(err); 
        // If unauthorized, redirect to login
        if (String(err.message).includes('401') || String(err.message).includes('403')) {
            navigate('/login');
        }
      }
    })();
  },[navigate]);
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'In Transit': return 'status-blue';
      case 'Delivered': return 'status-green';
      case 'Delayed': return 'status-red';
      case 'Processing': return 'status-yellow';
      default: return '';
    }
  }
  
  return (
    <>
      <style>{`
        /* Styles from your original file */
        .dashboard-body { background-color: #0a0a1a; color: #e0e0e0; font-family: 'Poppins', sans-serif; min-height: 100vh; }
        .container { max-width: 1800px; margin: 0 auto; padding: 0 2.5rem; width: 100%; }
        .dashboard-header { margin: 2rem 0; }
        .dashboard-header h1 { font-size: 2.5rem; color: #fff; margin: 0 0 0.5rem 0; }
        .dashboard-header p { font-size: 1rem; color: #a0a0c0; margin: 0; }
        .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; }
        .main-content, .sidebar { display: flex; flex-direction: column; gap: 2.5rem; }
        .card { background-color: #121224; padding: 1.5rem; border-radius: 12px; border: 1px solid #222244; }
        .card h3 { font-size: 1rem; font-weight: 500; color: #a0a0c0; margin: 0 0 0.5rem 0; }
        .summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .summary-card .value { font-size: 2.5rem; font-weight: 700; color: #fff; }
        .fleet-status-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .fleet-card { background-color: #1a1a3a; padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
        .shipments-table .table-header, .shipments-table .table-row { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 0.8rem 0; border-bottom: 1px solid #222244; }
        .status-badge { padding: 0.25rem 0.6rem; border-radius: 12px; font-size: 0.8rem; }
        .status-blue { background-color: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .status-green { background-color: rgba(34, 197, 94, 0.2); color: #22c55e; }
        .status-red { background-color: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .status-yellow { background-color: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .map-placeholder { height: 250px; background-color: #1a1a3a; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #a0a0c0; }
        .route-info-card { background-color: #1a1a3a; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 1rem; }
        @media (max-width: 1200px) { .dashboard-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="dashboard-body">
        <div className="container">
          <header className="dashboard-header"><h1>Logistics Dashboard</h1><p>Monitor fleet, track shipments, and manage delivery operations</p></header>
          <div className="dashboard-grid">
            <main className="main-content">
              <div className="summary-cards">
                <div className="card summary-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><RadialScore score={data?.score ?? 0} size={120} /></div>
                <div className="card summary-card"><h3>In Transit</h3><div className="value">{data?.inTransit ?? '...'}</div></div>
                <div className="card summary-card"><h3>Delayed</h3><div className="value">{data?.delayed ?? '...'}</div></div>
                <div className="card summary-card"><h3>On Time Rate</h3><div className="value">{data?.onTimeRate ?? '...'}%</div></div>
              </div>
              <div className="card"><h3>Fleet Status</h3>
                <div className="fleet-status-cards">
                  <div className="fleet-card"><div><div className="value">{data?.fleet?.total ?? '...'}</div><div>Total Vehicles</div></div><TruckIcon/></div>
                  <div className="fleet-card"><div><div className="value">{data?.fleet?.active ?? '...'}</div><div>Active</div></div><CheckCircleIcon style={{color: '#22c55e'}}/></div>
                  <div className="fleet-card"><div><div className="value">{data?.fleet?.offline ?? '...'}</div><div>Offline</div></div><AlertTriangleIcon style={{color: '#ef4444'}}/></div>
                  <div className="fleet-card"><div><div className="value">{data?.fleet?.maintenance ?? '...'}</div><div>Maintenance</div></div><AlertTriangleIcon style={{color: '#f59e0b'}}/></div>
                </div>
              </div>
              <div className="card shipments-table"><h3>Active Shipments</h3>
                <div className="table-header"><div>Shipment ID</div><div>Status</div><div>ETA</div></div>
                {(data?.shipments ?? [1,2,3,4]).map((shipment, i) => (
                  <div key={shipment.id || i} className="table-row">
                    <div>{shipment.id || 'Loading...'}</div>
                    <div>{shipment.status && <span className={`status-badge ${getStatusClass(shipment.status)}`}>{shipment.status}</span>}</div>
                    <div>{shipment.eta || '...'}</div>
                  </div>
                ))}
              </div>
            </main>
            <aside className="sidebar">
              <div className="card"><h3>Route Overview</h3><div className="map-placeholder"><MapPinIcon /><span>Live Map View</span></div></div>
              <div className="route-info-card"><ClockIcon /><div><strong>Average delivery time: 2.4 hours</strong></div></div>
              <div className="route-info-card"><BatteryChargingIcon /><div><strong>Fuel efficiency improved</strong></div></div>
              <div className="route-info-card"><TrafficConeIcon /><div><strong>Traffic delays on Route A</strong></div></div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}