import React from 'react';
import { FaInstagram, FaFacebookF, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f9faf9] dark:bg-[#101510] border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 py-12 px-6 sm:px-8 lg:px-12 text-center font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        {/* ───── ბრენდი ───── */}
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center justify-center gap-2">
            <span className="text-green-600 dark:text-green-400 text-4xl select-none">⚽</span>
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              FitForma
            </span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2025 ფიტფორმა. ყველა უფლება დაცულია.
          </p>
        </div>

        {/* ───── კონტაქტი ───── */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm sm:text-base items-center justify-center">
          <a
            href="mailto:support@fitforma.com"
            className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/60 rounded"
          >
            <FaEnvelope className="text-green-600 dark:text-green-400 text-lg" />
            support@fitforma.com
          </a>
          <a
            href="tel:+995599213180"
            className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/60 rounded"
          >
            <FaPhoneAlt className="text-green-600 dark:text-green-400 text-lg" />
            +995 599 21 31 80
          </a>
        </div>

        {/* ───── სოციალური ქსელები (Instagram & Facebook) ───── */}
        <div className="flex gap-6 mt-4">
          {[
            { href: 'https://instagram.com/fitforma', label: 'Instagram', icon: <FaInstagram /> },
            { href: 'https://facebook.com/fitforma', label: 'Facebook', icon: <FaFacebookF /> },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full
                         bg-green-600/10 dark:bg-green-400/10
                         text-green-600 dark:text-green-400
                         hover:bg-green-600 dark:hover:bg-green-400
                         hover:text-white transition-all duration-300
                         focus:outline-none focus:ring-4 focus:ring-green-500/40"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
