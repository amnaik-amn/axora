import React, { useState } from 'react';
import { Menu, ArrowLeft, Settings, Search, User, Edit2, Lock, RefreshCw, Info, LogOut, HelpCircle, ChevronRight, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Profile = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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
          <h1 className="font-oswald font-medium text-white text-[38px]">PROFILE</h1>
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
              {/* Overall Progress Circle */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 text-center mb-4">PROGRESS</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    {/* Background circle */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                      />
                      {/* Progress circle */}
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#progress-gradient)"
                        strokeWidth="2"
                        strokeDasharray="65, 100"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22D3EE" />
                          <stop offset="50%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">65%</span>
                      <span className="text-xs text-gray-500 font-medium">PROGRESS</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-xs text-gray-600">COURSES</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">52h</div>
                    <div className="text-xs text-gray-600">STUDIED</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4</div>
                    <div className="text-xs text-gray-600">CHALLENGES</div>
                  </div>
                </div>
              </div>

              {/* Individual Progress Bars */}
              <div className="space-y-4">
                {/* Study Progress */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">STUDY</span>
                    <span className="font-bold text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>

                {/* Challenges Progress */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">CHALLENGES</span>
                    <span className="font-bold text-gray-900">34%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                </div>

                {/* Community Progress */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900 text-lg">COMMUNITY</span>
                    <span className="font-bold text-gray-900">46%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '46%'}}></div>
                  </div>
                </div>

                {/* Pin Up Progress */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900 text-lg">PIN UP</span>
                    <span className="font-bold text-gray-900">59%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '59%'}}></div>
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