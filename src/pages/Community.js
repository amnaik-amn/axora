import React, { useState } from 'react';
import { Users, GraduationCap, MessageCircle, Pin, Star, BookOpen, Globe } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const tabs = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'public', label: 'Public', icon: Globe },
  ];

  const professors = [
    { name: 'Dr. Sarah Smith', course: 'Machine Learning', students: 156, rating: 4.8 },
    { name: 'Prof. John Davis', course: 'Data Structures', students: 234, rating: 4.9 },
    { name: 'Dr. Emily Chen', course: 'Web Development', students: 189, rating: 4.7 },
    { name: 'Prof. Michael Brown', course: 'Algorithms', students: 167, rating: 4.6 },
  ];

  const students = [
    { name: 'Alex Johnson', program: 'Computer Science', year: 3, xp: 2340 },
    { name: 'Maria Garcia', program: 'Data Science', year: 2, xp: 1890 },
    { name: 'James Wilson', program: 'Software Engineering', year: 4, xp: 3120 },
    { name: 'Lisa Anderson', program: 'Computer Science', year: 2, xp: 1560 },
  ];

  const groups = [
    { name: 'AI Study Group', members: 45, category: 'Academic', active: true },
    { name: 'Web Dev Enthusiasts', members: 78, category: 'Technology', active: true },
    { name: 'Hackathon Team 2024', members: 12, category: 'Competition', active: false },
    { name: 'Research Paper Club', members: 23, category: 'Research', active: true },
  ];

  const pinnedPosts = [
    { 
      title: 'New Machine Learning Course Materials',
      author: 'Dr. Sarah Smith',
      type: 'Resource',
      likes: 234,
      comments: 45
    },
    { 
      title: 'Study Tips for Finals Week',
      author: 'Student Council',
      type: 'Guide',
      likes: 567,
      comments: 89
    },
    { 
      title: 'Upcoming Hackathon Registration',
      author: 'Tech Club',
      type: 'Event',
      likes: 342,
      comments: 67
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-ink font-bold mb-2">Community</h1>
          <p className="text-gray-600">Connect with professors, students, and study groups</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-brand border-b-2 border-brand'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Professors Section */}
            <div className="mb-8">
              <h2 className="font-serif text-xl text-ink font-bold mb-4 flex items-center gap-2">
                <GraduationCap size={24} />
                Professors
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {professors.map((prof, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="text-brand" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink">{prof.name}</h3>
                        <p className="text-sm text-gray-600">{prof.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500" size={14} fill="currentColor" />
                            <span className="text-xs text-gray-600">{prof.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">• {prof.students} students</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-brand hover:bg-brand/10 p-2 rounded-lg transition-colors">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div>
              <h2 className="font-serif text-xl text-ink font-bold mb-4 flex items-center gap-2">
                <Users size={24} />
                Top Students
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {students.map((student, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-700 font-bold">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.program} • Year {student.year}</p>
                        <div className="text-xs text-brand font-medium mt-1">{student.xp} XP</div>
                      </div>
                    </div>
                    <button className="text-brand hover:bg-brand/10 p-2 rounded-lg transition-colors">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                      <Users className="text-brand" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.category}</p>
                    </div>
                  </div>
                  {group.active && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">{group.members} members</span>
                  <button className="text-brand text-sm hover:underline">Join Group</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Public Tab */}
        {activeTab === 'public' && (
          <div>
            {/* Pin-Up Board */}
            <div className="mb-6">
              <h2 className="font-serif text-xl text-ink font-bold mb-4 flex items-center gap-2">
                <Pin size={24} />
                Pin-Up Board
              </h2>
              <div className="space-y-4">
                {pinnedPosts.map((post, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-brand/10 text-brand px-2 py-1 rounded text-xs font-medium">
                            {post.type}
                          </span>
                          <span className="text-sm text-gray-500">by {post.author}</span>
                        </div>
                        <h3 className="font-semibold text-ink text-lg">{post.title}</h3>
                      </div>
                      <Pin className="text-brand" size={20} />
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star size={16} /> {post.likes} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} /> {post.comments} comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Forums */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-serif text-xl text-ink font-bold mb-3">Join the Discussion</h3>
              <p className="text-gray-600 mb-4">
                Connect with learners worldwide, share resources, and get help from the community.
              </p>
              <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors">
                Browse Forums
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;