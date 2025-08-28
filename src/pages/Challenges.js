import React, { useState } from 'react';
import { Menu, Trophy, Clock, Users, Star, MapPin, Globe, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Challenges = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('local');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'local', label: 'LOCAL' },
    { id: 'international', label: 'INTERNATIONAL' },
    { id: 'university', label: 'UNIVERSITY' },
  ];

  const challenges = {
    local: [
      {
        title: 'Green Tech Park Design',
        subtitle: 'Design a sustainable technology park for the local community',
        category: 'Urban Sustainability',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 24,
        reward: 500,
        status: 'active',
        progress: 45,
        deadline: '5 days left',
        featured: true
      },
      {
        title: 'Smart City Infrastructure',
        subtitle: 'Develop intelligent infrastructure solutions',
        category: 'Technology',
        difficulty: 'Advanced',
        duration: '3 weeks',
        participants: 18,
        reward: 750,
        status: 'active',
        progress: 0,
        deadline: '2 weeks left',
        featured: false
      },
      {
        title: 'Community Center Renovation',
        subtitle: 'Redesign local community spaces',
        category: 'Architecture',
        difficulty: 'Beginner',
        duration: '1 week',
        participants: 35,
        reward: 250,
        status: 'completed',
        progress: 100,
        deadline: 'Completed',
        featured: false
      }
    ],
    international: [
      {
        title: 'Global Climate Solutions',
        subtitle: 'Address climate change through innovative design',
        category: 'Environmental',
        difficulty: 'Advanced',
        duration: '4 weeks',
        participants: 156,
        reward: 1000,
        status: 'active',
        progress: 20,
        deadline: '3 weeks left',
        featured: true
      },
      {
        title: 'Cross-Cultural Housing',
        subtitle: 'Design housing that respects cultural diversity',
        category: 'Architecture',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 89,
        reward: 600,
        status: 'active',
        progress: 60,
        deadline: '1 week left',
        featured: false
      }
    ],
    university: [
      {
        title: 'Campus Sustainability Initiative',
        subtitle: 'Make your campus more environmentally friendly',
        category: 'Sustainability',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 42,
        reward: 400,
        status: 'active',
        progress: 75,
        deadline: '3 days left',
        featured: true
      },
      {
        title: 'Student Housing Innovation',
        subtitle: 'Redesign student living spaces',
        category: 'Architecture',
        difficulty: 'Beginner',
        duration: '1 week',
        participants: 28,
        reward: 300,
        status: 'active',
        progress: 30,
        deadline: '4 days left',
        featured: false
      }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-amber-100 text-amber-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[38px]">AXORA</h1>
          <Link to="/app/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
            <span className="text-[#AC5757] font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center bg-[#AC5757]">
          <div className="flex w-full max-w-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900'
                    : 'bg-[#AC5757] text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Challenge Sections */}
        <div className="space-y-8">
          {/* SELECTED Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SELECTED</h2>
            <div className="space-y-4">
              {challenges[activeTab].filter(c => c.featured).map((challenge, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#4CAF50] rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{challenge.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#4CAF50] text-white">
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                      {challenge.status === 'active' ? 'COMPLETE' : 'COMPLETE'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block">COMPLETE</span>
                      <span className="font-medium text-gray-900">{challenge.duration.replace(' weeks', ' 20 m').replace(' week', ' 10 m')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">LEFT</span>
                      <span className="font-medium text-gray-900">2h 40 m</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Difficulty</span>
                      <span className="font-medium text-gray-900">{challenge.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Progress</span>
                      <span className="font-medium text-gray-900">45 %</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI-SUGGESTED Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">AI-SUGGESTED</h2>
            <div className="space-y-4">
              {challenges[activeTab].filter(c => !c.featured).slice(0, 2).map((challenge, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#2196F3] rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{challenge.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#2196F3] text-white">
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                      {challenge.status === 'active' ? 'COMPLETE' : 'COMPLETE'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block">DEADLINE</span>
                      <span className="font-medium text-gray-900">3 days left</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">LEFT</span>
                      <span className="font-medium text-gray-900">4 h 15 m</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Difficulty</span>
                      <span className="font-medium text-gray-900">{challenge.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Reward</span>
                      <span className="font-medium text-gray-900">+75 XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Section */}
          {challenges[activeTab].filter(c => !c.featured).slice(2).length > 0 && (
            <section>
              <div className="space-y-4">
                {challenges[activeTab].filter(c => !c.featured).slice(2).map((challenge, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF9800] rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">★</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{challenge.title}</h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FF9800] text-white">
                            {challenge.category}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                        COMPLETE
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 block">Recommended for You</span>
                        <span className="font-medium text-gray-900">2h 00 m</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">LEFT</span>
                        <span className="font-medium text-gray-900">+20 XP</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Difficulty</span>
                        <span className="font-medium text-gray-900">{challenge.difficulty}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Reward</span>
                        <span className="font-medium text-gray-900">+20 XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Challenges;