import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, BookOpen, Trophy, Users, BarChart3, Play, ChevronRight, Star, Clock, Flame, Award, BookOpenCheck, Target } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          
          <h1 className="text-xl font-bold text-brand-500">AXORA</h1>
          
          <Link to="/app/profile" className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors">
            <span className="text-brand-600 font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Good morning, {user?.name || 'Ahmed'}
            </h2>
            <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-1 mb-8 max-w-md">
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

        {/* Featured VR Experience */}
        <section className="mb-12">
          <div className="bg-brand-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-3xl font-bold mb-4">Experience Learning in VR</h3>
              <p className="text-brand-100 mb-6 text-lg">
                Step into immersive architectural environments and learn through interactive experiences.
              </p>
              <button 
                onClick={() => navigate('/app/study')}
                className="bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-brand-50 transition-colors"
              >
                <Play size={20} />
                Launch VR Studio
              </button>
            </div>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-white/10 rounded-2xl"></div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.path}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
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
        </section>

        {/* Featured Content */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Explore Concepts</h3>
            <Link 
              to="/app/study" 
              className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContent.map((content, idx) => (
              <Link
                key={idx}
                to="/app/study"
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 bg-brand-50 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-200 rounded-xl"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      content.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {content.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {content.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{content.subtitle}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {content.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      4.8
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Spatial Reasoning Fundamentals</h4>
                  <p className="text-gray-600 text-sm mt-1">Progress: 65% complete</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Last studied</div>
                  <div className="text-sm font-medium text-gray-900">2 hours ago</div>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Architecture History Quiz</h4>
                  <p className="text-gray-600 text-sm mt-1">Score: 76/100</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-sm font-medium text-gray-900">Yesterday</div>
                </div>
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