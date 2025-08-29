import React, { useState } from 'react';
import { Menu, MessageCircle, Users, BookOpen, Search, Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Community = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'discussions', label: 'DISCUSSIONS' },
    { id: 'study-groups', label: 'STUDY GROUPS' },
    { id: 'courses', label: 'COURSES' },
  ];

  const discussions = [
    {
      title: 'Best practices for sustainable architecture design?',
      author: 'Sarah Chen',
      replies: 24,
      lastActive: '2 hours ago',
      category: 'Architecture',
      isHot: true
    },
    {
      title: 'Anyone working on the Green Tech Park challenge?',
      author: 'Mike Rodriguez',
      replies: 18,
      lastActive: '4 hours ago',
      category: 'Challenges',
      isHot: false
    },
    {
      title: 'VR tools for architectural visualization',
      author: 'Emily Johnson',
      replies: 31,
      lastActive: '1 day ago',
      category: 'Technology',
      isHot: true
    },
    {
      title: 'Study group for NCARB exam prep',
      author: 'David Park',
      replies: 12,
      lastActive: '2 days ago',
      category: 'Study Groups',
      isHot: false
    }
  ];

  const studyGroups = [
    {
      name: 'Architecture Fundamentals',
      members: 45,
      description: 'Learn the basics of architectural design and theory',
      nextSession: 'Tomorrow 2:00 PM',
      category: 'Architecture'
    },
    {
      name: 'Sustainable Design Circle',
      members: 28,
      description: 'Explore eco-friendly building practices and green technologies',
      nextSession: 'Friday 4:00 PM',
      category: 'Sustainability'
    },
    {
      name: 'VR Design Lab',
      members: 32,
      description: 'Experiment with virtual reality in architectural design',
      nextSession: 'Next Monday 10:00 AM',
      category: 'Technology'
    }
  ];

  const courseDiscussions = [
    {
      courseName: 'Introduction to Sustainability',
      instructor: 'Prof. Hussein',
      activeTopics: 8,
      participants: 67,
      lastPost: '30 minutes ago'
    },
    {
      courseName: 'Spatial Reasoning Fundamentals',
      instructor: 'Dr. Martinez',
      activeTopics: 12,
      participants: 54,
      lastPost: '1 hour ago'
    },
    {
      courseName: 'BIM Applications: GIS Mapping',
      instructor: 'Prof. Chen',
      activeTopics: 6,
      participants: 38,
      lastPost: '3 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[38px]">COMMUNITY</h1>
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
        
        {/* Tab Navigation */}
        <div className="flex justify-center bg-[#AC5757]">
          <div className="flex w-full max-w-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-50 text-gray-900'
                    : 'bg-[#AC5757] text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'discussions' ? 'discussions' : activeTab === 'study-groups' ? 'study groups' : 'courses'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
              <button className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors">
                New Discussion
              </button>
            </div>
            
            <div className="space-y-4">
              {discussions
                .filter(discussion => 
                  searchQuery === '' || 
                  discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((discussion, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-brand-600 transition-colors">
                          {discussion.title}
                        </h3>
                        {discussion.isHot && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            🔥 Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.replies} replies</span>
                        <span>•</span>
                        <span>{discussion.lastActive}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {discussion.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'study-groups' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Study Groups</h2>
              <button className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors">
                Create Group
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyGroups
                .filter(group => 
                  searchQuery === '' || 
                  group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((group, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {group.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {group.members} members
                    </div>
                    <div>Next: {group.nextSession}</div>
                  </div>
                  
                  <button className="w-full bg-brand-50 text-brand-600 py-2 rounded-lg font-medium hover:bg-brand-100 transition-colors">
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Discussions Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Course Discussions</h2>
            
            <div className="space-y-4">
              {courseDiscussions
                .filter(course => 
                  searchQuery === '' || 
                  course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((course, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.courseName}</h3>
                      <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{course.activeTopics}</span> active topics
                        </div>
                        <div>
                          <span className="font-medium">{course.participants}</span> participants
                        </div>
                        <div>Last post: {course.lastPost}</div>
                      </div>
                    </div>
                    <button className="bg-[#AC5757] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8A4A4A] transition-colors">
                      Join Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Community;