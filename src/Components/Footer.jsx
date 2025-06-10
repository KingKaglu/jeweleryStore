// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Radiant Gems</h3>
          <p>&copy; 2025 Radiant Gems. All rights reserved.</p>
        </div>
        <div className="footer-contact">
          <p>
            <a href="mailto:gzirishviligiorgiwork@gmail.com" className="footer-link">
              <FaEnvelope /> gzirishviligiorgiwork@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+995599213180" className="footer-link">
              <FaPhoneAlt /> +995 599 21 31 80
            </a>
          </p>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
