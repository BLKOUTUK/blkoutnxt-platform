import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/ecosystem', label: '🌐 Ecosystem', icon: '🌐' },
    { path: '/governance', label: '🗳️ Governance', icon: '⚖️' },
    { path: '/moderation', label: '🛡️ Moderation', icon: '👥' },
    { path: '/submit', label: '📝 Submit', icon: '✍️' },
  ];

  return (
    <nav className="bg-purple-900/50 border-b border-purple-500/30 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            BLKOUTNXT Platform
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-200 hover:bg-purple-800/50 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label.split(' ')[1]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;