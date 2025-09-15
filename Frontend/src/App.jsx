import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { apiFetch } from './api';

// Import all your page components
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import DashboardLoader from './pages/DashboardLoader';
import LogisticsDashboard from './pages/LogisticsDashboard';
import TourDashboard from './pages/TourDashboard';
import TravelDashboard from './pages/TravelDashboard';
import Footer from './components/Footer';

// A consistent layout for all pages
function Layout({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/');
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📊 IndustryHub
                </Link>
                <div className="nav-buttons">
                    {user ? (
                        <>
                            <button className="login-btn" onClick={() => navigate('/profile')}>Profile</button>
                            <button className="register-btn" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                            <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
                        </>
                    )}
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}


export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for a logged-in user when the app first loads
    useEffect(() => {
        const checkUserSession = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await apiFetch('/auth/me');
                    setUser(userData);
                } catch (error) {
                    console.error("Session check failed:", error);
                    localStorage.removeItem('token'); // Clear invalid token
                }
            }
            setLoading(false);
        };
        checkUserSession();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>Loading Application...</div>;
    }

    return (
        <>
            {/* --- ADD THIS STYLE BLOCK TO FIX THE NAVBAR --- */}
            <style>{`
                body {
                    background-color: #0a0a1a;
                    color: #e0e0e0;
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                }
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    background-color: #0a0a1a; /* Ensure navbar has dark background */
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #fff;
                }
                .nav-buttons button {
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.9rem;
                    padding: 0.6rem 1.2rem;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .login-btn {
                    background: transparent;
                    border: none;
                    color: #e0e0e0;
                    margin-right: 0.5rem;
                }
                .login-btn:hover {
                    color: #fff;
                }
                .register-btn {
                    background-color: #007bff;
                    border: 1px solid #007bff;
                    color: #fff;
                    font-weight: 500;
                }
                .register-btn:hover {
                    background-color: #0056b3;
                }
            `}</style>

            <Routes>
                <Route path="/" element={<Layout user={user} onLogout={() => setUser(null)} />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage onAuth={setUser} />} />
                    <Route path="register" element={<RegisterPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="dashboard" element={<DashboardLoader />} />
                    <Route path="dashboard/tour" element={<TourDashboard />} />
                    <Route path="dashboard/travel" element={<TravelDashboard />} />
                    <Route path="dashboard/logistics" element={<LogisticsDashboard />} />
                </Route>
            </Routes>
        </>
    );
}