import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Play, Book, Github } from 'lucide-react';

// Remove the old NavBarProps interface since we don't need it with router
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
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Code className="w-8 h-8" />
            <span className="text-xl font-bold">Sugarless API</span>
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive(path) ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
            
            <a
              href="https://github.com/Froas/react-openapi-sugarfree"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;