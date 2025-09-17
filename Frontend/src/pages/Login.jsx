import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api"; // Import the centralized API function

export default function LoginPage({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Use the centralized apiFetch for the login request
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        if (onAuth) {
            onAuth(data.user); // Update the user state in App.jsx
        }
        navigate("/profile"); // Redirect to profile page on successful login
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Server not reachable. Please try again later.");
    }
  };

  const handleDemoClick = (email, password) => {
    setForm({ email, password });
  }

  const LoginIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg> );

  return (
    <>
      <style>{`
        /* Styles from your original file are kept here for simplicity */
        .login-page-body { background-color: #0a0a1a; color: #e0e0e0; font-family: 'Poppins', sans-serif; min-height: 100vh; display: flex; flex-direction: column; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; width: 100%; }
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #fff; text-decoration: none; }
        .nav-buttons button { font-family: 'Poppins', sans-serif; font-size: 0.9rem; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; }
        .login-btn { background: transparent; border: none; color: #e0e0e0; margin-right: 0.5rem; }
        .register-btn { background-color: #007bff; border: 1px solid #007bff; color: #fff; }
        .login-container { flex-grow: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 0; }
        .login-card { background-color: #121224; padding: 2.5rem; border-radius: 12px; border: 1px solid #222244; width: 100%; max-width: 420px; text-align: center; }
        .login-icon-wrapper { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 1.5rem; background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .login-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #fff; }
        .login-card > p { color: #a0a0c0; margin-bottom: 2rem; }
        .login-form { text-align: left; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #a0a0c0; }
        .form-group input { width: 100%; padding: 0.8rem 1rem; background-color: #0a0a1a; border: 1px solid #333355; border-radius: 6px; color: #e0e0e0; font-family: 'Poppins', sans-serif; font-size: 1rem; transition: border-color 0.3s ease; }
        .form-group input:focus { outline: none; border-color: #007bff; }
        .submit-btn { width: 100%; padding: 0.8rem 1rem; background-color: #007bff; border: 1px solid #007bff; color: #fff; border-radius: 6px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: background-color 0.3s ease; }
        .error-message { color: #ef4444; font-size: 0.9rem; margin-top: -1rem; margin-bottom: 1rem; text-align: center; min-height: 1.2rem; }
        .demo-credentials { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #222244; font-size: 0.85rem; color: #a0a0c0; text-align: center; }
        .demo-credentials p { margin: 0.5rem 0; cursor: pointer; transition: color 0.3s; }
        .demo-credentials strong { color: #c0c0e0; }
        .signup-link { margin-top: 1.5rem; font-size: 0.9rem; color: #a0a0c0; }
        .signup-link a { color: #007bff; text-decoration: none; font-weight: 500; }
      `}</style>
      <div className="login-page-body">
        <div className="login-container container">
            <div className="login-card">
                <div className="login-icon-wrapper"><LoginIcon /></div>
                <h1>Welcome back</h1>
                <p>Sign in to your account to continue</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="error-message">{error}</div>
                    <div className="form-group"><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required/></div>
                    <div className="form-group"><label htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required/></div>
                    <button type="submit" className="submit-btn">Sign In</button>
                </form>
                <div className="demo-credentials"><strong>Demo credentials:</strong><p onClick={() => handleDemoClick('tour@example.com', 'password')}>Tour: tour@example.com / password</p><p onClick={() => handleDemoClick('travel@example.com', 'password')}>Travel: travel@example.com / password</p><p onClick={() => handleDemoClick('logistics@example.com', 'password')}>Logistics: logistics@example.com / password</p></div>
                <div className="signup-link">Don't have an account? <Link to="/register">Create one here</Link></div>
            </div>
        </div>
      </div>
    </>
  );
}