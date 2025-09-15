import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Start of SVG Icon Components ---
// Using inline SVGs to avoid external dependencies and errors.

const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18V6C4 5.44772 4.44772 5 5 5H7C7.55228 5 8 5.44772 8 6V18C8 18.5523 7.55228 19 7 19H5C4.44772 19 4 18.5523 4 18Z" fill="currentColor"/>
        <path d="M10 18V10C10 9.44772 10.4477 9 11 9H13C13.5523 9 14 9.44772 14 10V18C14 18.5523 13.5523 19 13 19H11C10.4477 19 10 18.5523 10 18Z" fill="currentColor"/>
        <path d="M16 18V14C16 13.4477 16.4477 13 17 13H19C19.5523 13 20 13.4477 20 14V18C20 18.5523 19.5523 19 19 19H17C16.4477 19 16 18.5523 16 18Z" fill="currentColor"/>
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const BookOpenIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

// --- End of SVG Icon Components ---

// NOTE: Please replace this with your actual apiFetch implementation.
// This mock is for demonstration purposes only.
const apiFetch = async (url, options) => {
    console.log(`Fetching from: ${url} with options:`, options);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                score: 87,
                activeTours: 120,
                bookingsToday: 22,
                avgRating: 4.3,
                upcomingTours: [
                    { title: 'Beach Weekend', date: '2025-09-20', slots: 12 },
                    { title: 'City Walk', date: '2025-09-21', slots: 20 },
                    { title: 'Mountain Adventure', date: '2025-09-22', slots: 8 },
                    { title: 'Cultural Heritage', date: '2025-09-23', slots: 19 },
                ],
                insights: [
                    { text: "Bookings are up 12% vs last month", detail: "Your 'Beach Weekend' tour is showing great growth.", type: 'green' },
                    { text: "Peak season approaching", detail: "Consider increasing tour frequency in October.", type: 'orange' },
                    { text: "Customer satisfaction high", detail: "4.8 average rating across all tours.", type: 'blue' },
                ]
            });
        }, 1000); // Simulate network delay
    });
};


// Reusable component for the circular progress bar
const CircularProgress = ({ percentage, size = 100, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle stroke="#2a3a5a" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
            <circle
                stroke="#22c55e"
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
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#fff" fontSize="20px" fontWeight="bold">{`${percentage}`}</text>
            <text x="50%" y="65%" textAnchor="middle" dy=".3em" fill="#a0a0c0" fontSize="12px">/ 100</text>
        </svg>
    );
};


export default function TourDashboard() {
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


  const getSlotColor = (slots) => {
      if (slots < 10) return 'slot-red';
      if (slots < 20) return 'slot-yellow';
      return 'slot-green';
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .dashboard-body {
          background-color: #0a0a1a;
          color: #e0e0e0;
          font-family: 'Poppins', sans-serif;
          margin: 0;
          min-height: 100vh;
        }

        .container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 2.5rem;
          width: 100%;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-buttons button {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .login-btn { background: transparent; border: none; color: #e0e0e0; margin-right: 0.5rem; }
        .login-btn:hover { color: #fff; }
        .register-btn { background-color: #007bff; border: 1px solid #007bff; color: #fff; font-weight: 500; }

        /* Dashboard Header */
        .dashboard-header {
            margin: 2rem 0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .dashboard-header-icon { color: #22c55e; }
        .dashboard-header h1 { font-size: 2.5rem; color: #fff; margin: 0; }
        .dashboard-header p { font-size: 1rem; color: #a0a0c0; margin: 0; margin-top: 0.25rem; }

        /* Summary Cards */
        .summary-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .summary-card {
            background-color: #121224;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #222244;
        }
        .summary-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            color: #a0a0c0;
        }
        .summary-card-header h3 { margin: 0; font-size: 1rem; font-weight: 500; }
        .summary-card .value { font-size: 2.2rem; font-weight: 600; color: #fff; }
        .summary-card .subtitle { font-size: 0.9rem; color: #a0a0c0; }
        .summary-card .trend-green { color: #22c55e; }
        
        /* Quick Actions */
        .quick-actions {
            background-color: #121224;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #222244;
            margin-bottom: 2.5rem;
        }
        .quick-actions h3 { margin: 0 0 0.5rem 0; font-size: 1.2rem; color: #fff; }
        .quick-actions p { margin: 0 0 1.5rem 0; color: #a0a0c0; }
        .action-buttons { display: flex; gap: 1rem; }
        .action-btn {
            padding: 0.6rem 1rem;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: opacity 0.3s ease;
        }
        .action-btn:hover { opacity: 0.9; }
        .btn-green { background-color: #22c55e; color: #fff; }
        .btn-blue { background-color: #3b82f6; color: #fff; }
        .btn-orange { background-color: #f97316; color: #fff; }

        /* Main Grid Layout */
        .main-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2.5rem;
        }
        
        /* Upcoming Tours */
        .tours-table h3, .insights-section h3 { font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem; }
        .tours-table p, .insights-section p { color: #a0a0c0; margin-top: 0; margin-bottom: 1.5rem; }
        .table-row, .table-header {
            display: grid;
            grid-template-columns: 3fr 2fr 1fr;
            padding: 1rem;
            align-items: center;
        }
        .table-header { color: #a0a0c0; font-size: 0.9rem; border-bottom: 1px solid #222244; }
        .table-row { border-radius: 8px; transition: background-color 0.3s ease; }
        .table-row:hover { background-color: #1a1a3a; }
        .slot-badge {
            padding: 0.3rem 0.6rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
        }
        .slot-green { background-color: rgba(34, 197, 94, 0.2); color: #22c55e; }
        .slot-yellow { background-color: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .slot-red { background-color: rgba(239, 68, 68, 0.2); color: #ef4444; }

        /* Insights */
        .insights-list { display: flex; flex-direction: column; gap: 1rem; }
        .insight-card {
            padding: 1.2rem;
            border-radius: 8px;
        }
        .insight-card strong { display: block; color: #fff; margin-bottom: 0.25rem; }
        .insight-card span { font-size: 0.9rem; color: #e0e0e0; }
        .insight-green { background-color: #164e32; }
        .insight-orange { background-color: #623611; }
        .insight-blue { background-color: #1c3d7a; }
        
        @media (max-width: 1200px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }
        @media (max-width: 768px) {
            .action-buttons { flex-direction: column; }
            .table-row, .table-header {
                grid-template-columns: 2fr 1.5fr 1fr;
                padding: 0.8rem;
            }
            .dashboard-header h1 { font-size: 2rem; }
        }
      `}</style>
      <div className="dashboard-body">
        <div className="container">
          

          <header className="dashboard-header">
            <div className="dashboard-header-icon"><MapPinIcon /></div>
            <div>
              <h1>Tour Dashboard</h1>
              <p>Manage your tours, track bookings, and monitor business performance</p>
            </div>
          </header>

          <div className="summary-cards-grid">
            <div className="summary-card">
              <div className="summary-card-header"><h3>Business Health</h3></div>
              <p className="subtitle">Overall performance score</p>
              <CircularProgress percentage={data?.score ?? 0} size={120}/>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Active Tours</h3><ActivityIcon /></div>
              <div className="value">{data?.activeTours ?? '...'}</div>
              <div className="subtitle trend-green">+5 this week</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Bookings Today</h3><CalendarIcon /></div>
              <div className="value">{data?.bookingsToday ?? '...'}</div>
              <div className="subtitle trend-green">+12% vs yesterday</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-header"><h3>Average Rating</h3><StarIcon /></div>
              <div className="value">{data?.avgRating ?? '...'}</div>
              <div className="subtitle">0.2 improvement</div>
            </div>
          </div>

          <div className="quick-actions">
              <h3>Quick Actions</h3>
              <p>Common tasks and operations</p>
              <div className="action-buttons">
                  <button className="action-btn btn-green"><PlusIcon/>Create Tour</button>
                  <button className="action-btn btn-blue"><BookOpenIcon/>Add Guide</button>
                  <button className="action-btn btn-orange"><TagIcon/>Publish Offer</button>
              </div>
          </div>

          <div className="main-grid">
            <div className="tours-table">
                <h3>Upcoming Tours</h3>
                <p>Scheduled tours for the next week</p>
                <div className="table-header">
                    <div>Title</div>
                    <div>Date</div>
                    <div>Slots</div>
                </div>
                {(data?.upcomingTours ?? [1, 2, 3, 4]).map((tour, index) => (
                    <div key={tour.title || index} className="table-row">
                        <div>{tour.title || 'Loading...'}</div>
                        <div>{tour.date || '...'}</div>
                        <div>
                            {tour.slots !== undefined && (
                                <span className={`slot-badge ${getSlotColor(tour.slots)}`}>{tour.slots}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="insights-section">
                <h3><TrendingUpIcon style={{verticalAlign: 'bottom', marginRight: '0.5rem'}}/>Insights</h3>
                <p>Key performance indicators</p>
                <div className="insights-list">
                    {(data?.insights ?? [1, 2, 3]).map((insight, index) => (
                         <div key={index} className={`insight-card insight-${insight.type || 'blue'}`}>
                            <strong>{insight.text || 'Loading insight...'}</strong>
                            <span>{insight.detail || '...'}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

