import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'Glossary', path: '/glossary' },
  { name: 'Simulator', path: '/simulator' },
];

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  React.useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  return (
    <nav className="bg-white dark:bg-dark shadow-md px-4 py-3 relative">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
          Bet Buddy
        </Link>
        <div className="flex items-center gap-2">
          {/* Hamburger menu for mobile */}
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-primary dark:text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-primary dark:text-white" />
            )}
          </button>
          {/* Dark mode toggle always visible */}
          <button
            className="ml-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-primary dark:text-white" />
            ) : (
              <MoonIcon className="h-6 w-6 text-primary dark:text-white" />
            )}
          </button>
        </div>
      </div>
      {/* Navigation links */}
      <div
        className={`sm:flex flex-col sm:flex-row max-w-2xl mx-auto mt-2 sm:mt-4 bg-white dark:bg-dark rounded-lg shadow transition-all duration-200
          ${menuOpen ? 'block absolute left-4 right-4 top-16 z-20' : 'hidden sm:flex static z-auto'}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`block px-4 py-3 sm:py-2 rounded-md text-base font-medium transition-colors duration-200
              ${location.pathname === link.path
                ? 'bg-primary text-white'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar; 