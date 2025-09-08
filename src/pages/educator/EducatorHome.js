import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, BookOpen, Trophy, Users, BarChart3, Play, ChevronRight, Star, Clock, Flame, Award, BookOpenCheck, Target, Bell, GraduationCap, UserCheck, FileText, Calendar } from 'lucide-react';
import { checkAuth } from '../../auth/config';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';

const EducatorHome = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get educator role from localStorage
  const educatorRole = localStorage.getItem('educatorRole') || 'Professor';

  const stats = [
    { label: 'Active Students', value: '127', icon: Users },
    { label: 'Courses', value: '4', icon: BookOpenCheck },
    { label: 'Assignments', value: '12', icon: FileText },
    { label: 'This Week', value: '18h', icon: Clock }
  ];

  const quickActions = [
    { 
      title: 'Course Management', 
      subtitle: 'Manage your courses', 
      icon: BookOpen, 
      path: '/educator-app/study',
      color: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    { 
      title: 'Student Progress', 
      subtitle: 'Track performance', 
      icon: BarChart3, 
      path: '/educator-app/challenges',
      color: 'bg-green-50 text-green-700 border-green-100'
    },
    { 
      title: 'Faculty Community', 
      subtitle: 'Connect with peers', 
      icon: Users, 
      path: '/educator-app/community',
      color: 'bg-purple-50 text-purple-700 border-purple-100'
    },
    { 
      title: 'Analytics', 
      subtitle: 'View insights', 
      icon: Trophy, 
      path: '/educator-app/profile',
      color: 'bg-amber-50 text-amber-700 border-amber-100'
    }
  ];

  const recentActivity = [
    {
      type: 'assignment',
      title: 'Spatial Design Assignment',
      subtitle: '23 submissions pending review',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'student',
      title: 'Ahmed Al-Mansouri',
      subtitle: 'Completed Advanced Architecture module',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      type: 'discussion',
      title: 'Sustainable Design Forum',
      subtitle: '8 new posts in discussion',
      time: '1 day ago',
      status: 'active'
    }
  ];

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
          
          <h1 className="font-oswald font-medium text-white text-[38px]">AXORA</h1>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/educator-app/notifications" 
              className="hidden md:flex w-10 h-10 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Bell size={20} className="text-white" />
            </Link>
            <Link to="/educator-app/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
              <span className="text-[#AC5757] font-semibold text-sm">
                {user?.name?.charAt(0) || 'S'}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome back, {educatorRole === 'Professor' ? 'Prof.' : ''} {user?.name || 'Sarah'}
            </h2>
            <p className="text-gray-600 text-xl font-medium">Your teaching dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-1 mb-6 max-w-md">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded p-1.5 text-center">
                  <Icon size={13} className="mx-auto mb-0.5 text-[#AC5757]" />
                  <div className="text-sm font-semibold text-gray-900 leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'pending' ? 'bg-yellow-400' :
                      activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{activity.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{activity.time}</div>
                    <ChevronRight size={16} className="text-gray-400 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Tools */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Teaching Tools</h3>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            <Link to="/educator-app/study" className="bg-[#CDCCCC] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-117 bg-[#AC5757] flex items-center justify-center">
                <BookOpen size={48} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">COURSES</h4>
            </Link>
            
            <Link to="/educator-app/challenges" className="bg-[#CDCCCC] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-117 bg-[#AC5757] flex items-center justify-center">
                <UserCheck size={48} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">STUDENTS</h4>
            </Link>
            
            <Link to="/educator-app/community" className="bg-[#CDCCCC] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-117 bg-[#AC5757] flex items-center justify-center">
                <Users size={48} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">FACULTY</h4>
            </Link>
            
            <Link to="/educator-app/profile" className="bg-[#CDCCCC] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-117 bg-[#AC5757] flex items-center justify-center">
                <BarChart3 size={48} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">ANALYTICS</h4>
            </Link>
            
            <Link to="/educator-app/vr" className="bg-[#CDCCCC] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-117 bg-[#AC5757] flex items-center justify-center">
                <Play size={48} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">VR TOOLS</h4>
            </Link>
          </div>
        </section>

        {/* Featured VR Experience */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-2xl p-0 relative overflow-hidden h-80">
            <img 
              src="/assets/VRicon.jpg" 
              alt="VR Teaching Tools"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div></div>
              <div className="max-w-lg">
                <h3 className="font-judson font-bold text-white text-[32px] mb-2 leading-tight">TEACH</h3>
                <h3 className="font-judson font-bold text-white text-[32px] mb-2 leading-tight">WITH</h3>
                <h3 className="font-judson font-bold text-white text-[32px] mb-4 leading-tight">VR</h3>
                <p className="text-white/90 mb-6 text-sm">
                  Create immersive learning experiences
                </p>
                <button 
                  onClick={() => navigate('/educator-app/vr')}
                  className="bg-[#AC5757] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Course Management Cards */}
        <section className="mb-8">
          {/* Current Courses Card */}
          <div className="bg-[#9E3939] rounded-2xl relative overflow-hidden mb-4 h-32">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 p-6 z-10">
                <h3 className="text-white text-xl font-bold mb-3">
                  Manage Your<br />Courses
                </h3>
                <button 
                  onClick={() => navigate('/educator-app/study')}
                  className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  View Courses
                </button>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-40">
                <div className="w-full h-full bg-gradient-to-l from-[#AC5757] to-transparent rounded-r-2xl flex items-center justify-center">
                  <GraduationCap size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Resources Card */}
          <div className="bg-gray-200 rounded-2xl relative overflow-hidden h-32">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 p-6 z-10">
                <h3 className="text-gray-900 text-xl font-bold mb-3">
                  Faculty Resources 
                </h3>
                <button 
                  onClick={() => navigate('/educator-app/community')}
                  className="bg-[#AC5757] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors text-sm"
                >
                  Browse Resources
                </button>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-40">
                <div className="w-full h-full bg-gradient-to-l from-[#AC5757] to-transparent rounded-r-2xl flex items-center justify-center">
                  <FileText size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Navigation Modal */}
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default EducatorHome;
