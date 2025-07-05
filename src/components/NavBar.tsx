// components/NavBar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Book, Github, Leaf, Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      path: '/home',
      label: 'Try It Out',
      icon: Play,
    },
    {
      path: '/docs',
      label: 'Documentation',
      icon: Book,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  // A reusable component for the navigation links to avoid repetition.
  const NavLinks = () => (
    <>
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive(path) 
              ? 'bg-white/20 shadow-lg backdrop-blur-sm' 
              : 'hover:bg-white/10 hover:backdrop-blur-sm'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium">{label}</span>
        </Link>
      ))}
      <a
        href="https://github.com/Froas/react-openapi-sugarfree"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:backdrop-blur-sm"
      >
        <Github className="w-4 h-4" />
        <span className="font-medium">GitHub</span>
      </a>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-3 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-green-100 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold">Sugarless API</span>
              <div className="text-xs text-green-100 opacity-80">Sugar-Free & Healthy</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <NavLinks />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
