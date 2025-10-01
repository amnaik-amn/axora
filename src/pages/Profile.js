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
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress Dashboard</h2>
                <p className="text-gray-600">Track your learning journey and achievements</p>
              </div>

              {/* Overall Progress Overview */}
              <div className="bg-white rounded-3xl p-8 text-gray-900 relative overflow-hidden border border-gray-200">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">Overall Progress</h3>
                      <p className="text-gray-600">Your academic journey so far</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold" style={{ color: '#A54B4B' }}>65%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>

                  {/* Progress Comparison Chart */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">Progress Comparison</h4>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      {/* Line Graph */}
                      <div className="relative h-64 mb-4">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          {/* Y-axis labels (Hours) */}
                          <text x="20" y="20" className="text-xs fill-gray-500">60h</text>
                          <text x="20" y="60" className="text-xs fill-gray-500">45h</text>
                          <text x="20" y="100" className="text-xs fill-gray-500">30h</text>
                          <text x="20" y="140" className="text-xs fill-gray-500">15h</text>
                          <text x="20" y="180" className="text-xs fill-gray-500">0h</text>
                          
                          {/* Grid lines */}
                          <line x1="40" y1="20" x2="380" y2="20" stroke="#E5E7EB" strokeWidth="1"/>
                          <line x1="40" y1="60" x2="380" y2="60" stroke="#E5E7EB" strokeWidth="1"/>
                          <line x1="40" y1="100" x2="380" y2="100" stroke="#E5E7EB" strokeWidth="1"/>
                          <line x1="40" y1="140" x2="380" y2="140" stroke="#E5E7EB" strokeWidth="1"/>
                          <line x1="40" y1="180" x2="380" y2="180" stroke="#E5E7EB" strokeWidth="1"/>
                          
                          {/* Current month line (red) */}
                          <polyline
                            points="80,140 140,120 200,100 260,80"
                        fill="none"
                            stroke="#A54B4B"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* Previous month line (light red) */}
                          <polyline
                            points="80,160 140,150 200,130 260,110"
                        fill="none"
                            stroke="#FFB3B3"
                        strokeWidth="2"
                        strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="5,5"
                          />
                          
                          {/* Data points - Current month */}
                          <circle cx="80" cy="140" r="4" fill="#A54B4B"/>
                          <circle cx="140" cy="120" r="4" fill="#A54B4B"/>
                          <circle cx="200" cy="100" r="4" fill="#A54B4B"/>
                          <circle cx="260" cy="80" r="4" fill="#A54B4B"/>
                          
                          {/* Data points - Previous month */}
                          <circle cx="80" cy="160" r="3" fill="#FFB3B3"/>
                          <circle cx="140" cy="150" r="3" fill="#FFB3B3"/>
                          <circle cx="200" cy="130" r="3" fill="#FFB3B3"/>
                          <circle cx="260" cy="110" r="3" fill="#FFB3B3"/>
                          
                          {/* X-axis labels */}
                          <text x="80" y="195" className="text-xs fill-gray-600" textAnchor="middle">Study</text>
                          <text x="140" y="195" className="text-xs fill-gray-600" textAnchor="middle">Challenges</text>
                          <text x="200" y="195" className="text-xs fill-gray-600" textAnchor="middle">Community</text>
                          <text x="260" y="195" className="text-xs fill-gray-600" textAnchor="middle">Pin Up</text>
                    </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 rounded" style={{ backgroundColor: '#A54B4B' }}></div>
                          <span className="text-sm text-gray-600">Current Month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 rounded border-2 border-dashed" style={{ borderColor: '#FFB3B3' }}></div>
                          <span className="text-sm text-gray-600">Previous Month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Statistics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#A54B4B', backgroundColor: '#FEF2F2' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#A54B4B' }}>8</div>
                      <div className="text-xs font-semibold" style={{ color: '#A54B4B' }}>COURSES</div>
                      <div className="text-xs text-gray-600 mt-1">6 completed</div>
                    </div>
                    <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#A54B4B', backgroundColor: '#FEF2F2' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#A54B4B' }}>52h</div>
                      <div className="text-xs font-semibold" style={{ color: '#A54B4B' }}>STUDIED</div>
                      <div className="text-xs text-gray-600 mt-1">This semester</div>
                </div>
                    <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#A54B4B', backgroundColor: '#FEF2F2' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#A54B4B' }}>4</div>
                      <div className="text-xs font-semibold" style={{ color: '#A54B4B' }}>CHALLENGES</div>
                      <div className="text-xs text-gray-600 mt-1">2 completed</div>
                  </div>
                    <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#A54B4B', backgroundColor: '#FEF2F2' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#A54B4B' }}>1,240</div>
                      <div className="text-xs font-semibold" style={{ color: '#A54B4B' }}>XP POINTS</div>
                      <div className="text-xs text-gray-600 mt-1">Total earned</div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900">Recent Achievements</h4>
                  <p className="text-sm text-gray-500">Your latest accomplishments</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#AC5757' }}>
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Completed BIM Course</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                    <div className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#9d0a06' }}>
                      +50 XP
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#AC5757' }}>
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Active in Community</p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                    <div className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#9d0a06' }}>
                      +25 XP
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#AC5757' }}>
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Project Published</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                    <div className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#9d0a06' }}>
                      +75 XP
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Categories - Rectangular Icons */}
              <div className="space-y-4 w-full px-4 lg:px-8 xl:px-12">
                {/* Study Progress */}
                <div className="bg-white rounded-2xl p-4 lg:p-6 xl:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#A54B4B' }}>
                        <img src="/assets/studyicon.png" alt="Study" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Study</h4>
                        <p className="text-sm text-gray-500">Course completion & assignments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-3xl font-bold" style={{ color: '#A54B4B' }}>75%</span>
                        <p className="text-sm text-gray-500">6/8 courses</p>
                      </div>
                      <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '75%', backgroundColor: '#A54B4B'}}></div>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>

                {/* Challenges Progress */}
                <div className="bg-white rounded-2xl p-4 lg:p-6 xl:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#A54B4B' }}>
                        <span className="text-white text-3xl">🏆</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Challenges</h4>
                        <p className="text-sm text-gray-500">Problem-solving & competitions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-3xl font-bold" style={{ color: '#A54B4B' }}>34%</span>
                        <p className="text-sm text-gray-500">2/6 challenges</p>
                      </div>
                      <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '34%', backgroundColor: '#A54B4B'}}></div>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>

                {/* Community Progress */}
                <div className="bg-white rounded-2xl p-4 lg:p-6 xl:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#A54B4B' }}>
                        <span className="text-white text-3xl">👥</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Community</h4>
                        <p className="text-sm text-gray-500">Discussions & collaboration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-3xl font-bold" style={{ color: '#A54B4B' }}>46%</span>
                        <p className="text-sm text-gray-500">23/50 posts</p>
                      </div>
                      <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '46%', backgroundColor: '#A54B4B'}}></div>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>

                {/* Pin Up Progress */}
                <div className="bg-white rounded-2xl p-4 lg:p-6 xl:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#A54B4B' }}>
                        <span className="text-white text-3xl">📌</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Pin Up</h4>
                        <p className="text-sm text-gray-500">Project portfolio & showcases</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-3xl font-bold" style={{ color: '#A54B4B' }}>59%</span>
                        <p className="text-sm text-gray-500">8/14 projects</p>
                      </div>
                      <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '59%', backgroundColor: '#A54B4B'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals & Targets */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#9d0a06' }}>
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Goals & Targets</h4>
                    <p className="text-sm text-gray-500">Your learning objectives</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Complete 10 Courses</span>
                      <span className="text-sm font-bold" style={{ color: '#AC5757' }}>6/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-1000" style={{width: '60%', backgroundColor: '#AC5757'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">4 courses remaining</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#9d0a06' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Earn 2000 XP</span>
                      <span className="text-sm font-bold" style={{ color: '#9d0a06' }}>1,240/2,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-1000" style={{width: '62%', backgroundColor: '#9d0a06'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">760 XP to go</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Join 5 Study Groups</span>
                      <span className="text-sm font-bold" style={{ color: '#AC5757' }}>2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-1000" style={{width: '40%', backgroundColor: '#AC5757'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">3 groups remaining</p>
                  </div>
                </div>
              </div>

              {/* Next Goals */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#AC5757' }}>
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Next Goals</h4>
                    <p className="text-sm text-gray-500">Your upcoming objectives</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#AC5757' }}>
                      <span className="text-white text-lg">📚</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Complete remaining 2 courses</p>
                      <p className="text-sm text-gray-600">Focus on BIM and Structures</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#AC5757' }}>2 left</div>
                      <div className="text-xs text-gray-500">This semester</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#9d0a06' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#9d0a06' }}>
                      <span className="text-white text-lg">🏆</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Participate in 3 more challenges</p>
                      <p className="text-sm text-gray-600">Build problem-solving skills</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#9d0a06' }}>3 left</div>
                      <div className="text-xs text-gray-500">Next month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#F3E9E7', borderColor: '#AC5757' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#AC5757' }}>
                      <span className="text-white text-lg">📌</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Publish 6 more projects</p>
                      <p className="text-sm text-gray-600">Showcase your work</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#AC5757' }}>6 left</div>
                      <div className="text-xs text-gray-500">Portfolio goal</div>
                    </div>
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