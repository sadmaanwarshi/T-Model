import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaPlaneDeparture, FaShip, FaChartLine, FaUsers, FaShieldAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { IoBarChart } from 'react-icons/io5';

// You can save this as HomePage.jsx
const HomePage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        body {
          background-color: #0a0a1a;
          color: #e0e0e0;
          font-family: 'Poppins', sans-serif;
          margin: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
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

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 6rem 0;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
          line-height: 1.2;
        }

        .hero p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 2rem;
          color: #a0a0c0;
        }

        .hero-buttons button {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          padding: 0.8rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .get-started-btn {
          background-color: #007bff;
          border: 1px solid #007bff;
          color: #fff;
          margin-right: 1rem;
        }
        
        .get-started-btn:hover {
           background-color: #0056b3;
        }

        .sign-in-btn {
          background-color: transparent;
          border: 1px solid #444;
          color: #fff;
        }
        
        .sign-in-btn:hover {
          background-color: #222;
        }
        

        /* Industry Solutions Section */
        .solutions {
          text-align: center;
          padding: 4rem 0;
        }

        .solutions h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .solutions > p {
           color: #a0a0c0;
           margin-bottom: 3rem;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          text-align: left;
        }

        .solution-card {
          background-color: #121224;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #222244;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .solution-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .icon-green { background-color: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .icon-orange { background-color: rgba(249, 115, 22, 0.1); color: #f97316; }
        .icon-blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }

        .solution-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .solution-card > p {
          color: #a0a0c0;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          min-height: 40px;
        }
        
        .solution-card ul {
          list-style-type: none;
          padding: 0;
          color: #a0a0c0;
          font-size: 0.9rem;
        }
        
        .solution-card ul li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.2rem;
        }
        
        .solution-card ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #007bff;
        }

        /* Why Choose Us Section */
        .why-choose {
          padding: 6rem 0;
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .why-choose-content {
          flex: 1;
        }

        .why-choose-content h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #fff;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .feature-icon {
          font-size: 1.5rem;
          color: #007bff;
          margin-top: 5px;
        }
        
        .feature-item h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          color: #fff;
        }
        
        .feature-item p {
          margin: 0;
          color: #a0a0c0;
          font-size: 0.9rem;
        }

        .why-choose-graphic {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #121224;
          border: 1px solid #222244;
          border-radius: 12px;
          min-height: 400px;
        }
          /* In HomePage.jsx, find the .hero-buttons CSS and update it like this */

.hero-buttons a { /* Use 'a' to target the <Link> component */
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  /* ADD THIS LINE to remove the underline */
  text-decoration: none; 
}

.get-started-btn {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  margin-right: 1rem;
}
        
.sign-in-btn {
  background-color: transparent;
  border: 1px solid #444;
  color: #fff;
}

        .graphic-icon {
          font-size: 8rem;
          color: #007bff;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .solutions-grid {
            grid-template-columns: 1fr;
          }
          .why-choose {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
           .hero h1 {
             font-size: 2.5rem;
           }
           .navbar {
             flex-direction: column;
             gap: 1rem;
           }
        }

      `}</style>
      <div className="container">
        {/* Navbar */}
        

        {/* Hero Section */}
        <section className="hero">
          <h1>Industry Management Made Simple</h1>
          <p>
            Comprehensive dashboards for Tour, Travel, and Logistics management. Streamline
            your operations with real-time insights and professional tools.
          </p>
          <div className="hero-buttons">
             <Link to="/login" className="get-started-btn">Get Started</Link>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
          </div>
        </section>

        {/* Industry Solutions Section */}
        <section className="solutions">
          <h2>Industry Solutions</h2>
          <p>Specialized dashboards tailored for your industry needs</p>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="icon-wrapper icon-green">
                <FaMapMarkedAlt />
              </div>
              <h3>Tour Management</h3>
              <p>Manage tours, bookings, and customer experiences with our comprehensive analytics.</p>
              <ul>
                <li>Business health scoring</li>
                <li>Active tour tracking</li>
                <li>Booking insights</li>
                <li>Guide management</li>
              </ul>
            </div>
            <div className="solution-card">
              <div className="icon-wrapper icon-orange">
                <FaPlaneDeparture />
              </div>
              <h3>Travel Operations</h3>
              <p>Streamline reservations and optimize conversion rates with our travel-centric tools.</p>
              <ul>
                <li>Reservation management</li>
                <li>Conversion tracking</li>
                <li>Booking analytics</li>
                <li>Performance metrics</li>
              </ul>
            </div>
            <div className="solution-card">
              <div className="icon-wrapper icon-blue">
                <FaShip />
              </div>
              <h3>Logistics Control</h3>
              <p>Monitor fleet, track shipments, and ensure timely deliveries.</p>
              <ul>
                <li>Fleet management</li>
                <li>Shipment tracking</li>
                <li>Delivery analytics</li>
                <li>Real-time monitoring</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="why-choose">
          <div className="why-choose-content">
            <h2>Why Choose IndustryHub?</h2>
            <div className="feature-item">
              <div className="feature-icon"><FaChartLine /></div>
              <div>
                <h4>Real-time Analytics</h4>
                <p>Get instant insights into your business performance with live dashboards.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaUsers /></div>
              <div>
                <h4>Team Collaboration</h4>
                <p>Seamlessly collaborate with your team through role-based access and shared insights.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaShieldAlt /></div>
              <div>
                <h4>Enterprise Security</h4>
                <p>Your data is protected with industry-standard security measures and encryption.</p>
              </div>
            </div>
          </div>
          <div className="why-choose-graphic">
            <IoBarChart className="graphic-icon" />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;