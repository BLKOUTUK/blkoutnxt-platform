import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GovernancePage from './pages/GovernancePage';
import EcosystemNavigation from './pages/EcosystemNavigation';
import ModerationDashboard from './components/ModerationDashboard';
import ContentSubmissionForm from './components/ContentSubmissionForm';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ecosystem" element={<EcosystemNavigation />} />
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