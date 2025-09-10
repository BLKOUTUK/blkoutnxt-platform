import React from 'react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'closed';
  endDate?: string;
  proposedDate?: string;
}

const GovernancePage: React.FC = () => {
  const activeProposals: Proposal[] = [
    {
      id: '1',
      title: 'Community Resource Allocation',
      description: 'How should we distribute £50,000 in community grants?',
      status: 'active',
      endDate: 'Sept 15, 2025'
    },
    {
      id: '2',
      title: 'Platform Governance Model',
      description: 'Transition to fully cooperative ownership structure?',
      status: 'pending',
      proposedDate: 'Sept 1, 2025'
    }
  ];

  const recentDecisions: Proposal[] = [
    {
      id: '3',
      title: 'Mutual Aid Fund Launch',
      description: 'Established £25K emergency support fund for community members',
      status: 'closed',
      endDate: 'Aug 2025'
    },
    {
      id: '4',
      title: 'Anti-Displacement Strategy',
      description: 'Community response plan for gentrification and housing crisis',
      status: 'closed',
      endDate: 'July 2025'
    },
    {
      id: '5',
      title: 'Safer Spaces Protocol',
      description: 'Updated community guidelines for inclusive, accountable spaces',
      status: 'closed',
      endDate: 'June 2025'
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
    }
  };

  const getStatusText = (status: string, date?: string) => {
    switch (status) {
      case 'active':
        return `Active Vote - Ends: ${date}`;
      case 'pending':
        return `Discussion Phase - Proposed: ${date}`;
      case 'closed':
        return `Passed - ${date}`;
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-black text-white relative">
      {/* Face Overlay */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 w-80 h-80 z-50 pointer-events-none">
        <img 
          src="/4.png" 
          alt="Community member 4" 
          className="w-full h-full object-contain drop-shadow-2xl opacity-95"
        />
      </div>

      <div className="ml-96 p-12">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          BLKOUT Governance
        </h1>

        {/* Active Decisions Section */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-8 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
            🗳️ Active Community Decisions
          </h2>
          <p className="text-purple-100 mb-6">
            Democratic governance through community consensus. Every voice matters in shaping our collective liberation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProposals.map((proposal) => (
              <div 
                key={proposal.id}
                className="bg-purple-500/8 border border-purple-500/20 rounded-lg p-6 backdrop-blur-lg hover:transform hover:-translate-y-1 transition-all duration-200 hover:border-purple-500/40"
              >
                <h3 className="text-xl font-semibold mb-3">{proposal.title}</h3>
                <p className="text-purple-100 mb-4">{proposal.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyles(proposal.status)}`}>
                  {getStatusText(proposal.status, proposal.endDate || proposal.proposedDate)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance Principles */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-8 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            📋 Governance Principles
          </h2>
          <ul className="space-y-4 text-purple-100">
            <li><strong>Consensus Building:</strong> Decisions through community dialogue and agreement</li>
            <li><strong>Rotating Leadership:</strong> Shared responsibility prevents power concentration</li>
            <li><strong>Transparency:</strong> All decisions and processes publicly documented</li>
            <li><strong>Accessibility:</strong> Multiple ways to participate regardless of capacity</li>
            <li><strong>Liberation Focus:</strong> Every decision advances collective freedom</li>
          </ul>
        </section>

        {/* Recent Decisions */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-8 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            🔄 Recent Decisions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDecisions.map((decision) => (
              <div 
                key={decision.id}
                className="bg-purple-500/8 border border-purple-500/20 rounded-lg p-6 backdrop-blur-lg hover:transform hover:-translate-y-1 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold mb-3">{decision.title}</h3>
                <p className="text-purple-100 mb-4">{decision.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyles(decision.status)}`}>
                  {getStatusText(decision.status, decision.endDate)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 mb-8 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            🤝 Get Involved
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-100">
            <div>
              <p className="mb-2"><strong>Community Assemblies:</strong> First Sunday of every month</p>
              <p className="mb-2"><strong>Working Groups:</strong> Housing, Health, Economic Justice, Arts & Culture</p>
            </div>
            <div>
              <p className="mb-2"><strong>Proposal Submission:</strong> Any community member can propose decisions</p>
              <p className="mb-2"><strong>Consensus Process:</strong> Discussion → Amendment → Final Decision</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-12 opacity-70">
          <p className="mb-2">Part of the BLKOUT Community Liberation Platform</p>
          <p>🏳️‍🌈 Democratic • Transparent • Community-Led • Liberation-Focused 🗳️✊🏿</p>
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;