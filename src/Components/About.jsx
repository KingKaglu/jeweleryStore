import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="pt-24 bg-[#fdf9f8] text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans text-center animate-fadeIn py-20 px-8"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl mb-6 text-[#b48b6c] font-serif uppercase tracking-wide">
          About Us
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          Welcome to <strong>Radiant Gems</strong> – your destination for timeless elegance and handcrafted luxury. 
          We curate a modern collection of fine jewelry made from the finest materials, designed to celebrate beauty, individuality, and sophistication.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          Whether you're searching for a perfect gift or a statement piece for yourself, our collection offers a wide range of rings, necklaces, earrings, and bracelets to match every style and moment.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          At Radiant Gems, we believe in quality, authenticity, and craftsmanship. Thank you for supporting our small business and choosing to sparkle with us.
        </p>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
