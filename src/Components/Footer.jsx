import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f9f5f2] dark:bg-[#1a1a1a] border-t border-[#e2e2e2] dark:border-[#333] text-[#333] dark:text-[#e4e4e4] py-12 px-6 sm:px-8 lg:px-12 text-center font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-10">
        {/* Brand */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-[1.8rem] text-[#b48b6c] dark:text-[#e0b393] font-serif mb-3 sm:mb-4">
            Radiant Gems
          </h3>
          <p className="text-sm sm:text-base">&copy; 2025 Radiant Gems. All rights reserved.</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base">
          <a
            href="mailto:gzirishviligiorgiwork@gmail.com"
            className="flex items-center gap-2 hover:text-[#b48b6c] dark:hover:text-[#e0b393] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b48b6c]/60 rounded"
            aria-label="Email Giorgi Gzirishvili"
          >
            <FaEnvelope className="text-[#b48b6c] dark:text-[#e0b393] text-lg sm:text-xl" /> 
            gzirishviligiorgiwork@gmail.com
          </a>
          <a
            href="tel:+995599213180"
            className="flex items-center gap-2 hover:text-[#b48b6c] dark:hover:text-[#e0b393] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b48b6c]/60 rounded"
            aria-label="Call Giorgi Gzirishvili"
          >
            <FaPhoneAlt className="text-[#b48b6c] dark:text-[#e0b393] text-lg sm:text-xl" /> 
            +995 599 21 31 80
          </a>
        </div>

        {/* Socials */}
        <div className="flex justify-center items-center gap-5 sm:gap-6 mt-6">
          {[
            { href: "https://www.instagram.com/giorgigzirshvili/", label: "Instagram", icon: <FaInstagram /> },
            { href: "https://www.facebook.com/giorgi.gzirishvili.168992/", label: "Facebook", icon: <FaFacebookF /> },
            { href: "https://linkedin.com/in/giorgigzirishvili", label: "LinkedIn", icon: <FaLinkedin /> },
            { href: "https://github.com/kingkaglu", label: "GitHub", icon: <FaGithub /> },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#b48b6c]/10 dark:bg-[#e0b393]/10 hover:bg-[#b48b6c] dark:hover:bg-[#e0b393] text-[#b48b6c] dark:text-[#e0b393] hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#b48b6c]/40"
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
