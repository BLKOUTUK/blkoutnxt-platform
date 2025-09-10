import React from 'react';

interface ServiceCard {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'live' | 'development' | 'planned';
  icon: string;
  features: string[];
}

const EcosystemNavigation: React.FC = () => {
  const services: ServiceCard[] = [
    {
      id: 'events',
      name: 'Black QTIPOC Events Calendar',
      description: 'Community-curated events calendar with automated discovery and moderation',
      url: 'https://black-qtipoc-events-calendar.netlify.app',
      status: 'live',
      icon: '📅',
      features: ['Event Discovery', 'Community Curation', 'Automated Scraping', 'Moderation Pipeline']
    },
    {
      id: 'ivor',
      name: 'IVOR AI Assistant',
      description: 'Community-sovereign AI assistant for organizing, research, and liberation technology',
      url: 'https://ivor-community-ai.onrender.com',
      status: 'live',
      icon: '🤖',
      features: ['Community Organizing', 'Research Assistant', 'Liberation Focus', 'Multi-Platform']
    },
    {
      id: 'scrollytelling',
      name: 'Community Scrollytelling',
      description: 'Interactive storytelling platform for community narratives and education',
      url: 'https://blkout-scrollytelling.vercel.app',
      status: 'live',
      icon: '📖',
      features: ['Interactive Stories', 'Community Education', 'Multimedia Content', 'Narrative Control']
    },
    {
      id: 'newsroom',
      name: 'BLKOUT Newsroom',
      description: 'Community-driven news aggregation and publishing platform',
      url: '/newsroom',
      status: 'development',
      icon: '📰',
      features: ['News Aggregation', 'Community Editorial', 'Publisher Network', 'Liberation Journalism']
    },
    {
      id: 'governance',
      name: 'Community Governance',
      description: 'Democratic decision-making platform with consensus-building tools',
      url: '/governance',
      status: 'live',
      icon: '🗳️',
      features: ['Democratic Voting', 'Consensus Building', 'Proposal System', 'Community Assembly']
    },
    {
      id: 'moderation',
      name: 'Content Moderation',
      description: 'Community-controlled content moderation and publication pipeline',
      url: '/moderation',
      status: 'live',
      icon: '🛡️',
      features: ['Democratic Moderation', 'Publication Pipeline', 'Community Guidelines', 'Transparency']
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'planned':
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const handleServiceNavigation = (service: ServiceCard) => {
    if (service.url.startsWith('http')) {
      // External service - open in new tab
      window.open(service.url, '_blank', 'noopener,noreferrer');
    } else {
      // Internal route - navigate within app
      window.location.href = service.url;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-black text-white">
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            BLKOUT Liberation Ecosystem
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Interconnected community-owned platforms for Black queer liberation, 
            democratic governance, and collective empowerment.
          </p>
        </div>

        {/* Service Architecture Overview */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-12 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            🏗️ Distributed Architecture
          </h2>
          <div className="text-center text-purple-100 mb-8">
            <p className="mb-4">
              Each service maintains its own architecture while sharing community values and data sovereignty principles.
            </p>
            <p>
              <strong>Integration Approach:</strong> API-first federation • Shared authentication • Cross-platform navigation • Unified community experience
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-lg hover:transform hover:-translate-y-2 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group"
              onClick={() => handleServiceNavigation(service)}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyles(service.status)} mb-4`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>
              </div>

              <p className="text-purple-100 mb-6 text-center">
                {service.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-purple-300 mb-3">Key Features:</h4>
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-purple-100">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-purple-300 group-hover:text-purple-100 transition-colors">
                  {service.url.startsWith('http') ? (
                    <>
                      <span>Visit Platform</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Access Service</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Principles */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mt-12 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6">
            🔗 Integration Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-purple-100">
            <div>
              <h3 className="font-semibold mb-3 text-purple-200">Technical Integration</h3>
              <ul className="space-y-2">
                <li>• <strong>API Federation:</strong> Services communicate via standardized APIs</li>
                <li>• <strong>Shared Authentication:</strong> Single sign-on across ecosystem</li>
                <li>• <strong>Data Sovereignty:</strong> Community control over all data</li>
                <li>• <strong>Cross-Platform Navigation:</strong> Seamless user experience</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-purple-200">Community Integration</h3>
              <ul className="space-y-2">
                <li>• <strong>Unified Values:</strong> Liberation principles across all platforms</li>
                <li>• <strong>Democratic Governance:</strong> Community oversight of all services</li>
                <li>• <strong>Shared Resources:</strong> Content flows between platforms</li>
                <li>• <strong>Collective Ownership:</strong> Community benefits from ecosystem growth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-16 opacity-70">
          <p className="mb-2">BLKOUT Community Liberation Platform Ecosystem</p>
          <p>🏳️‍🌈 Federated • Democratic • Community-Owned • Liberation-Focused ✊🏿</p>
        </div>
      </div>
    </div>
  );
};

export default EcosystemNavigation;