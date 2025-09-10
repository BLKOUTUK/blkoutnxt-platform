import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import GovernancePage from './pages/GovernancePage';
import EcosystemNavigation from './pages/EcosystemNavigation';
import ModerationDashboard from './components/ModerationDashboard';
import ContentSubmissionForm from './components/ContentSubmissionForm';
import './index.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🏠 Ecosystem', icon: '🌐' },
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

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-black">
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            BLKOUT Community Platform
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Democratic • Community-Owned • Liberation-Focused
          </p>
          <p className="text-lg text-purple-200 max-w-4xl mx-auto">
            Technology for Black queer liberation through community governance, 
            content sovereignty, and collective empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            to="/governance"
            className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-lg hover:transform hover:-translate-y-2 hover:border-purple-400/40 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🗳️</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Community Governance</h3>
              <p className="text-purple-100">Democratic decision-making and community assembly</p>
            </div>
          </Link>

          <Link
            to="/moderation"
            className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-lg hover:transform hover:-translate-y-2 hover:border-purple-400/40 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Content Moderation</h3>
              <p className="text-purple-100">Community-controlled content review and publishing</p>
            </div>
          </Link>

          <Link
            to="/submit"
            className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-lg hover:transform hover:-translate-y-2 hover:border-purple-400/40 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Submit Content</h3>
              <p className="text-purple-100">Share news, events, and stories with community</p>
            </div>
          </Link>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Full Ecosystem</h3>
              <p className="text-purple-100">Access all linked community platforms</p>
            </div>
          </div>
        </div>

        <EcosystemNavigation />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/moderation" element={<ModerationDashboard />} />
          <Route path="/submit" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-black py-12">
              <div className="container mx-auto px-8">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Submit Content to Community
                </h1>
                <ContentSubmissionForm />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;