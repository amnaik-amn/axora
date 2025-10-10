import React, { useState } from 'react';
import { Menu, LogOut, Star, Flame, BookOpen, Trophy, Target, Clock, Rocket, HandHeart, Headphones, Hammer, ChevronRight, TrendingUp, Award, Calendar, Users, Zap, ArrowUpRight, CheckCircle, Circle, BarChart3, MessageSquare, Pin } from 'lucide-react';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Progress = () => {
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  const user = signupUser || demoUser;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Progress graph data - days of month vs study hours
  const progressData = [
    { day: 1, currentMonth: 1.2, previousMonth: 0.8 },
    { day: 5, currentMonth: 2.1, previousMonth: 1.5 },
    { day: 10, currentMonth: 1.8, previousMonth: 2.0 },
    { day: 15, currentMonth: 3.2, previousMonth: 1.2 },
    { day: 20, currentMonth: 3.8, previousMonth: 2.5 },
    { day: 25, currentMonth: 3.5, previousMonth: 1.8 },
    { day: 30, currentMonth: 2.9, previousMonth: 2.2 }
  ];

  const recentAchievements = [
    { title: 'Academic Weapon', description: 'Studied 4 hours on 11th', icon: BookOpen },
    { title: 'Networking Warrior', description: 'Interacted with 3 new contacts in week 6', icon: Users }
  ];

  // Four main metric cards data with interaction hours
  const metricCards = [
    {
      title: 'STUDY',
      value: 78,
      icon: BookOpen,
      sections: {
        Resources: [
          { name: 'Modern Communication.', hours: 12.5, maxHours: 15 },
          { name: 'Is for Architecture Pr.', hours: 8.2, maxHours: 12 },
          { name: 'Civil Engineering Const.', hours: 15.8, maxHours: 18 }
        ],
        Courses: [
          { name: 'Intro to Spatial Reason.', hours: 4.5, maxHours: 20 },
          { name: 'BIM Appli. GIS Mappin.', hours: 8.0, maxHours: 16 },
          { name: 'Intro to Sustainability.', hours: 11.2, maxHours: 16 },
          { name: 'What Happens After C.', hours: 13.4, maxHours: 16 }
        ],
        Tests: [
          { name: 'Spatial Processing 250', attempts: 3, maxAttempts: 5 },
          { name: 'NCARB/U.R.E. Mock Te.', attempts: 10, maxAttempts: 15 }
        ]
      }
    },
    {
      title: 'CHALLENGES',
      value: 34,
      icon: Trophy,
      sections: {
        Local: [
          { name: 'Green Tech Park Design.', hours: 6.8, maxHours: 20 },
          { name: 'Smart City Infrastructu.', hours: 4.2, maxHours: 18 },
          { name: 'Community Center Ren.', hours: 7.1, maxHours: 22 }
        ]
      }
    },
    {
      title: 'COMMUNITY',
      value: 66,
      icon: Users,
      sections: {
        Discussions: [
          { name: 'Struggling with BIM A.', hours: 3.2, maxHours: 10 },
          { name: 'Study materials for Spa.', hours: 2.1, maxHours: 8 },
          { name: 'Sustainability Design P.', hours: 4.5, maxHours: 12 }
        ],
        Courses: [
          { name: 'Intro to Sustainable.', hours: 5.8, maxHours: 16 },
          { name: 'Spatial Reasoning Fund.', hours: 3.9, maxHours: 16 },
          { name: 'BIM Applications. GIS.', hours: 6.2, maxHours: 20 }
        ]
      }
    },
    {
      title: 'PINUP',
      value: 22,
      icon: Pin,
      sections: {
        'Course Projects': [
          { name: 'Intro to Spatial Reason.', hours: 4.4, maxHours: 20 }
        ]
      }
    }
  ];

  const recentActivity = [
    { action: 'Completed "Spatial Reasoning Fundamentals"', time: '2 hours ago', type: 'course' },
    { action: 'Won "Green Tech Park Design" challenge', time: '1 day ago', type: 'challenge' },
    { action: 'Joined "Architecture Fundamentals" study group', time: '2 days ago', type: 'community' },
    { action: 'Earned "Study Streak" achievement', time: '3 days ago', type: 'achievement' }
  ];

  const handleLogout = () => {
    // Clear authentication
    logout();
    // Clear signup user data
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    // Clear onboarding completion so user goes through questions again
    localStorage.removeItem('onboardingComplete');
    // Redirect to login
    window.location.href = '/login';
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'common': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[38px]">PROGRESS</h1>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} className="text-white" />
          </button>
        </div>
      </header>

      <div className="max-w-full mx-auto px-4 py-8">
        {/* Main Content Grid - Wireframe Layout */}
        <div className="space-y-8">
          {/* Top Section - Graph and Four Metric Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Progress Overview Graph */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Progress Overview</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-96">
                {/* Line Chart */}
                <div className="h-full relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-500 font-medium">
                    <span>4.0</span>
                    <span>3.5</span>
                    <span>3.0</span>
                    <span>2.5</span>
                    <span>2.0</span>
                    <span>1.5</span>
                    <span>1.0</span>
                    <span>0.5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="ml-12 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0">
                      {[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((value, idx) => (
                        <div 
                          key={idx}
                          className="absolute w-full border-t border-gray-100"
                          style={{ bottom: `${(value / 4) * 100}%` }}
                        ></div>
                      ))}
          </div>

                    {/* Chart Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      {/* Previous Month Line */}
                      <polyline
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        points={progressData.map((point, idx) => 
                          `${(idx / (progressData.length - 1)) * 100}%,${100 - (point.previousMonth / 4) * 100}%`
                        ).join(' ')}
                      />
                      {/* Current Month Line */}
                      <polyline
                        fill="none"
                        stroke="#AC5757"
                        strokeWidth="4"
                        points={progressData.map((point, idx) => 
                          `${(idx / (progressData.length - 1)) * 100}%,${100 - (point.currentMonth / 4) * 100}%`
                        ).join(' ')}
                      />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 w-full flex justify-between text-sm text-gray-500 font-medium">
                      {progressData.map((point, idx) => (
                        <span key={idx} className="transform -translate-x-1/2">
                          {point.day}th
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-600">Previous Month</span>
          </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#AC5757] rounded"></div>
                    <span className="text-sm font-medium text-gray-600">Current Month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Columns - Four Metric Cards */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metricCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-[#AC5757] rounded-lg p-4 text-white">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="text-lg font-bold text-center">{card.title}</div>
                    </div>
                    
                    {/* Progress Circle with Percentage */}
                    <div className="flex justify-center mb-3">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - card.value / 100)}`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        {/* Percentage Text in Center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{card.value}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Sections - Compact */}
                    <div className="space-y-1">
                      {Object.entries(card.sections).map(([sectionName, items]) => (
                        <div key={sectionName}>
                          <h4 className="text-xs font-semibold mb-1 text-white/90">{sectionName}:</h4>
                          <div className="space-y-1">
                            {items.slice(0, 2).map((item, itemIdx) => {
                              const progress = item.hours !== undefined 
                                ? Math.round((item.hours / item.maxHours) * 100)
                                : item.attempts !== undefined 
                                  ? Math.round((item.attempts / item.maxAttempts) * 100)
                                  : 0;
                              
                              return (
                                <div key={itemIdx} className="text-xs">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-white/90 font-medium truncate flex-1 mr-1 text-xs">{item.name}</span>
                                    {item.hours !== undefined ? (
                                      <span className="text-white/70 font-semibold text-xs whitespace-nowrap">{item.hours}h</span>
                                    ) : item.attempts !== undefined ? (
                                      <span className="text-white/70 font-semibold text-xs whitespace-nowrap">{item.attempts}</span>
                                    ) : null}
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-1">
                                    <div 
                                      className="bg-white h-1 rounded-full transition-all duration-500"
                                      style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
          </div>
          
          {/* Bottom Section - Recent Achievements (Full Width) */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentAchievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#AC5757] rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        </div>

      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Progress;

