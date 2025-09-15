import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api'; // Import the centralized API function

// --- SVG Icon Components ---
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [industry, setIndustry] = useState('others');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(()=> {
    (async ()=> {
      try {
        const u = await apiFetch('/auth/me'); // Fetch user data from backend
        setUser(u);
        setIndustry(u.industry_type || 'others');
      } catch (err) {
        console.error(err);
        showNotification('Failed to load profile. Please log in.', 'error');
        navigate('/login'); // Redirect to login if fetching fails
      }
    })();
  },[navigate]);
  
  const showNotification = (message, type) => {
      setNotification({ show: true, message, type });
      setTimeout(() => {
          setNotification({ show: false, message: '', type: '' });
      }, 3000);
  };

  async function save() {
    try {
      const updated = await apiFetch('/auth/me', { // Send PUT request to backend
        method: 'PUT',
        body: JSON.stringify({ industry_type: industry })
      });
      setUser(updated);
      showNotification('Profile saved successfully!', 'success');
    } catch (err) {
      showNotification('Save failed: ' + err.message, 'error');
    }
  }
  
  const handleGoToDashboard = () => {
      if (!user) return; // Prevent navigation if user data hasn't loaded
      const dashboardPath = user.industry_type && user.industry_type !== 'others' 
          ? `/dashboard/${user.industry_type}` 
          : '/dashboard'; // Fallback to the loader which will pick a default
      navigate(dashboardPath);
  }

  return (
    <>
      <style>{`
        /* Styles from your original file */
        .profile-body { background-color: #0a0a1a; color: #e0e0e0; font-family: 'Poppins', sans-serif; min-height: 100vh; padding-bottom: 3rem;}
        .container { max-width: 1800px; margin: 0 auto; padding: 0 2.5rem; width: 100%; }
        .profile-container { display: flex; justify-content: center; align-items: flex-start; padding-top: 4rem; }
        .profile-card { background-color: #121224; padding: 2.5rem; border-radius: 12px; border: 1px solid #222244; width: 100%; max-width: 600px; }
        .profile-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #222244; padding-bottom: 1.5rem; }
        .profile-header h2 { font-size: 1.8rem; color: #fff; margin: 0; }
        .profile-header-icon { color: #007bff; }
        .user-info-name { font-size: 1.2rem; font-weight: 600; color: #fff; }
        .user-info-email, .user-info-role { font-size: 0.9rem; color: #a0a0c0; }
        .form-group { margin: 1.5rem 0; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #a0a0c0; }
        .form-select { width: 100%; padding: 0.8rem 1rem; background-color: #0a0a1a; border: 1px solid #222244; color: #fff; border-radius: 6px; font-size: 1rem; }
        .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn { padding: 0.8rem 1.5rem; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; }
        .btn-primary { background-color: #007bff; color: #fff; }
        .btn-secondary { background-color: #1a1a3a; color: #fff; }
        .loading-text { text-align: center; color: #a0a0c0; padding: 2rem; }
        .notification { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 1rem 2rem; border-radius: 8px; color: #fff; opacity: 0; visibility: hidden; transition: opacity 0.3s, transform 0.3s; z-index: 1000; }
        .notification.show { opacity: 1; visibility: visible; transform: translate(-50%, -10px); }
        .notification-success { background-color: #22c55e; }
        .notification-error { background-color: #ef4444; }
      `}</style>
      <div className="profile-body">
        <div className="container">
          <div className="profile-container">
            <div className="profile-card">
                {user ? (
                    <>
                        <div className="profile-header"><div className="profile-header-icon"><UserIcon /></div><h2>User Profile</h2></div>
                        <div className="user-info">
                            <div className="user-info-name">{user.name}</div>
                            <div className="user-info-email">{user.email}</div>
                            <div className="user-info-role"><strong>Role:</strong> {user.role}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="industry-select">Industry Type</label>
                            <select id="industry-select" className="form-select" value={industry} onChange={e => setIndustry(e.target.value)}>
                                <option value="tour">Tour</option><option value="travel">Travel</option><option value="logistics">Logistics</option><option value="others">Others</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-primary" onClick={save}>Save Changes</button>
                            <button className="btn btn-secondary" onClick={handleGoToDashboard}>Go to Dashboard</button>
                        </div>
                    </>
                ) : <div className="loading-text">Loading Profile...</div>}
            </div>
          </div>
        </div>
        <div className={`notification ${notification.show ? 'show' : ''} notification-${notification.type}`}>{notification.message}</div>
      </div>
    </>
  );
}