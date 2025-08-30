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
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDiscussionModal(true);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  };

  const handleJoinGroup = (groupName) => {
    alert(`Joined ${groupName}!\n\nYou'll receive notifications about upcoming sessions and can access group materials.`);
    setShowGroupModal(false);
  };

  const handleNewDiscussion = () => {
    alert('Create New Discussion\n\nThis would open a form where you can:\n• Choose a topic category\n• Write your question or topic\n• Add tags for better discovery\n• Attach images or files');
  };

  const handleJoinCourseDiscussion = (courseName) => {
    alert(`Joining ${courseName} Discussion\n\nYou can now:\n• View all discussion topics\n• Reply to existing conversations\n• Ask questions to peers and instructors\n• Get notifications about new posts`);
  };

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
              <button 
                onClick={handleNewDiscussion}
                className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
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
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleDiscussionClick(discussion)}
                >
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
              <button 
                onClick={() => alert('Create Study Group\n\nThis would open a form to:\n• Name your study group\n• Set description and goals\n• Choose meeting schedule\n• Invite members')}
                className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
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
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleGroupClick(group)}
                >
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
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinGroup(group.name);
                    }}
                    className="w-full bg-[#AC5757]/10 text-[#AC5757] py-2 rounded-lg font-medium hover:bg-[#AC5757]/20 transition-colors"
                  >
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
                    <button 
                      onClick={() => handleJoinCourseDiscussion(course.courseName)}
                      className="bg-[#AC5757] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8A4A4A] transition-colors"
                    >
                      Join Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Discussion Detail Modal */}
      {showDiscussionModal && selectedDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedDiscussion.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>by {selectedDiscussion.author}</span>
                    <span>•</span>
                    <span>{selectedDiscussion.replies} replies</span>
                    <span>•</span>
                    <span>{selectedDiscussion.lastActive}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDiscussionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    This discussion thread would show the full conversation with all replies, reactions, and the ability to add your own responses.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      alert('Reply added!\n\nYour response has been posted to the discussion.');
                      setShowDiscussionModal(false);
                    }}
                    className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                  >
                    Reply to Discussion
                  </button>
                  <button 
                    onClick={() => alert('Discussion bookmarked!\n\nYou can find it in your saved items.')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Group Detail Modal */}
      {showGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedGroup.name}</h2>
                <button 
                  onClick={() => setShowGroupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{selectedGroup.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Members:</span>
                  <span className="font-medium">{selectedGroup.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Next Session:</span>
                  <span className="font-medium">{selectedGroup.nextSession}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{selectedGroup.category}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleJoinGroup(selectedGroup.name)}
                  className="w-full bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  Join Study Group
                </button>
                <button 
                  onClick={() => setShowGroupModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Community;