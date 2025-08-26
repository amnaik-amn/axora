import React, { useState } from 'react';
import { ArrowLeft, User, Settings, Bell, Shield, HelpCircle, LogOut, Edit2, Camera, Star, Flame, BookOpen, Trophy, Target, Clock, Rocket, HandHeart, Headphones, Hammer, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth, logout } from '../auth/config';

const Profile = () => {
  const user = checkAuth();

  const stats = [
    { label: 'XP Earned', value: '2,340', icon: Star },
    { label: 'Current Streak', value: '7 days', icon: Flame },
    { label: 'Completed Courses', value: '12', icon: BookOpen },
    { label: 'Global Rank', value: '#156', icon: Trophy },
    { label: 'Challenges Won', value: '8', icon: Target },
    { label: 'Study Hours', value: '124h', icon: Clock }
  ];

  const achievements = [
    { title: 'Early Adopter', description: 'Joined AXORA in the first month', icon: Rocket, earned: true },
    { title: 'Study Streak', description: '7 days consecutive learning', icon: Flame, earned: true },
    { title: 'Challenge Master', description: 'Won 5 challenges', icon: Trophy, earned: true },
    { title: 'Community Helper', description: 'Helped 10 students', icon: HandHeart, earned: false },
    { title: 'VR Explorer', description: 'Completed 10 VR sessions', icon: Headphones, earned: false },
    { title: 'Architecture Pro', description: 'Master level in Architecture', icon: Hammer, earned: false }
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
    // Clear onboarding completion so user goes through questions again
    localStorage.removeItem('onboardingComplete');
    // Redirect to login
    window.location.href = '/login';
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
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={16} className="text-gray-500" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'Ahmed'}
            </h2>
            <p className="text-gray-600 text-lg">Here's your learning progress and achievements.</p>
          </div>

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-6 gap-1 mb-8 max-w-2xl">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded p-1 text-center">
                  <Icon size={12} className="mx-auto mb-0.5 text-brand-500" />
                  <div className="text-xs font-semibold text-gray-900 leading-tight">{stat.value}</div>
                  <div className="text-[8px] text-gray-500 leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={idx} className={`group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 ${
                  achievement.earned ? 'hover:border-brand-200' : 'hover:border-gray-300'
                }`}>
                  <div className={`inline-flex p-3 rounded-xl ${
                    achievement.earned ? 'bg-brand-50 text-brand-700' : 'bg-gray-50 text-gray-400'
                  } mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h4 className={`font-semibold mb-2 ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <div className="mt-4 flex items-center gap-2 text-brand-600">
                      <div className="w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-xs font-medium">Completed</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
            <span className="text-brand-600 font-semibold">View all →</span>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'course' ? 'bg-blue-500' :
                      activity.type === 'challenge' ? 'bg-green-500' :
                      activity.type === 'community' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;