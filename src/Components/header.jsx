import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ cartItemCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Optional: use system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 bg-white dark:bg-gray-900 shadow-md px-4 md:px-8 py-4 flex justify-between items-center ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400"><a href="/">✨ Radiant Gems</a></div>

      <nav className={`flex-col md:flex-row md:flex gap-6 md:gap-8 items-center absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 transition-all duration-300 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className={`text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors py-2 md:py-0 border-b md:border-0 border-gray-200 md:border-none ${location.pathname === href ? 'font-bold text-pink-600 dark:text-pink-400' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="text-xl text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <Link to="/cart" className="relative" aria-label="View cart">
          <FaShoppingCart className="text-xl text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
              {cartItemCount}
            </span>
          )}
        </Link>

        <button
          className="md:hidden flex flex-col justify-between w-6 h-4 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 bg-gray-800 dark:bg-gray-200 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`h-0.5 bg-gray-800 dark:bg-gray-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 bg-gray-800 dark:bg-gray-200 transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
