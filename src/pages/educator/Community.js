import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { checkAuth } from '../../auth/config';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';

const Community = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log('Searching community for:', searchTerm);
    // In real app, this would filter community content
  };

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
      <PageHeader 
        title="COMMUNITY"
        onMenuClick={() => setIsMenuOpen(true)}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search discussions, groups, courses..." 
            onSearch={handleSearch}
          />
        }
      />
      
      {/* Tab Navigation */}
      <div className="bg-[#AC5757]">
        <div className="flex justify-center">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#AC5757] to-[#8A4A4A] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-bold mb-4">Join the Conversation</h2>
                    <p className="text-xl opacity-90 mb-6">Share ideas, ask questions, and learn from fellow educators in our vibrant community</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>1,247 Active Members</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span>89 Discussions Today</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>12 Hot Topics</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleNewDiscussion}
                    className="bg-white text-[#AC5757] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center gap-3"
                  >
                    <span className="text-2xl">+</span>
                    Start New Discussion
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-[#AC5757] mb-2">85</div>
                <div className="text-sm text-gray-600">Total Discussions</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Hot Topics</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
                <div className="text-sm text-gray-600">New Today</div>
              </div>
            </div>

            {/* Filter and Sort */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">All Discussions</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#AC5757] text-white rounded-lg text-sm font-medium">All</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">Hot</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">Recent</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Replies</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Discussions Grid */}
            <div className="grid gap-6">
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
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#AC5757]/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleDiscussionClick(discussion)}
                >
                  <div className="flex gap-4">
                    {/* Author Section */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#AC5757] to-[#8A4A4A] rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {discussion.author.charAt(0)}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-900 text-xl group-hover:text-[#AC5757] transition-colors">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                🔥 HOT
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className="font-medium text-gray-700">by {discussion.author}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{discussion.lastActive}</span>
                          </div>
                        </div>
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 group-hover:bg-[#AC5757] group-hover:text-white transition-colors">
                          {discussion.category}
                        </span>
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm">💬</span>
                          </div>
                          <span className="font-semibold">{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-sm">👁</span>
                          </div>
                          <span className="font-semibold">{Math.floor(Math.random() * 100) + 50} views</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-sm">❤️</span>
                          </div>
                          <span className="font-semibold">{Math.floor(Math.random() * 20) + 5} likes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 text-sm">🔗</span>
                          </div>
                          <span className="font-semibold">Share</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#AC5757] group-hover:text-white transition-colors">
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-6">
              <button 
                onClick={() => alert('Loading more discussions...\n\nThis would fetch additional discussions from the database.')}
                className="bg-white border-2 border-[#AC5757] text-[#AC5757] px-8 py-4 rounded-2xl font-semibold hover:bg-[#AC5757] hover:text-white transition-all duration-300 text-lg"
              >
                Load More Discussions
              </button>
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'study-groups' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h2>
                  <p className="text-gray-600">Join or create study groups to collaborate with fellow educators</p>
                </div>
                <button 
                  onClick={() => alert('Create Study Group\n\nThis would open a form to:\n• Name your study group\n• Set description and goals\n• Choose meeting schedule\n• Invite members')}
                  className="bg-gradient-to-r from-[#AC5757] to-[#8A4A4A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#8A4A4A] hover:to-[#AC5757] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <span className="text-lg">+</span>
                  Create Group
                </button>
              </div>
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
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Community;