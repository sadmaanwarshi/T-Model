import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-dark {
          background-color: #0a0a1a;
          padding: 3rem 2rem;
          margin-top: 4rem;
          border-top: 1px solid #222244;
          color: #a0a0c0;
          font-family: 'Poppins', sans-serif;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .footer-links {
          margin-bottom: 1.5rem;
        }
        .footer-links a {
          color: #a0a0c0;
          text-decoration: none;
          margin: 0 1rem;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: #fff;
        }
        .social-icons {
          margin-bottom: 1.5rem;
        }
        .social-icons a {
          color: #a0a0c0;
          font-size: 1.5rem;
          margin: 0 0.75rem;
          transition: color 0.3s ease;
        }
        .social-icons a:hover {
          color: #007bff;
        }
        .footer-copyright {
          font-size: 0.9rem;
          color: #6c757d;
        }
      `}</style>
      <footer className="footer-dark">
        <div className="footer-container">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/">Services</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} IndustryHub. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;