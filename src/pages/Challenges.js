import React, { useState } from 'react';
import { ArrowLeft, Trophy, Clock, Users, Star, MapPin, Globe, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';

const Challenges = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('local');

  const tabs = [
    { id: 'local', label: 'Local', icon: MapPin },
    { id: 'international', label: 'International', icon: Globe },
    { id: 'university', label: 'University', icon: Building },
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
      <header className="bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-brand-500">AXORA</h1>
          <Link to="/app/profile" className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors">
            <span className="text-brand-600 font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Featured Challenge */}
        {challenges[activeTab].find(c => c.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Challenge</h2>
            {(() => {
              const featured = challenges[activeTab].find(c => c.featured);
              return (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-brand-50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-brand-200 rounded-2xl"></div>
                    </div>
                    <div className="absolute top-6 left-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(featured.difficulty)}`}>
                        {featured.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(featured.status)}`}>
                        {featured.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{featured.title}</h3>
                        <p className="text-gray-600 text-lg">{featured.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{featured.reward}</div>
                        <div className="text-sm text-gray-600">XP Reward</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{featured.participants}</div>
                        <div className="text-sm text-gray-600">Participants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{featured.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{featured.deadline}</div>
                        <div className="text-sm text-gray-600">Deadline</div>
                      </div>
                    </div>

                    {featured.status === 'active' && featured.progress > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Your Progress</span>
                          <span className="font-medium text-gray-900">{featured.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-brand-500 h-3 rounded-full transition-all"
                            style={{ width: `${featured.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <button className="bg-brand-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors">
                        {featured.status === 'active' ? (featured.progress > 0 ? 'Continue' : 'Join Challenge') : 'View Results'}
                      </button>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        {featured.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* All Challenges */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {challenges[activeTab].filter(c => !c.featured).map((challenge, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-brand-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-brand-200 rounded-lg"></div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(challenge.status)}`}>
                      {challenge.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{challenge.title}</h3>
                  <p className="text-gray-600 text-xs mb-3">{challenge.subtitle}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Clock size={10} />
                      <span className="text-[10px]">{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Users size={10} />
                      <span className="text-[10px]">{challenge.participants}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Trophy size={10} />
                      <span className="text-[10px]">{challenge.reward}</span>
                    </div>
                  </div>

                  {challenge.status === 'active' && challenge.progress > 0 && (
                    <div className="mb-2">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-brand-500 h-1 rounded-full transition-all"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                      {challenge.category}
                    </span>
                    <span className="text-[10px] font-medium text-gray-900">{challenge.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;