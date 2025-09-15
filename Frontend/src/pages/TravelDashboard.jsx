import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Start of SVG Icon Components ---
// Using inline SVGs to avoid external dependencies.

const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18V6C4 5.44772 4.44772 5 5 5H7C7.55228 5 8 5.44772 8 6V18C8 18.5523 7.55228 19 7 19H5C4.44772 19 4 18.5523 4 18Z" fill="currentColor"/>
        <path d="M10 18V10C10 9.44772 10.4477 9 11 9H13C13.5523 9 14 9.44772 14 10V18C14 18.5523 13.5523 19 13 19H11C10.4477 19 10 18.5523 10 18Z" fill="currentColor"/>
        <path d="M16 18V14C16 13.4477 16.4477 13 17 13H19C19.5523 13 20 13.4477 20 14V18C20 18.5523 19.5523 19 19 19H17C16.4477 19 16 18.5523 16 18Z" fill="currentColor"/>
    </svg>
);

const PlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2z"/></svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

// --- End of SVG Icon Components ---

// NOTE: Please replace this with your actual apiFetch implementation.
const apiFetch = async (url, options) => {
    console.log(`Fetching from: ${url} with options:`, options);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                score: 92,
                activeReservations: 156,
                conversionRate: 24.8,
                totalCustomers: 2847,
                recentReservations: [
                    { ref: 'TR-001', customer: 'Alice Johnson', status: 'Confirmed' },
                    { ref: 'TR-002', customer: 'Bob Smith', status: 'Pending' },
                    { ref: 'TR-003', customer: 'Carol Davis', status: 'Confirmed' },
                    { ref: 'TR-004', customer: 'David Wilson', status: 'Canceled' },
                ],
                performance: [
                    { label: 'Booking Success Rate', value: 94.2 },
                    { label: 'Customer Satisfaction', value: 89.7 },
                    { label: 'Revenue Growth', value: 76.3 },
                ],
                insights: [
                     { text: 'Peak booking hours: 2-4 PM', detail: 'Consider promotional campaigns during this time.', type: 'orange' },
                     { text: 'International bookings +15%', detail: 'European market showing strong growth.', type: 'green' }
                ]
            });
        }, 1000);
    });
};


// Reusable component for the circular progress bar (RadialScore)
const RadialScore = ({ score = 0, size = 100, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle stroke="#2a3a5a" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
            <circle
                stroke="#f59e0b"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease 0s' }}
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#fff" fontSize="20px" fontWeight="bold">{`${score}`}</text>
            <text x="50%" y="65%" textAnchor="middle" dy=".3em" fill="#a0a0c0" fontSize="12px">/ 100</text>
        </svg>
    );
};

// Reusable component for the linear progress bars
const ProgressBar = ({ label, value }) => (
    <div className="progress-bar-wrapper">
        <div className="progress-labels">
            <span>{label}</span>
            <strong>{value}%</strong>
        </div>
        <div className="progress-bg">
            <div className="progress-fg" style={{ width: `${value}%` }}></div>
        </div>
    </div>
);


export default function TravelDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  useEffect(()=> {
    (async ()=> {
      try {
        const res = await apiFetch('/health-score', { method: 'POST' });
        setData(res);
      } catch (err) { console.error(err); }
    })();
  },[]);

  const getStatusClass = (status) => {
    switch (status) {
        case 'Confirmed': return 'status-green';
        case 'Pending': return 'status-yellow';
        case 'Canceled': return 'status-red';
        default: return '';
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .dashboard-body { background-color: #0a0a1a; color: #e0e0e0; font-family: 'Poppins', sans-serif; margin: 0; min-height: 100vh; }
        .container { max-width: 1800px; margin: 0 auto; padding: 0 2.5rem; width: 100%; }

        /* Navbar */
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 0.75rem; }
        .nav-buttons button { font-family: 'Poppins', sans-serif; font-size: 0.9rem; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; }
        .login-btn { background: transparent; border: none; color: #e0e0e0; margin-right: 0.5rem; }
        .register-btn { background-color: #007bff; border: 1px solid #007bff; color: #fff; font-weight: 500; }

        /* Dashboard Header */
        .dashboard-header { margin: 2rem 0; display: flex; align-items: center; gap: 0.75rem; }
        .dashboard-header-icon { color: #f59e0b; }
        .dashboard-header h1 { font-size: 2.5rem; color: #fff; margin: 0; }
        .dashboard-header p { font-size: 1rem; color: #a0a0c0; margin: 0; margin-top: 0.25rem; }

        /* Summary Cards */
        .summary-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
        .summary-card { background-color: #121224; padding: 1.5rem; border-radius: 12px; border: 1px solid #222244; }
        .summary-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: #a0a0c0; }
        .summary-card-header h3 { margin: 0; font-size: 1rem; font-weight: 500; }
        .summary-card .value { font-size: 2.2rem; font-weight: 600; color: #fff; }
        .summary-card .subtitle { font-size: 0.9rem; color: #a0a0c0; }
        .summary-card .trend-green { color: #22c55e; }

        /* Main Grid */
        .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; }
        .main-grid h3 { font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem; }
        .main-grid p { color: #a0a0c0; margin-top: 0; margin-bottom: 1.5rem; }

        /* Reservations Table */
        .reservations-table { background-color: #121224; padding: 1.5rem; border-radius: 12px; border: 1px solid #222244; }
        .table-row, .table-header { display: grid; grid-template-columns: 1fr 2fr 1fr; padding: 1rem; align-items: center; }
        .table-header { color: #a0a0c0; font-size: 0.9rem; border-bottom: 1px solid #222244; }
        .status-badge { padding: 0.25rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500; width: fit-content; text-align: center; }
        .status-green { background-color: rgba(34, 197, 94, 0.2); color: #22c55e; }
        .status-yellow { background-color: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .status-red { background-color: rgba(239, 68, 68, 0.2); color: #ef4444; }

        /* Performance Section */
        .performance-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .performance-card { background-color: #121224; padding: 1.5rem; border-radius: 12px; border: 1px solid #222244; }
        .progress-bar-wrapper { margin-bottom: 1.2rem; }
        .progress-labels { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; }
        .progress-bg { height: 8px; background-color: #2a3a5a; border-radius: 4px; }
        .progress-fg { height: 100%; background-color: #007bff; border-radius: 4px; }
        .insight-card { padding: 1.2rem; border-radius: 8px; }
        .insight-card strong { display: block; color: #fff; margin-bottom: 0.25rem; }
        .insight-card span { font-size: 0.9rem; color: #e0e0e0; }
        .insight-orange { background-color: #623611; }
        .insight-green { background-color: #164e32; }

        @media (max-width: 1200px) { .main-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="dashboard-body">
        <div className="container">
          

          <header className="dashboard-header">
            <div className="dashboard-header-icon"><PlaneIcon /></div>
            <div>
              <h1>Travel Dashboard</h1>
              <p>Monitor reservations, track conversions, and optimize travel operations</p>
            </div>
          </header>

          <div className="summary-cards-grid">
            <div className="summary-card">
              <div className="summary-card-header"><h3>Business Health</h3></div>
              <p className="subtitle">Overall performance score</p>
              <RadialScore score={data?.score ?? 0} size={120}/>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Active Reservations</h3><BriefcaseIcon /></div>
              <div className="value">{data?.activeReservations ?? '...'}</div>
              <div className="subtitle">+5 today</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Conversion Rate</h3><TrendingUpIcon /></div>
              <div className="value">{data?.conversionRate ?? '...'}%</div>
              <div className="subtitle trend-green">+2.2% this month</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Total Customers</h3><UsersIcon /></div>
              <div className="value">{data?.totalCustomers?.toLocaleString() ?? '...'}</div>
              <div className="subtitle">+10% vs YTD</div>
            </div>
          </div>

          <div className="main-grid">
            <div className="reservations-table">
              <h3>Recent Reservations</h3>
              <p>Latest travel bookings and their status</p>
              <div className="table-header">
                  <div>Reference</div>
                  <div>Customer</div>
                  <div>Status</div>
              </div>
              {(data?.recentReservations ?? [1, 2, 3, 4]).map((res, index) => (
                  <div key={res.ref || index} className="table-row">
                      <div>{res.ref || 'Loading...'}</div>
                      <div>{res.customer || '...'}</div>
                      <div>
                        {res.status && <span className={`status-badge ${getStatusClass(res.status)}`}>{res.status}</span>}
                      </div>
                  </div>
              ))}
            </div>
            <div className="performance-section">
                <div className="performance-card">
                    <h3><TrendingUpIcon style={{verticalAlign: 'bottom', marginRight: '0.5rem'}}/>Performance</h3>
                    <p>Key metrics and trends</p>
                    {(data?.performance ?? []).map(p => <ProgressBar key={p.label} label={p.label} value={p.value} />)}
                </div>
                 {(data?.insights ?? []).map((insight, index) => (
                    <div key={index} className={`insight-card insight-${insight.type}`}>
                        <strong>{insight.text}</strong>
                        <span>{insight.detail}</span>
                    </div>
                 ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
