import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Users, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';

const Community = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('discussions');

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'study-groups', label: 'Study Groups', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
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
      <header className="bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-16">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-brand-500">AXORA</h1>
          <Link to="/app/profile" className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors">
            <span className="text-brand-600 font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
              <button className="bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors">
                New Discussion
              </button>
            </div>
            
            <div className="space-y-4">
              {discussions.map((discussion, idx) => (
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
              <button className="bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors">
                Create Group
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyGroups.map((group, idx) => (
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
              {courseDiscussions.map((course, idx) => (
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
                    <button className="bg-brand-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-600 transition-colors">
                      Join Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;