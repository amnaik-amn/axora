import React, { useState } from 'react';
import { Menu, Trophy, Clock, Users, Star, MapPin, Globe, Building, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Challenges = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('local');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const handleStartChallenge = (challenge) => {
    alert(`Starting ${challenge.title}!\n\nYou'll now have access to:\n• Challenge briefing and requirements\n• Design tools and resources\n• Collaboration workspace\n• Submission portal\n• Progress tracking`);
    setShowChallengeModal(false);
  };

  const handleJoinChallenge = (challenge) => {
    alert(`Joined ${challenge.title}!\n\nYou can now:\n• View full challenge details\n• Access team collaboration tools\n• Submit your designs\n• Track progress and deadlines`);
    setShowChallengeModal(false);
  };

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
          <div className="flex items-center gap-3">
            <Link 
              to="/app/notifications" 
              className="hidden md:flex w-10 h-10 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Bell size={20} className="text-white" />
            </Link>
            <Link to="/app/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
              <span className="text-[#AC5757] font-semibold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </Link>
          </div>
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
                    ? 'bg-gray-50 text-gray-900'
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
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                  onClick={() => handleChallengeClick(challenge)}
                >
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
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      COMPLETE
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
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                  onClick={() => handleChallengeClick(challenge)}
                >
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
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      COMPLETE
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
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                    onClick={() => handleChallengeClick(challenge)}
                  >
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
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
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

      {/* Challenge Detail Modal */}
      {showChallengeModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedChallenge.title}</h2>
                  <p className="text-gray-600">{selectedChallenge.subtitle}</p>
                </div>
                <button 
                  onClick={() => setShowChallengeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy size={20} className="text-[#AC5757]" />
                    <span className="font-semibold">Challenge Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedChallenge.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{selectedChallenge.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedChallenge.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium">{selectedChallenge.deadline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-[#AC5757]" />
                    <span className="font-semibold">Community</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">{selectedChallenge.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Progress:</span>
                      <span className="font-medium">{selectedChallenge.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reward:</span>
                      <span className="font-medium">{selectedChallenge.reward} XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium capitalize ${selectedChallenge.status === 'active' ? 'text-blue-600' : 'text-green-600'}`}>
                        {selectedChallenge.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Challenge Brief</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-4">
                    {selectedChallenge.subtitle} This challenge will test your skills in {selectedChallenge.category.toLowerCase()} and provide hands-on experience with real-world scenarios.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">What you'll do:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Research and analyze the problem context</li>
                      <li>Develop innovative design solutions</li>
                      <li>Create detailed presentations and prototypes</li>
                      <li>Collaborate with team members</li>
                      <li>Present your final solution to judges</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                {selectedChallenge.status === 'active' && selectedChallenge.progress > 0 ? (
                  <button 
                    onClick={() => handleStartChallenge(selectedChallenge)}
                    className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                  >
                    Continue Challenge
                  </button>
                ) : selectedChallenge.status === 'completed' ? (
                  <button 
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Challenge Completed
                  </button>
                ) : (
                  <button 
                    onClick={() => handleJoinChallenge(selectedChallenge)}
                    className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                  >
                    Join Challenge
                  </button>
                )}
                <button 
                  onClick={() => setShowChallengeModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Challenges;