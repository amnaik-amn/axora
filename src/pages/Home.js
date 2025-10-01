import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Trophy, ChevronRight, Star, Flame, BookOpenCheck, Bell } from 'lucide-react';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Home = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  
  // Get user role from localStorage
  // const userRole = localStorage.getItem('userRole') || 'learner'; // Unused variable

  const stats = [
    { label: 'Current streak', value: '7 days', icon: Flame },
    { label: 'XP earned', value: '2,340', icon: Star },
    { label: 'Courses', value: '12', icon: BookOpenCheck },
    { label: 'Rank', value: '#156', icon: Trophy }
  ];

  const conceptData = [
    {
      id: 'ai-generated-design',
      title: 'AI Generated Design',
      author: 'Dr. Sarah Chen',
      description: 'Explore cutting-edge AI tools for architectural design and automated building modeling. Learn how artificial intelligence is revolutionizing the creative process in architecture.',
      rating: 4.8,
      reviews: 127,
      image: '/assets/AI GENERATED DESIGN .png'
    },
    {
      id: 'international-projects',
      title: 'International Projects',
      author: 'Prof. Ahmed Al-Mansouri',
      description: 'Study landmark international architectural projects and understand global design principles. Discover how cultural context influences modern architecture worldwide.',
      rating: 4.6,
      reviews: 89,
      image: '/assets/INTERNATIONAL PROJECTS.png'
    },
    {
      id: 'new-age-building',
      title: 'New Age Building',
      author: 'Architect Maria Rodriguez',
      description: 'Dive into futuristic building technologies and sustainable design innovations. Learn about smart buildings, green architecture, and next-generation construction methods.',
      rating: 4.9,
      reviews: 203,
      image: '/assets/Newbuilding.jpeg'
    }
  ];

  // const quickActions = [ // Unused variable
  //   { 
  //     title: 'Study Resources', 
  //     subtitle: 'Continue learning', 
  //     icon: BookOpen, 
  //     path: '/app/study',
  //     color: 'bg-blue-50 text-blue-700 border-blue-100'
  //   },
  //   { 
  //     title: 'Challenges', 
  //     subtitle: 'Test your skills', 
  //     icon: Trophy, 
  //     path: '/app/challenges',
  //     color: 'bg-amber-50 text-amber-700 border-amber-100'
  //   },
  //   { 
  //     title: 'Community', 
  //     subtitle: 'Connect with peers', 
  //     icon: Users, 
  //     path: '/app/community',
  //     color: 'bg-green-50 text-green-700 border-green-100'
  //   },
  //   { 
  //     title: 'Progress', 
  //     subtitle: 'View your stats', 
  //     icon: BarChart3, 
  //     path: '/app/profile',
  //     color: 'bg-purple-50 text-purple-700 border-purple-100'
  //   }
  // ];

  // const featuredContent = [ // Unused variable
  //   {
  //     title: 'VR Architecture Studio',
  //     subtitle: 'Immersive design experience',
  //     duration: '45 min',
  //     difficulty: 'Intermediate',
  //     image: 'vr-studio'
  //   },
  //   {
  //     title: 'Sustainable Design',
  //     subtitle: 'Environmental architecture',
  //     duration: '30 min', 
  //     difficulty: 'Beginner',
  //     image: 'sustainable'
  //   },
  //   {
  //     title: 'Urban Planning',
  //     subtitle: 'City development basics',
  //     duration: '60 min',
  //     difficulty: 'Advanced',
  //     image: 'urban'
  //   }
  // ];

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
            <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Welcome back, {user?.name || 'Ahmed'}
            </h2>
            <p className="text-gray-600 text-lg font-medium">Your Success Snapshot</p>
          </div>

          {/* Circular Stats Display */}
          <div className="relative mb-8">
            <div className="flex flex-wrap justify-center gap-12">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="relative group">
                    {/* Circular container */}
                    <div 
                      className="w-32 h-32 rounded-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        background: 'radial-gradient(circle, #AC5757 0%, #A85A5A 100%)'
                      }}
                    >
                      <Icon size={32} className="text-white mb-2" />
                      <div className="text-white font-bold text-xl leading-tight">{stat.value}</div>
                      <div className="text-white/80 text-xs leading-tight">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Continue Learning</h3>
          <p className="text-gray-600 text-lg font-medium mb-4">Let's pick up where you left off</p>
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
            <Link to="/app/study" className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-28 h-28 object-contain" />
              </div>
              <h4 className="font-bold text-white text-2xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            
            <Link to="/app/challenges" className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-28 h-28 object-contain" />
              </div>
              <h4 className="font-bold text-white text-2xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            
            <Link to="/app/community" className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-28 h-28 object-contain" />
              </div>
              <h4 className="font-bold text-white text-2xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            
            <Link to="/app/pinup" className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-28 h-28 object-contain" />
              </div>
              <h4 className="font-bold text-white text-2xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            
            <Link to="/app/profile?tab=progress" className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-44 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-28 h-28 object-contain" />
              </div>
              <h4 className="font-bold text-white text-2xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
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
          
          <div className="grid grid-cols-3 gap-4 relative">
            {conceptData.map((concept) => (
              <div 
                key={concept.id}
                className="relative group"
                onMouseEnter={() => setHoveredConcept(concept.id)}
                onMouseLeave={() => setHoveredConcept(null)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200 block">
                  <img src={concept.image} alt={concept.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Clickable overlay for navigation */}
                <Link to={`/app/concepts?concept=${concept.id}`} className="absolute inset-0 z-40"></Link>
                
                {/* Hover Popup */}
                {hoveredConcept === concept.id && (
                  <div className="absolute inset-0 z-30 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-200 pointer-events-none">
                    <div className="flex items-start gap-3">
                      <img src={concept.image} alt={concept.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{concept.title}</h4>
                        <p className="text-sm font-bold text-gray-900 mb-2">{concept.author}</p>
                        <p className="text-sm text-gray-700 mb-3 overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>{concept.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold text-gray-900">{concept.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({concept.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>


      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Home;