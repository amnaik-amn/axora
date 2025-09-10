import React, { useState } from 'react';
import { Trophy, Users } from 'lucide-react';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';

const Challenges = () => {
  // const user = checkAuth(); // Unused variable
  const [activeTab, setActiveTab] = useState('local');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log('Search Local, International, University Challenges:', searchTerm);
    // In real app, this would filter challenges
  };

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
    { id: 'university', label: 'UNIVERSITY' },
    { id: 'international', label: 'INTERNATIONAL' },
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
      },
      {
        title: 'Structural Engineering Analysis',
        subtitle: 'Analyze and design load-bearing structures for high-rise buildings',
        category: 'Engineering',
        difficulty: 'Advanced',
        duration: '3 weeks',
        participants: 28,
        reward: 750,
        status: 'active',
        progress: 15,
        deadline: '2 weeks left',
        featured: false
      },
      {
        title: 'Sustainable Architecture Design',
        subtitle: 'Create eco-friendly residential buildings with green technology',
        category: 'Architecture',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 35,
        reward: 500,
        status: 'active',
        progress: 40,
        deadline: '1 week left',
        featured: false
      },
      {
        title: 'Civil Engineering Project',
        subtitle: 'Design and plan major infrastructure development',
        category: 'Engineering',
        difficulty: 'Advanced',
        duration: '4 weeks',
        participants: 22,
        reward: 850,
        status: 'upcoming',
        progress: 0,
        deadline: '3 days left',
        featured: false
      },
      {
        title: 'Interior Design Innovation',
        subtitle: 'Redesign commercial spaces with modern aesthetic principles',
        category: 'Interior Design',
        difficulty: 'Beginner',
        duration: '1 week',
        participants: 42,
        reward: 300,
        status: 'completed',
        progress: 100,
        deadline: 'Completed',
        featured: false
      },
      {
        title: 'Mechanical Systems Design',
        subtitle: 'Design HVAC and mechanical systems for large buildings',
        category: 'Engineering',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        participants: 26,
        reward: 600,
        status: 'active',
        progress: 25,
        deadline: '2 weeks left',
        featured: false
      }
    ],
    international: [
      {
        title: 'Global Climate Solutions',
        subtitle: 'Address climate change through innovative design',
        category: 'Environmental',
        location: 'Copenhagen, Denmark',
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
        location: 'Singapore, Singapore',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 89,
        reward: 600,
        status: 'active',
        progress: 60,
        deadline: '1 week left',
        featured: false
      },
      {
        title: 'International Bridge Design',
        subtitle: 'Design innovative bridge structures connecting countries',
        category: 'Engineering',
        location: 'Istanbul, Turkey',
        difficulty: 'Advanced',
        duration: '5 weeks',
        participants: 89,
        reward: 1100,
        status: 'active',
        progress: 30,
        deadline: '4 weeks left',
        featured: false
      },
      {
        title: 'Cultural Heritage Architecture',
        subtitle: 'Preserve and modernize historic architectural landmarks',
        category: 'Architecture',
        location: 'Rome, Italy',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        participants: 67,
        reward: 650,
        status: 'active',
        progress: 50,
        deadline: '2 weeks left',
        featured: false
      },
      {
        title: 'Environmental Engineering Solutions',
        subtitle: 'Develop sustainable waste management and water treatment systems',
        category: 'Engineering',
        location: 'Amsterdam, Netherlands',
        difficulty: 'Advanced',
        duration: '4 weeks',
        participants: 78,
        reward: 800,
        status: 'upcoming',
        progress: 0,
        deadline: '1 week left',
        featured: false
      },
      {
        title: 'Urban Planning Innovation',
        subtitle: 'Design smart city layouts for megacities worldwide',
        category: 'Urban Planning',
        location: 'Tokyo, Japan',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        participants: 95,
        reward: 700,
        status: 'active',
        progress: 20,
        deadline: '2 weeks left',
        featured: false
      }
    ],
    university: [
      {
        title: 'Campus Sustainability Initiative',
        subtitle: 'Make your campus more environmentally friendly',
        category: 'Sustainability',
        university: 'King Saud University, Saudi Arabia',
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
        university: 'University of Bahrain, Bahrain',
        difficulty: 'Beginner',
        duration: '1 week',
        participants: 28,
        reward: 300,
        status: 'active',
        progress: 30,
        deadline: '4 days left',
        featured: false
      },
      {
        title: 'Engineering Lab Renovation',
        subtitle: 'Modernize mechanical and civil engineering laboratories',
        category: 'Engineering',
        university: 'American University of Sharjah, UAE',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        participants: 32,
        reward: 550,
        status: 'active',
        progress: 35,
        deadline: '1 week left',
        featured: false
      },
      {
        title: 'Architecture Studio Design',
        subtitle: 'Create collaborative workspaces for architecture students',
        category: 'Architecture',
        university: 'King Fahd University of Petroleum & Minerals, Saudi Arabia',
        difficulty: 'Advanced',
        duration: '3 weeks',
        participants: 28,
        reward: 700,
        status: 'upcoming',
        progress: 0,
        deadline: '2 days left',
        featured: false
      },
      {
        title: 'Structural Testing Facility',
        subtitle: 'Design advanced materials testing laboratory',
        category: 'Engineering',
        university: 'United Arab Emirates University, UAE',
        difficulty: 'Advanced',
        duration: '4 weeks',
        participants: 24,
        reward: 800,
        status: 'active',
        progress: 20,
        deadline: '3 weeks left',
        featured: false
      },
      {
        title: 'Campus Green Building',
        subtitle: 'Design LEED-certified sustainable campus building',
        category: 'Architecture',
        university: 'Bahrain Polytechnic, Bahrain',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        participants: 36,
        reward: 600,
        status: 'completed',
        progress: 100,
        deadline: 'Completed',
        featured: false
      },
      {
        title: 'Digital Fabrication Lab',
        subtitle: 'Create advanced manufacturing and 3D printing facility',
        category: 'Engineering',
        university: 'Zayed University, UAE',
        difficulty: 'Beginner',
        duration: '2 weeks',
        participants: 44,
        reward: 400,
        status: 'active',
        progress: 60,
        deadline: '1 week left',
        featured: false
      }
    ]
  };

  // const getDifficultyColor = (difficulty) => {
  //   switch (difficulty) {
  //     case 'Beginner': return 'bg-green-100 text-green-700';
  //     case 'Intermediate': return 'bg-amber-100 text-amber-700';
  //     case 'Advanced': return 'bg-red-100 text-red-700';
  //     default: return 'bg-gray-100 text-gray-700';
  //   }
  // };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'active': return 'bg-blue-100 text-blue-700';
  //     case 'completed': return 'bg-green-100 text-green-700';
  //     default: return 'bg-gray-100 text-gray-700';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="CHALLENGES"
        onMenuClick={() => setIsMenuOpen(true)}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search local, international, university..." 
            onSearch={handleSearch}
          />
        }
      />
      
      {/* Tab Navigation */}
      <div className="bg-[#AC5757]">
        <div className="flex justify-center">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Challenge Sections */}
        <div className="space-y-8">
          {/* SELECTED Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SELECTED</h2>
            <div className="space-y-4">
              {challenges[activeTab].filter(c => c.featured).map((challenge, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{challenge.title}</h3>
                      {challenge.title === 'Green Tech Park Design' && (
                        <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AI</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{challenge.category}</p>
                    {challenge.university && (
                      <p className="text-xs text-blue-600 mt-1 font-medium">{challenge.university}</p>
                    )}
                    {challenge.location && (
                      <p className="text-xs text-green-600 mt-1 font-medium">{challenge.location}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">Deadline: {challenge.deadline}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">PROGRESS</p>
                      <p className="text-xl font-bold text-gray-900">45%</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <p className="text-xs text-gray-500 uppercase mb-1">DIFFICULTY</p>
                      <p className="text-xl font-bold text-blue-600">
                        {challenge.difficulty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI-SUGGESTED Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-SUGGESTED</h2>
            <div className="space-y-4">
              {challenges[activeTab].filter(c => !c.featured).slice(0, 2).map((challenge, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{challenge.title}</h3>
                       {(challenge.title === 'Smart City Infrastructure' || challenge.title === 'Community Center Renovation' || challenge.title === 'Global Climate Solutions' || challenge.title === 'Campus Sustainability Initiative' || challenge.title === 'Structural Engineering Analysis' || challenge.title === 'Sustainable Architecture Design' || challenge.title === 'International Bridge Design' || challenge.title === 'Environmental Engineering Solutions') && (
                        <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AI</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{challenge.category}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">Deadline: {challenge.deadline}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        challenge.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        challenge.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {challenge.status === 'active' ? 'AVAILABLE' : 
                         challenge.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">REWARD</p>
                      <p className="text-xl font-bold text-gray-900">+{challenge.reward} XP</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <p className="text-xs text-gray-500 uppercase mb-1">DIFFICULTY</p>
                      <p className={`text-xl font-bold ${
                        challenge.difficulty === 'Beginner' ? 'text-orange-600' :
                        challenge.difficulty === 'Intermediate' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </p>
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
                    className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleChallengeClick(challenge)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{challenge.title}</h3>
                        {(challenge.title === 'Smart City Infrastructure' || challenge.title === 'Community Center Renovation' || challenge.title === 'Global Climate Solutions' || challenge.title === 'Campus Sustainability Initiative' || challenge.title === 'Structural Engineering Analysis' || challenge.title === 'Sustainable Architecture Design' || challenge.title === 'International Bridge Design' || challenge.title === 'Environmental Engineering Solutions') && (
                          <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-bold">AI</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{challenge.category}</p>
                      {challenge.university && (
                        <p className="text-xs text-blue-600 mt-1 font-medium">{challenge.university}</p>
                      )}
                      {challenge.location && (
                        <p className="text-xs text-green-600 mt-1 font-medium">{challenge.location}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Deadline: {challenge.deadline}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          challenge.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          challenge.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {challenge.status === 'active' ? 'AVAILABLE' : 
                           challenge.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">REWARD</p>
                        <p className="text-xl font-bold text-gray-900">+{challenge.reward} XP</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">DIFFICULTY</p>
                        <p className={`text-xl font-bold ${
                          challenge.difficulty === 'Beginner' ? 'text-orange-600' :
                          challenge.difficulty === 'Intermediate' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {challenge.difficulty}
                        </p>
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
                    
                    {(selectedChallenge.title === 'Green Tech Park Design' || 
                      selectedChallenge.title === 'Smart City Infrastructure' || 
                      selectedChallenge.title === 'Community Center Renovation' ||
                      selectedChallenge.title === 'Structural Engineering Analysis' ||
                      selectedChallenge.title === 'Sustainable Architecture Design' ||
                      selectedChallenge.title === 'International Bridge Design' ||
                      selectedChallenge.title === 'Environmental Engineering Solutions') && (
                      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-bold">AI</span>
                          </div>
                          Start with AI
                        </h4>
                        <p className="text-sm text-purple-700">
                          This challenge includes AI-powered tools to help you get started. Use our AI assistant to generate initial concepts, analyze requirements, and explore design possibilities before diving into your solution.
                        </p>
                      </div>
                    )}
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