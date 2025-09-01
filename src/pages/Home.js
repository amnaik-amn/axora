import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, BookOpen, Trophy, Users, BarChart3, Play, ChevronRight, Star, Clock, Flame, Award, BookOpenCheck, Target, Bell } from 'lucide-react';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Home = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole') || 'learner';

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
            <Link to="/app/study" className="p-4 hover:bg-gray-50 transition-colors cursor-pointer block">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Spatial Reasoning Fundamentals</h4>
                  <p className="text-gray-600 text-xs mt-1">Progress: 65% complete</p>
                  <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-[#AC5757] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Last studied</div>
                  <div className="text-xs font-medium text-gray-900">2 hours ago</div>
                  <ChevronRight size={16} className="text-gray-400 mt-1" />
                </div>
              </div>
            </Link>
            <Link to="/app/study?tab=tests" className="p-4 hover:bg-gray-50 transition-colors cursor-pointer block">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Architecture History Quiz</h4>
                  <p className="text-gray-600 text-xs mt-1">Score: 76/100</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <Star size={12} className="text-gray-300" />
                    <Star size={12} className="text-gray-300" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Completed</div>
                  <div className="text-xs font-medium text-gray-900">Yesterday</div>
                  <ChevronRight size={16} className="text-gray-400 mt-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured VR Experience */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-2xl p-0 relative overflow-hidden h-80">
            <img 
              src="/assets/VRicon.jpg" 
              alt="VR Learning"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div></div>
              <div className="max-w-lg">
                <h3 className="font-judson font-bold text-white text-[32px] mb-2 leading-tight">LEARN</h3>
                <h3 className="font-judson font-bold text-white text-[32px] mb-2 leading-tight">WITH</h3>
                <h3 className="font-judson font-bold text-white text-[32px] mb-4 leading-tight">VR</h3>
                <p className="text-white/90 mb-6 text-sm">
                  Explore in immersive 3D
                </p>
                <button 
                  onClick={() => navigate('/app/vr')}
                  className="bg-[#AC5757] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            <Link to="/app/study" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-115">
                <img src="/assets/STUDY ICON.png" alt="Study" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">STUDY</h4>
            </Link>
            
            <Link to="/app/challenges" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-115">
                <img src="/assets/CHALLENGES ICON.png" alt="Challenges" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">CHALLENGES</h4>
            </Link>
            
            <Link to="/app/community" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-115">
                <img src="/assets/COMMUNITY ICON.png" alt="Community" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">COMMUNITY</h4>
            </Link>
            
            <Link to="/app/study" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-115">
                <img src="/assets/PINUP ICON .png" alt="Pin Up" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">PIN UP</h4>
            </Link>
            
            <Link to="/app/profile" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44">
              <div className="aspect-square mb-4 rounded-xl overflow-hidden scale-115">
                <img src="/assets/PROGRESS ICON.png" alt="Progress" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-xl text-center">PROGRESS</h4>
            </Link>
          </div>
        </section>

        {/* Explore Concepts */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">EXPLORE CONCEPTS</h3>
            <Link 
              to="/app/concepts" 
              className="text-[#AC5757] font-semibold hover:text-[#8A4A4A] transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Link to="/app/concepts" className="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200">
              <img src="/assets/AI GENERATED DESIGN .png" alt="AI Generated Design" className="w-full h-full object-cover" />
            </Link>
            
            <Link to="/app/concepts" className="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200">
              <img src="/assets/INTERNATIONAL PROJECTS.png" alt="International Projects" className="w-full h-full object-cover" />
            </Link>
            
            <Link to="/app/concepts" className="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200">
              <img src="/assets/NEW AGE BUILDING.png" alt="New Age Building" className="w-full h-full object-cover" />
            </Link>
          </div>
        </section>

        {/* Action Cards Row */}
        <section className="mb-8">
          {/* Job Search Card */}
          <div className="bg-[#9E3939] rounded-2xl relative overflow-hidden mb-4 h-32">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 p-6 z-10">
                <h3 className="text-white text-xl font-bold mb-3">
                  Looking<br />for New Jobs?
                </h3>
                <button 
                  onClick={() => window.open('https://linkedin.com/jobs', '_blank')}
                  className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Search Job
                </button>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-40">
                <img src="/assets/FIND JOB.png" alt="Find Job" className="w-full h-full object-cover rounded-r-2xl" />
              </div>
            </div>
          </div>

          {/* Events Card */}
          <div className="bg-gray-200 rounded-2xl relative overflow-hidden h-32">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 p-6 z-10">
                <h3 className="text-gray-900 text-xl font-bold mb-3">
                  Stay Connected<br />in Bahrain
                </h3>
                <button 
                  onClick={() => window.open('https://eventbrite.com/d/bahrain/events/', '_blank')}
                  className="bg-[#AC5757] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors text-sm"
                >
                  Search Events
                </button>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-40">
                <img src="/assets/CONNECTING .png" alt="Connecting" className="w-full h-full object-cover rounded-r-2xl" />
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