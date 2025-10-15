import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, BarChart3, ChevronRight, Clock, BookOpenCheck, UserCheck, FileText, Bell, User } from 'lucide-react';
import { checkAuth } from '../../auth/config';
import NavigationCarousel from '../../components/NavigationCarousel';

const EducatorHome = () => {
  const user = checkAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle navigation carousel clicks
  const handleNavigationClick = (item) => {
    if (item.path === '/educator-login') {
      localStorage.removeItem('educatorUser');
      localStorage.removeItem('educatorOnboardingComplete');
      navigate('/educator-login');
    } else {
      navigate(item.path);
    }
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Get educator role from localStorage
  const educatorRole = localStorage.getItem('educatorRole') || 'Professor';


  // Mock weekly schedule data
  const weeklySchedule = [
    { 
      date: new Date(2024, 10, 18), 
      day: 'Mon', 
      activities: [
        { time: '9:00 AM', title: 'Advanced Structural Analysis' },
        { time: '2:00 PM', title: 'Office Hours' }
      ]
    },
    { 
      date: new Date(2024, 10, 19), 
      day: 'Tue', 
      activities: [
        { time: '10:00 AM', title: 'Faculty Meeting' },
        { time: '3:00 PM', title: 'Student Presentations' }
      ]
    },
    { 
      date: new Date(2024, 10, 20), 
      day: 'Wed', 
      activities: [
        { time: '9:00 AM', title: 'Geotechnical Engineering' },
        { time: '1:00 PM', title: 'Research Review' }
      ]
    },
    { 
      date: new Date(2024, 10, 21), 
      day: 'Thu', 
      activities: [
        { time: '11:00 AM', title: 'Foundation Design Forum' },
        { time: '4:00 PM', title: 'Course Planning' }
      ]
    },
    { 
      date: new Date(2024, 10, 22), 
      day: 'Fri', 
      activities: [
        { time: '10:00 AM', title: 'Transportation Systems Quiz' },
        { time: '2:00 PM', title: 'Grading Session' }
      ]
    },
    { 
      date: new Date(2024, 10, 23), 
      day: 'Sat', 
      activities: []
    },
    { 
      date: new Date(2024, 10, 24), 
      day: 'Sun', 
      activities: []
    }
  ];

  // Stacked cards functionality
  useEffect(() => {
    const deck = document.getElementById('deck');
    if (!deck) return;

    const cards = [...deck.querySelectorAll('.card')];

    // Initialize card positions
    function initializeCards() {
      const deckWidth = deck.getBoundingClientRect().width;
      const cardWidth = 270; // Fixed width from CSS (300 - 10% = 270)
      const stackOffset = 96; // Offset between cards (80 + 20% = 96)
      
      // Calculate total width of the entire stack
      const totalStackWidth = (cards.length - 1) * stackOffset + cardWidth;
      
      // Ensure the entire stack fits within the viewport
      const maxAllowedWidth = deckWidth - 40; // Leave 20px margin on each side
      
      // If stack is too wide, reduce the offset
      let adjustedStackOffset = stackOffset;
      if (totalStackWidth > maxAllowedWidth) {
        adjustedStackOffset = (maxAllowedWidth - cardWidth) / (cards.length - 1);
      }
      
      // Recalculate total width with adjusted offset
      const adjustedTotalWidth = (cards.length - 1) * adjustedStackOffset + cardWidth;
      
      // Calculate initial offset to center the stack
      const initialXOffset = (deckWidth - adjustedTotalWidth) / 2;
      
        cards.forEach((card, index) => {
          // Set initial z-index (chronological order: Monday 18th at bottom, Tuesday 19th above it, etc.)
          card.style.zIndex = cards.length - index;
        
        // Set initial transform with centering
        if (index === 0) {
          card.style.transform = `translateX(${initialXOffset}px) translateY(0px)`;
          card.classList.add('active');
          card.classList.remove('min');
        } else {
          // Stack cards to the right with centering
          const offsetX = initialXOffset + (index * adjustedStackOffset);
          card.style.transform = `translateX(${offsetX}px) translateY(0px)`;
          card.classList.remove('active');
          card.classList.add('min');
          
          // Add position classes for overlay positioning
          if (index < 0) {
            card.classList.add('card-left');
            card.classList.remove('card-right');
          } else {
            card.classList.add('card-right');
            card.classList.remove('card-left');
          }
        }
      });
    }

    // Bring clicked card to front
    function bringToFront(clickedIndex) {
      const deckWidth = deck.getBoundingClientRect().width;
      const cardWidth = 270; // Fixed width from CSS (300 - 10% = 270)
      const stackOffset = 96; // Offset between cards (80 + 20% = 96)
      
      // Calculate total width of the entire stack
      const totalStackWidth = (cards.length - 1) * stackOffset + cardWidth;
      
      // Ensure the entire stack fits within the viewport
      const maxAllowedWidth = deckWidth - 40; // Leave 20px margin on each side
      
      // If stack is too wide, reduce the offset
      let adjustedStackOffset = stackOffset;
      if (totalStackWidth > maxAllowedWidth) {
        adjustedStackOffset = (maxAllowedWidth - cardWidth) / (cards.length - 1);
      }
      
      // Recalculate total width with adjusted offset
      const adjustedTotalWidth = (cards.length - 1) * adjustedStackOffset + cardWidth;
      
      // Calculate initial offset to center the stack
      const initialXOffset = (deckWidth - adjustedTotalWidth) / 2;
      
        cards.forEach((card, index) => {
          if (index === clickedIndex) {
            // Bring to front but keep original position
            card.style.zIndex = cards.length + 1;
            card.classList.add('active');
            card.classList.remove('min');
          } else {
            // Keep other cards in their original positions
            const offsetX = initialXOffset + (index * adjustedStackOffset);
            card.style.zIndex = cards.length - index;
            card.style.transform = `translateX(${offsetX}px) translateY(0px)`;
            card.classList.remove('active');
            card.classList.add('min');
          
          // Add position classes for overlay positioning
          if (index < clickedIndex) {
            card.classList.add('card-left');
            card.classList.remove('card-right');
          } else {
            card.classList.add('card-right');
            card.classList.remove('card-left');
          }
        }
      });
    }

    // Add click handlers
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        bringToFront(index);
      });
      
      // Add keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bringToFront(index);
        }
      });
      
      card.tabIndex = 0;
    });

    // Initialize on load
    initializeCards();

    // Handle window resize
    const handleResize = () => {
      initializeCards();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const stats = [
    { label: 'Active Students', value: '127', icon: Users },
    { label: 'Courses', value: '4', icon: BookOpenCheck },
    { label: 'Assignments', value: '12', icon: FileText },
    { label: 'This Week', value: '18h', icon: Clock }
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
      {/* Fixed Navigation Overlay - Extends to Top */}
      <div className="fixed top-0 left-0 z-50" style={{ zIndex: 60 }}>
        <NavigationCarousel
          menuItems={[
            { label: 'HOME', path: '/educator' },
            { label: 'COURSES', path: '/educator/study' },
            { label: 'STUDENTS', path: '/educator/challenges' },
            { label: 'FACULTY', path: '/educator/community' },
            { label: 'ANALYTICS', path: '/educator/analytics' },
            { label: 'MESSAGES', path: '/educator/messages' },
            { label: 'SUPPORT', path: '/educator/support' },
            { label: 'PROFILE', path: '/educator/profile' },
            { label: 'LOG OUT', path: '/educator-login', isLogout: true }
          ]}
          onItemClick={handleNavigationClick}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Sidebar Toggle Button */}
      <div className="fixed top-40 z-50" style={{ zIndex: 70, left: '100px' }}>
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-2 transition-colors duration-200 shadow-lg"
          style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isSidebarCollapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Educator Dashboard Header */}
      <div className="bg-[#AC5757] rounded-l-lg" style={{ 
        marginLeft: isSidebarCollapsed ? '90px' : `calc(14vw + 10px)`,
        transition: 'margin-left 0.3s ease'
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex-1">
            <h1 className="font-oswald font-medium text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[55px]">
              Educator Dashboard
            </h1>
            <p className="text-white/80 text-sm mt-1">Manage your courses, students, and teaching resources</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notification Icon */}
            <Link 
              to="/educator/notifications" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Bell size={24} className="text-white" />
            </Link>
            
            {/* Profile */}
            <Link 
              to="/educator/profile" 
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User size={20} className="text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8" style={{ 
        marginLeft: isSidebarCollapsed ? '90px' : '14vw',
        transition: 'margin-left 0.3s ease'
      }}>
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

        {/* Weekly Calendar */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">This Week</h3>
          
          {/* Cards Container */}
          <div className="deck" id="deck" aria-live="polite">
            {weeklySchedule.map((dayData, idx) => (
              <article 
                key={idx} 
                className="card"
                id={`card-${idx}`}
              >
                <div className="card__inner">
                  <header>
                    <div className="day">{dayData.day}</div>
                    <div className="h2">{dayData.date.getDate()}</div>
                  </header>

                  {/* Activities list - only show for active card */}
                  <div className="activities">
                    {dayData.activities.length > 0 ? (
                      <div className="activity-list">
                        {dayData.activities.map((activity, activityIdx) => (
                          <div key={activityIdx} className="activity-item">
                            <div className="activity-time">{activity.time}</div>
                            <div className="activity-title">{activity.title}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-activities">No activities scheduled</div>
                    )}
                  </div>
                </div>
                
                {/* Overlay for inactive cards showing day and date */}
                <div className="card__overlay" data-card-index={idx}>
                  <div className="overlay__day">{dayData.day}</div>
                  <div className="overlay__date">{dayData.date.getDate()}</div>
                </div>
                <div className="card__border"></div>
              </article>
            ))}
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
                  <BookOpen size={70} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>COURSES</h4>
              </Link>
              
              <Link to="/educator/challenges" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <UserCheck size={70} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>STUDENTS</h4>
              </Link>
              
              <Link to="/educator/community" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <Users size={70} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>FACULTY</h4>
              </Link>
              
              <Link to="/educator/profile" className="rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-36 sm:w-44 lg:w-56 flex flex-col justify-end" style={{ backgroundColor: '#9d0a06' }}>
                <div className="aspect-square rounded-xl overflow-hidden scale-117 flex items-center justify-center mb-2">
                  <BarChart3 size={70} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>ANALYTICS</h4>
              </Link>
              
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EducatorHome;

