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
      path: '/educator/study',
      color: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    { 
      title: 'Student Progress', 
      subtitle: 'Track performance', 
      icon: BarChart3, 
      path: '/educator/challenges',
      color: 'bg-green-50 text-green-700 border-green-100'
    },
    { 
      title: 'Faculty Community', 
      subtitle: 'Connect with peers', 
      icon: Users, 
      path: '/educator/community',
      color: 'bg-purple-50 text-purple-700 border-purple-100'
    },
    { 
      title: 'Analytics', 
      subtitle: 'View insights', 
      icon: Trophy, 
      path: '/educator/profile',
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
          
          <h1 className="font-oswald font-medium text-white text-[70px]">AXORA</h1>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/educator/notifications" 
              className="hidden md:flex w-10 h-10 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Bell size={20} className="text-white" />
            </Link>
            <Link to="/educator/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
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
                <Link key={idx} to="/educator/analytics" className="bg-white rounded p-1.5 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Icon size={13} className="mx-auto mb-0.5 text-[#AC5757]" />
                  <div className="text-sm font-semibold text-gray-900 leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/educator/study')}>
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
        <section className="mb-2 sm:mb-3 bg-gray-100 rounded-2xl p-4">
          <div className="relative overflow-x-auto" style={{ paddingBottom: '10%' }}>
            <div className="flex justify-between w-full">
              <Link to="/educator/study" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <BookOpen size={48} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>COURSES</h4>
              </Link>
              
              <Link to="/educator/challenges" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <UserCheck size={48} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>STUDENTS</h4>
              </Link>
              
              <Link to="/educator/community" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <Users size={48} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>FACULTY</h4>
              </Link>
              
              <Link to="/educator/profile" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <BarChart3 size={48} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>ANALYTICS</h4>
              </Link>

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
