import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.role) {
        setError('Please select an Industry Role.');
        return;
    }

    try {
        const res = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok && data.message) {
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after a short delay
            }, 2000);
        } else {
            setError(data.error || 'Registration failed. Please try again.');
        }
    } catch (err) {
        console.error("Registration error:", err);
        setError('Server not reachable. Please try again later.');
    }
  };
  
  // Inline SVG icon for the user/account
  const AccountIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .register-page-body {
          background-color: #0a0a1a;
          color: #e0e0e0;
          font-family: 'Poppins', sans-serif;
          margin: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
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
        }
        
        .logo::before {
          content: '📊';
          margin-right: 0.5rem;
          font-size: 1.5rem;
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

        /* Register Container */
        .register-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
        }
        
        .register-card {
            background-color: #121224;
            padding: 2.5rem;
            border-radius: 12px;
            border: 1px solid #222244;
            width: 100%;
            max-width: 450px;
            text-align: center;
        }
        
        .register-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
            background-color: rgba(59, 130, 246, 0.1); 
            color: #3b82f6;
        }

        .register-card h1 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
            color: #fff;
        }
        
        .register-card > p {
            color: #a0a0c0;
            margin-bottom: 2rem;
        }

        .register-form {
            text-align: left;
        }
        
        .form-group {
            margin-bottom: 1.25rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #a0a0c0;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 0.8rem 1rem;
            background-color: #0a0a1a;
            border: 1px solid #333355;
            border-radius: 6px;
            color: #e0e0e0;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        .form-group select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
        }
        
        .form-group select:invalid {
            color: #a0a0c0;
        }


        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #007bff;
        }
        
        .submit-btn {
            width: 100%;
            padding: 0.8rem 1rem;
            background-color: #007bff;
            border: 1px solid #007bff;
            color: #fff;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 1rem;
        }

        .submit-btn:hover {
            background-color: #0056b3;
        }
        
        .message {
            font-size: 0.9rem;
            margin-top: -1rem;
            margin-bottom: 1rem;
            text-align: center;
            min-height: 1.2rem;
        }
        .error-message { color: #ef4444; }
        .success-message { color: #22c55e; }
        
        .signin-link {
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: #a0a0c0;
        }
        
        .signin-link a {
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
        }
        .signin-link a:hover {
            text-decoration: underline;
        }
      `}</style>
      <div className="register-page-body">
        <div className="container">
          
        </div>
        
        <div className="register-container container">
            <div className="register-card">
                <div className="register-icon-wrapper">
                    <AccountIcon />
                </div>
                <h1>Create Account</h1>
                <p>Join IndustryHub and streamline your operations</p>
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="message error-message">{error}</div>
                    <div className="message success-message">{success}</div>

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="role">Industry Role</label>
                        <select
                            id="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Managert">Manager</option>
                            <option value="Operational Manager">Operational Manager</option>
                            <option value="Associate Manager">Associate Manager</option>
                            <option value="Team Leader">Team Leader</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn" disabled={!!success}>
                        {success ? 'Redirecting...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="signin-link">
                    Already have an account? <a href="/login">Sign in here</a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
