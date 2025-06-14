import { useState, useRef, useEffect } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Focus visible polyfill for better accessibility
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    }
    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing');
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-dark shadow-md px-4 py-3 relative" aria-label="Main navigation">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-accent text-white px-3 py-1 rounded z-50">Skip to content</a>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" tabIndex={0} aria-label="Bet Buddy Home">
          Bet Buddy
        </Link>
        <div className="flex items-center gap-2">
          {/* Hamburger menu for mobile */}
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            tabIndex={0}
            title={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-primary dark:text-white" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-primary dark:text-white" aria-hidden="true" />
            )}
          </button>
          {/* Dark mode toggle always visible */}
          <button
            className="ml-2 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
            tabIndex={0}
            title="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-primary dark:text-white" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6 text-primary dark:text-white" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Navigation links */}
      <div
        ref={menuRef}
        id="main-menu"
        className={`sm:flex flex-col sm:flex-row max-w-2xl mx-auto mt-2 sm:mt-4 bg-white dark:bg-dark rounded-lg shadow transition-all duration-200
          ${menuOpen ? 'block absolute left-4 right-4 top-16 z-20' : 'hidden sm:flex static z-auto'}`}
        role="menu"
        aria-label="Main menu"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`block px-4 py-3 sm:py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${location.pathname === link.path
                ? 'bg-primary text-white'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            tabIndex={0}
            role="menuitem"
            aria-current={location.pathname === link.path ? 'page' : undefined}
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
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default NavBar; 