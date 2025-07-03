import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Book, Github, Leaf } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  
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
          
          <div className="flex space-x-6">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;