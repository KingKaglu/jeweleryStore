import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import Link for logo navigation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu, useful after a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Brand Name - Now clickable */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-wider select-none transform hover:scale-105 transition-transform duration-300">
            FitForma
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-600 dark:text-gray-400 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-1 py-2 group transition-all duration-300
              ${isActive
                ? "text-green-700 dark:text-green-300" // Active color
                : "hover:text-green-600 dark:hover:text-green-400" // Hover color
              }`
            }
          >
            მთავარი {/* Home */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-700 dark:bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `relative px-1 py-2 group transition-all duration-300
              ${isActive
                ? "text-green-700 dark:text-green-300"
                : "hover:text-green-600 dark:hover:text-green-400"
              }`
            }
          >
            მაღაზია {/* Shop */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-700 dark:bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative px-1 py-2 group transition-all duration-300
              ${isActive
                ? "text-green-700 dark:text-green-300"
                : "hover:text-green-600 dark:hover:text-green-400"
              }`
            }
          >
            ჩვენ შესახებ {/* About Us */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-700 dark:bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative px-1 py-2 group transition-all duration-300
              ${isActive
                ? "text-green-700 dark:text-green-300"
                : "hover:text-green-600 dark:hover:text-green-400"
              }`
            }
          >
            კონტაქტი {/* Contact */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-700 dark:bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative px-1 py-2 group transition-all duration-300
              ${isActive
                ? "text-green-700 dark:text-green-300"
                : "hover:text-green-600 dark:hover:text-green-400"
              }`
            }
          >
            კალათა {/* Cart */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-700 dark:bg-green-300 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="მენიუს ღილაკი" // Menu button
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay and Links */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-70 z-40 animate-fade-in" onClick={closeMenu}>
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl transform translate-x-0 transition-transform duration-500 ease-out animate-slide-in-right"
            // Prevent clicks inside the menu from closing it
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={closeMenu}
                className="text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="მენიუს დახურვა" // Close menu
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4 text-xl font-medium">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-colors duration-200
                  ${isActive
                    ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 font-bold shadow-sm"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`
                }
              >
                მთავარი {/* Home */}
              </NavLink>
              <NavLink
                to="/shop"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-colors duration-200
                  ${isActive
                    ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 font-bold shadow-sm"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`
                }
              >
                მაღაზია {/* Shop */}
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-colors duration-200
                  ${isActive
                    ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 font-bold shadow-sm"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`
                }
              >
                ჩვენ შესახებ {/* About Us */}
              </NavLink>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-colors duration-200
                  ${isActive
                    ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 font-bold shadow-sm"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`
                }
              >
                კონტაქტი {/* Contact */}
              </NavLink>
              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-colors duration-200
                  ${isActive
                    ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 font-bold shadow-sm"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`
                }
              >
                კალათა {/* Cart */}
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
