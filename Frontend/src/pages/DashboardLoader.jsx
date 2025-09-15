import React, { useEffect } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';

export default function DashboardLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const me = await apiFetch('/auth/me');
        const industry = me.industry_type || 'others';
        
        // Redirect based on the user's industry type
        switch (industry) {
          case 'tour':
            navigate('/dashboard/tour', { replace: true });
            break;
          case 'travel':
            navigate('/dashboard/travel', { replace: true });
            break;
          case 'logistics':
            navigate('/dashboard/logistics', { replace: true });
            break;
          default:
            navigate('/dashboard/tour', { replace: true }); // Default dashboard
        }
      } catch (err) {
        alert('Could not load profile. Please log in.');
        navigate('/login', { replace: true });
      }
    })();
  }, [navigate]);

  return <div style={{textAlign: 'center', padding: '5rem', color: 'white'}}><h3>Loading your dashboard...</h3></div>;
}