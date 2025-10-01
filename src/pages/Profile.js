import React, { useState, useEffect } from 'react';
import { Menu, ArrowLeft, Settings, Edit2, Lock, RefreshCw, Info, LogOut, HelpCircle, ChevronRight, Plus, X, Target } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Profile = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [targets, setTargets] = useState([
    { id: 1, text: 'Complete Advanced BIM Course', completed: false },
    { id: 2, text: 'Master Spatial Reasoning Fundamentals', completed: false },
    { id: 3, text: 'Publish 3 Portfolio Projects', completed: false }
  ]);
  const [dashboardNotes, setDashboardNotes] = useState([
    { id: 1, title: 'Study Schedule', content: 'Focus on BIM applications this week', tag: 'academic', color: '#AC5757' },
    { id: 2, title: 'Project Ideas', content: 'Green building design for urban spaces', tag: 'project', color: '#8B3E3E' }
  ]);
  const [allNotes] = useState([
    { id: 1, title: 'Study Schedule', content: 'Focus on BIM applications this week', tag: 'academic', color: '#AC5757' },
    { id: 2, title: 'Project Ideas', content: 'Green building design for urban spaces', tag: 'project', color: '#8B3E3E' },
    { id: 3, title: 'Career Goals', content: 'Prepare for NCARB certification exam', tag: 'career', color: '#9d0a06' },
    { id: 4, title: 'Resource Links', content: 'Sustainable architecture references', tag: 'resources', color: '#C89595' },
    { id: 5, title: 'Meeting Notes', content: 'Community discussion takeaways', tag: 'community', color: '#AC5757' },
    { id: 6, title: 'Quick Reminders', content: 'Submit challenge by Friday', tag: 'reminder', color: '#8B3E3E' }
  ]);

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

  const handleAddNoteToBoard = (note) => {
    if (dashboardNotes.length < 2) {
      if (!dashboardNotes.find(n => n.id === note.id)) {
        setDashboardNotes([...dashboardNotes, note]);
      }
    }
  };

  const handleRemoveNote = (noteId) => {
    setDashboardNotes(dashboardNotes.filter(n => n.id !== noteId));
  };

  const toggleTarget = (targetId) => {
    setTargets(targets.map(t => 
      t.id === targetId ? { ...t, completed: !t.completed } : t
    ));
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
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8">
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
            <div className="w-full mx-auto">
              {/* Header */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Progress Overview</h2>
              
              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                {/* Left Column - Graph and Achievements */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  {/* Progress Graph */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-200">
                    <div className="relative h-64 sm:h-80">
                      <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                        {/* Y-axis labels */}
                        <text x="15" y="30" className="text-xs fill-gray-500">14.0</text>
                        <text x="15" y="75" className="text-xs fill-gray-500">12.0</text>
                        <text x="15" y="120" className="text-xs fill-gray-500">10.0</text>
                        <text x="15" y="165" className="text-xs fill-gray-500">08.0</text>
                        <text x="15" y="210" className="text-xs fill-gray-500">06.0</text>
                        <text x="15" y="255" className="text-xs fill-gray-500">04.0</text>
                          
                          {/* Grid lines */}
                        <line x1="50" y1="30" x2="580" y2="30" stroke="#E5E7EB" strokeWidth="1"/>
                        <line x1="50" y1="75" x2="580" y2="75" stroke="#E5E7EB" strokeWidth="1"/>
                        <line x1="50" y1="120" x2="580" y2="120" stroke="#E5E7EB" strokeWidth="1"/>
                        <line x1="50" y1="165" x2="580" y2="165" stroke="#E5E7EB" strokeWidth="1"/>
                        <line x1="50" y1="210" x2="580" y2="210" stroke="#E5E7EB" strokeWidth="1"/>
                        <line x1="50" y1="255" x2="580" y2="255" stroke="#E5E7EB" strokeWidth="1"/>
                        
                        {/* Previous month line (lighter) */}
                        <path
                          d="M 50,65 Q 120,55 150,60 T 230,85 T 300,100 T 370,110 T 430,125 T 500,150 T 560,165"
                        fill="none"
                          stroke="#C89595"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                        {/* Current month line (darker red) */}
                        <path
                          d="M 50,80 Q 120,90 150,105 T 230,115 T 300,140 T 370,165 T 430,185 T 500,200 T 560,190"
                        fill="none"
                          stroke="#8B3E3E"
                          strokeWidth="4"
                        strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                          
                          {/* X-axis labels */}
                        <text x="80" y="285" className="text-xs fill-gray-600" textAnchor="middle">1 Jan</text>
                        <text x="170" y="285" className="text-xs fill-gray-600" textAnchor="middle">8 Jan</text>
                        <text x="260" y="285" className="text-xs fill-gray-600" textAnchor="middle">15 Jan</text>
                        <text x="350" y="285" className="text-xs fill-gray-600" textAnchor="middle">22 Jan</text>
                        <text x="440" y="285" className="text-xs fill-gray-600" textAnchor="middle">29 Jan</text>
                        <text x="530" y="285" className="text-xs fill-gray-600" textAnchor="middle">5 Feb</text>
                    </svg>
                      </div>
                      
                      {/* Legend */}
                    <div className="flex items-center justify-center gap-8 mt-4">
                        <div className="flex items-center gap-2">
                        <div className="w-12 h-1 rounded" style={{ backgroundColor: '#8B3E3E' }}></div>
                        <span className="text-sm text-gray-700 font-medium">Previous Month</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="w-12 h-1 rounded" style={{ backgroundColor: '#C89595' }}></div>
                        <span className="text-sm text-gray-700 font-medium">Current Month</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-200">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Recent Achievements</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-gray-50 border-l-4" style={{ borderColor: '#AC5757' }}>
                        <p className="font-semibold text-gray-700">Academic Weapon: Studied 4 hours on 11th</p>
                    </div>
                      <div className="p-3 rounded-xl bg-gray-50 border-l-4" style={{ borderColor: '#AC5757' }}>
                        <p className="font-semibold text-gray-700">Networking Warrior: Interacted with 3 new contacts in week 6</p>
                  </div>
                  </div>
                  </div>
                </div>
                
                {/* Right Column - Circular Progress Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Study Card */}
                  <div className="rounded-2xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden" style={{ backgroundColor: '#AC5757' }}>
                    <div className="relative z-10">
                      {/* Circular Progress */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="8"
                              strokeDasharray="314"
                              strokeDashoffset={314 - (314 * 78 / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">78</span>
                    </div>
                    </div>
                  </div>
                  
                      <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">STUDY</h3>
                      
                      {/* Resources */}
                      <div className="mb-4">
                        <p className="font-bold text-sm mb-2">Resources:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Modern Communication..</span>
                            <span className="font-bold">96%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">A is for Architecture P..</span>
                            <span className="font-bold">94%</span>
                    </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Civil Engineering Const..</span>
                            <span className="font-bold">97%</span>
                    </div>
                    </div>
                  </div>
                  
                      {/* Courses */}
                      <div className="mb-4">
                        <p className="font-bold text-sm mb-2">Courses:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Intro to Spacial Reason..</span>
                            <span className="font-bold">35%</span>
                    </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">BIM Appli.: GIS Mappin..</span>
                            <span className="font-bold">98%</span>
                    </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Intro to Sustainability ..</span>
                            <span className="font-bold">77%</span>
                    </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">What Happens After C..</span>
                            <span className="font-bold">84%</span>
                  </div>
                </div>
              </div>

                      {/* Tests */}
                      <div>
                        <p className="font-bold text-sm mb-2">Tests:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="truncate mr-2">Spatial Reasoning 289</span>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">3</span>
                              <span className="text-[10px]">att</span>
                      </div>
                    </div>
                          <div className="flex justify-between items-center">
                            <span className="truncate mr-2">NCARB/A.R.E. Mock Te..</span>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">13</span>
                              <span className="text-[10px]">att</span>
                      </div>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>

                  {/* Challenges Card */}
                  <div className="rounded-2xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden" style={{ backgroundColor: '#AC5757' }}>
                    <div className="relative z-10">
                      {/* Circular Progress */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="8"
                              strokeDasharray="314"
                              strokeDashoffset={314 - (314 * 34 / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">34</span>
                      </div>
                    </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">CHALLENGES</h3>
                      
                      {/* Local */}
                      <div className="mb-4">
                        <p className="font-bold text-sm mb-2">Local:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Green tech Park Design..</span>
                            <span className="font-bold">36%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Smart City Infrastructu..</span>
                            <span className="font-bold">24%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Community Center Ren..</span>
                            <span className="font-bold">33%</span>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>

                  {/* Community Card */}
                  <div className="rounded-2xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden" style={{ backgroundColor: '#AC5757' }}>
                    <div className="relative z-10">
                      {/* Circular Progress */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="8"
                              strokeDasharray="314"
                              strokeDashoffset={314 - (314 * 66 / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">66</span>
                      </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">COMMUNITY</h3>
                      
                      {/* Discussions */}
                      <div className="mb-4">
                        <p className="font-bold text-sm mb-2">Discussions:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Struggling with BIM As..</span>
                            <span className="font-bold">36%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Study materials for Spa..</span>
                            <span className="font-bold">24%</span>
                  </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Sustainability Design Pr..</span>
                            <span className="font-bold">33%</span>
                  </div>
                </div>
                      </div>
                      
                      {/* Courses */}
                      <div>
                        <p className="font-bold text-sm mb-2">Courses:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Introduction to Sustain..</span>
                            <span className="font-bold">36%</span>
                      </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Spatial Reasoning Fund..</span>
                            <span className="font-bold">24%</span>
                    </div>
                          <div className="flex justify-between">
                            <span className="truncate mr-2">BIM Applications: GIS ..</span>
                            <span className="font-bold">83%</span>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pinup Card */}
                  <div className="rounded-2xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden" style={{ backgroundColor: '#AC5757' }}>
                    <div className="relative z-10">
                      {/* Circular Progress */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="8"
                              strokeDasharray="314"
                              strokeDashoffset={314 - (314 * 22 / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">22</span>
                  </div>
                </div>
              </div>

                      <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">PINUP</h3>
                      
                      {/* Course Projects */}
                  <div>
                        <p className="font-bold text-sm mb-2">Course Projects:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="truncate mr-2">Intro to Spatial Reasoni..</span>
                            <span className="font-bold">22%</span>
                    </div>
                  </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Targets and Notes Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                {/* Targets Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#AC5757' }} />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Targets</h3>
                  </div>
                
                <div className="space-y-4">
                    {targets.map((target) => (
                      <div 
                        key={target.id} 
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => toggleTarget(target.id)}
                          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                            target.completed 
                              ? 'border-[#AC5757] bg-[#AC5757]' 
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {target.completed && (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`text-base font-medium flex-1 ${
                          target.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                        }`}>
                          {target.text}
                        </span>
                    </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4 italic">
                    * Targets can only be added on command and cannot be removed
                  </p>
                    </div>

                {/* Notes Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-200 relative">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Quick Notes</h3>
                    <button
                      onClick={() => setShowNotesModal(true)}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                      style={{ backgroundColor: '#AC5757' }}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Notes</span>
                    </button>
                  </div>
                  
                  {dashboardNotes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <p className="text-lg">No notes added yet</p>
                      <p className="text-sm">Click "+ Notes" to add up to 2 notes</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dashboardNotes.map((note) => (
                        <div 
                          key={note.id} 
                          className="p-4 rounded-xl border-2 relative"
                          style={{ borderColor: note.color, backgroundColor: `${note.color}15` }}
                        >
                          <button
                            onClick={() => handleRemoveNote(note.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: note.color }}
                            >
                              {note.tag}
                            </span>
                            <h4 className="font-bold text-gray-900">{note.title}</h4>
                          </div>
                          <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                      ))}
                    </div>
                  )}

                  {dashboardNotes.length > 0 && dashboardNotes.length < 2 && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      You can add {2 - dashboardNotes.length} more note(s)
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNotesModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Select Notes to Add</h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {dashboardNotes.length >= 2 ? (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-4">
                <p className="text-yellow-800 font-medium">
                  You already have 2 notes on your dashboard. Remove a note to add a new one.
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">
                Select up to {2 - dashboardNotes.length} more note(s) to display on your dashboard.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allNotes.map((note) => {
                const isOnDashboard = dashboardNotes.find(n => n.id === note.id);
                const canAdd = dashboardNotes.length < 2;
                
                return (
                  <button
                    key={note.id}
                    onClick={() => {
                      if (!isOnDashboard && canAdd) {
                        handleAddNoteToBoard(note);
                      }
                    }}
                    disabled={isOnDashboard || !canAdd}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isOnDashboard 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                        : canAdd
                          ? 'hover:shadow-lg cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ 
                      borderColor: note.color, 
                      backgroundColor: isOnDashboard ? '#f3f4f6' : `${note.color}15`
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: note.color }}
                      >
                        {note.tag}
                      </span>
                      {isOnDashboard && (
                        <span className="text-xs font-bold text-green-600">✓ Added</span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{note.title}</h4>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-6 py-3 rounded-full text-white font-bold"
                style={{ backgroundColor: '#AC5757' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Profile;