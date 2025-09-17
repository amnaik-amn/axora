import React, { useState, useEffect } from 'react';
import { Menu, ArrowLeft, Settings, Search, User, Edit2, Lock, RefreshCw, Info, LogOut, HelpCircle, ChevronRight, Bell } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Profile = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Handle URL parameters for direct tab linking
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'progress'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'progress', label: 'Progress' }
  ];

  const menuItems = [
    { icon: Settings, label: 'Edit Profile', action: 'edit-profile' },
    { icon: Lock, label: 'Change Password', action: 'change-password' },
    { icon: RefreshCw, label: 'Update', action: 'update' },
    { icon: Info, label: 'Information', action: 'information' },
    { icon: LogOut, label: 'Log out', action: 'logout', isLogout: true },
    { icon: HelpCircle, label: 'Customer Service', action: 'customer-service' }
  ];

  const handleLogout = () => {
    // Clear authentication
    logout();
    // Clear onboarding completion so user goes through questions again
    localStorage.removeItem('onboardingComplete');
    // Redirect to login
    window.location.href = '/login';
  };

  const handleMenuItemClick = (action) => {
    if (action === 'logout') {
      handleLogout();
    }
    // Handle other menu items here
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[55px]">PROFILE</h1>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-white" />
          </button>
        </div>
      </header>

      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-full p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Content */}
          {activeTab === 'profile' && (
            <>
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                    {/* Profile image placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-[#AC5757] to-[#8A4A4A] flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">
                        {user?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors">
                    <Edit2 size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.name || 'Ahmed Ali'}
                </h2>
                <p className="text-gray-600">
                  {user?.phone || '0123 4567 8901 2345'}
                </p>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {menuItems.slice(0, 4).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleMenuItemClick(item.action)}
                      className="w-full flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="flex-1 text-left text-gray-900 font-medium">
                        {item.label}
                      </span>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}

                {/* More Section */}
                <div className="pt-4">
                  <p className="text-center text-gray-500 text-sm mb-3">More</p>
                  {menuItems.slice(4).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleMenuItemClick(item.action)}
                        className={`w-full flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-2 ${
                          item.isLogout ? 'hover:bg-red-50' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 ${item.isLogout ? 'bg-red-600' : 'bg-gray-800'} rounded-lg flex items-center justify-center`}>
                          <Icon size={18} className="text-white" />
                        </div>
                        <span className={`flex-1 text-left font-medium ${item.isLogout ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.label}
                        </span>
                        <ChevronRight size={18} className="text-gray-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Progress Tab Content */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* Overall Progress Overview */}
              <div className="bg-gradient-to-br from-[#AC5757] to-[#8A4A4A] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold text-center mb-6">ACADEMIC PROGRESS</h3>
                
                {/* Main Progress Circle */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                        className="text-white"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">65%</span>
                      <span className="text-sm opacity-80">COMPLETE</span>
                    </div>
                  </div>
                </div>
                
                {/* Key Statistics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs opacity-80">COURSES</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">52h</div>
                    <div className="text-xs opacity-80">STUDIED</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-xs opacity-80">CHALLENGES</div>
                  </div>
                </div>
              </div>

              {/* Detailed Progress Sections */}
              <div className="space-y-4">
                {/* Study Progress */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-lg">📚</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">STUDY</h4>
                        <p className="text-xs text-gray-500">Course completion & assignments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">75%</span>
                      <p className="text-xs text-gray-500">6/8 courses</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Completed: 6 courses</span>
                    <span>Remaining: 2 courses</span>
                  </div>
                </div>

                {/* Challenges Progress */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-lg">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">CHALLENGES</h4>
                        <p className="text-xs text-gray-500">Problem-solving & competitions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-orange-600">34%</span>
                      <p className="text-xs text-gray-500">2/6 challenges</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500" style={{width: '34%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Completed: 2 challenges</span>
                    <span>Remaining: 4 challenges</span>
                  </div>
                </div>

                {/* Community Progress */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">👥</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">COMMUNITY</h4>
                        <p className="text-xs text-gray-500">Discussions & collaboration</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">46%</span>
                      <p className="text-xs text-gray-500">23/50 posts</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500" style={{width: '46%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Posts: 23</span>
                    <span>Goal: 50 posts</span>
                  </div>
                </div>

                {/* Pin Up Progress */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-lg">📌</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">PIN UP</h4>
                        <p className="text-xs text-gray-500">Project portfolio & showcases</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-purple-600">59%</span>
                      <p className="text-xs text-gray-500">8/14 projects</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-500" style={{width: '59%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Projects: 8</span>
                    <span>Goal: 14 projects</span>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">🏅</span>
                  RECENT ACHIEVEMENTS
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Completed BIM Course</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+50 XP</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Active in Community</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+25 XP</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📌</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Project Published</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">+75 XP</span>
                  </div>
                </div>
              </div>

              {/* Next Goals */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#AC5757]">🎯</span>
                  NEXT GOALS
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                    <span className="text-sm text-gray-700">Complete remaining 2 courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                    <span className="text-sm text-gray-700">Participate in 3 more challenges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                    <span className="text-sm text-gray-700">Publish 6 more projects</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Profile;