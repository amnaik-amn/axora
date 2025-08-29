import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, BookOpen, Trophy, Users, BarChart3, Play, ChevronRight, Star, Clock, Flame, Award, BookOpenCheck, Target, Bell } from 'lucide-react';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Home = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { label: 'Current streak', value: '7 days', icon: Flame },
    { label: 'XP earned', value: '2,340', icon: Star },
    { label: 'Courses', value: '12', icon: BookOpenCheck },
    { label: 'Rank', value: '#156', icon: Trophy }
  ];

  const quickActions = [
    { 
      title: 'Study Resources', 
      subtitle: 'Continue learning', 
      icon: BookOpen, 
      path: '/app/study',
      color: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    { 
      title: 'Challenges', 
      subtitle: 'Test your skills', 
      icon: Trophy, 
      path: '/app/challenges',
      color: 'bg-amber-50 text-amber-700 border-amber-100'
    },
    { 
      title: 'Community', 
      subtitle: 'Connect with peers', 
      icon: Users, 
      path: '/app/community',
      color: 'bg-green-50 text-green-700 border-green-100'
    },
    { 
      title: 'Progress', 
      subtitle: 'View your stats', 
      icon: BarChart3, 
      path: '/app/profile',
      color: 'bg-purple-50 text-purple-700 border-purple-100'
    }
  ];

  const featuredContent = [
    {
      title: 'VR Architecture Studio',
      subtitle: 'Immersive design experience',
      duration: '45 min',
      difficulty: 'Intermediate',
      image: 'vr-studio'
    },
    {
      title: 'Sustainable Design',
      subtitle: 'Environmental architecture',
      duration: '30 min', 
      difficulty: 'Beginner',
      image: 'sustainable'
    },
    {
      title: 'Urban Planning',
      subtitle: 'City development basics',
      duration: '60 min',
      difficulty: 'Advanced',
      image: 'urban'
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
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome back, {user?.name || 'Ahmed'}
            </h2>
            <p className="text-gray-600 text-xl font-medium">Let's pick up where you left off</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-1 mb-6 max-w-md">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded p-1 text-center">
                  <Icon size={12} className="mx-auto mb-0.5 text-[#AC5757]" />
                  <div className="text-sm font-semibold text-gray-900 leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Spatial Reasoning Fundamentals</h4>
                  <p className="text-gray-600 text-xs mt-1">Progress: 65% complete</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Last studied</div>
                  <div className="text-xs font-medium text-gray-900">2 hours ago</div>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Architecture History Quiz</h4>
                  <p className="text-gray-600 text-xs mt-1">Score: 76/100</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Completed</div>
                  <div className="text-xs font-medium text-gray-900">Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured VR Experience */}
        <section className="mb-12">
          <div className="bg-[#AC5757] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h3 className="font-judson font-bold text-[50px] mb-4 leading-tight">Learn with VR</h3>
              <p className="text-white/80 mb-6 text-lg">
                Explore in immersive 3D
              </p>
              <button 
                onClick={() => navigate('/app/study')}
                className="bg-white text-[#AC5757] px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Play size={20} />
                Launch
              </button>
            </div>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-white/10 rounded-2xl"></div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-6 min-w-max">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  to={action.path}
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex-shrink-0 w-64"
                >
                  <div className={`inline-flex p-3 rounded-xl ${action.color} mb-4`}>
                    <action.icon size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                  <p className="text-gray-600 text-sm">{action.subtitle}</p>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 mt-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Explore Concepts</h3>
            <Link 
              to="/app/study" 
              className="text-[#AC5757] font-semibold hover:text-[#8A4A4A] transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-7 min-w-max">
              {featuredContent.map((content, idx) => (
                <Link
                  key={idx}
                  to="/app/study"
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-80"
                >
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 bg-[#AC5757]/10 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#AC5757]/30 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="p-7">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#AC5757] transition-colors text-lg">
                      {content.title}
                    </h4>
                    <p className="text-gray-600 text-base mb-5">{content.subtitle}</p>
                    <div className="flex items-center gap-5 text-base text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {content.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star size={16} />
                        4.8
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Action Cards Row */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Search Card */}
            <div className="bg-[#AC5757] rounded-xl p-6 relative overflow-hidden h-40 flex items-center">
              <div className="relative z-10 flex-1">
                <h3 className="text-white text-2xl font-bold mb-3">
                  Looking for New Jobs?
                </h3>
                <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Search Job
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                <div className="text-white text-7xl">🤝</div>
              </div>
            </div>

            {/* Events Card */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 relative overflow-hidden h-40 flex items-center">
              <div className="relative z-10 flex-1">
                <h3 className="text-gray-900 text-2xl font-bold mb-3">
                  Stay Connected in Bahrain
                </h3>
                <button className="bg-[#AC5757] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors text-sm">
                  Search Events
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                <div className="text-gray-500 text-7xl">👥</div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Home;