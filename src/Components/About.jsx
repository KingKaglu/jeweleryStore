import React from 'react';
import './About.css'; // optional styling

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
          Welcome to <strong>Radiant Gems</strong> – your destination for timeless elegance and handcrafted luxury. 
          We curate a modern collection of fine jewelry made from the finest materials, designed to celebrate beauty, individuality, and sophistication.
        </p>
        <p className="about-text">
          Whether you're searching for a perfect gift or a statement piece for yourself, our collection offers a wide range of rings, necklaces, earrings, and bracelets to match every style and moment.
        </p>
        <p className="about-text">
          At Radiant Gems, we believe in quality, authenticity, and craftsmanship. Thank you for supporting our small business and choosing to sparkle with us.
        </p>
      </div>
    </section>
  );
};

export default About;
