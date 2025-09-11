import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-black text-white">
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

          <Link
            to="/ecosystem"
            className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-lg hover:transform hover:-translate-y-2 hover:border-purple-400/40 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Full Ecosystem</h3>
              <p className="text-purple-100">Access all linked community platforms</p>
            </div>
          </Link>
        </div>

        {/* Platform Features Overview */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-12 backdrop-blur-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            🏗️ Community-Owned Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-purple-100">
            <div className="text-center">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="font-semibold mb-3 text-purple-200">Democratic Governance</h3>
              <p>Community proposals, voting, and consensus-building for platform decisions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-semibold mb-3 text-purple-200">Community Moderation</h3>
              <p>Transparent content review with community guidelines and democratic oversight</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="font-semibold mb-3 text-purple-200">Federated Architecture</h3>
              <p>Connected ecosystem of specialized platforms maintaining community sovereignty</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to Participate?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/submit"
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              📝 Submit Content
            </Link>
            <Link
              to="/governance"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              🗳️ Join Governance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;