import React, { useState } from 'react';
import { BookOpen, FileText, GraduationCap, Sparkles, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Study = () => {
  const [activeTab, setActiveTab] = useState('resources');

  const tabs = [
    { id: 'resources', label: 'Resources' },
    { id: 'tests', label: 'Tests' },
    { id: 'courses', label: 'Courses' },
  ];

  const resources = [
    { 
      title: 'Introduction to Algorithms',
      type: 'Book',
      progress: 45,
      status: 'continue',
      aiTailored: true
    },
    { 
      title: 'Data Science Fundamentals',
      type: 'PDF',
      progress: 0,
      status: 'assigned',
      aiTailored: false
    },
    { 
      title: 'Machine Learning Handbook',
      type: 'Interactive',
      progress: 78,
      status: 'continue',
      aiTailored: true
    },
    { 
      title: 'Web Development Guide',
      type: 'Video Series',
      progress: 100,
      status: 'completed',
      aiTailored: false
    },
  ];

  const tests = [
    {
      title: 'Midterm: Data Structures',
      attempts: 2,
      bestScore: 85,
      status: 'passed',
      deadline: 'Dec 20, 2024'
    },
    {
      title: 'Quiz: Python Basics',
      attempts: 1,
      bestScore: 92,
      status: 'passed',
      deadline: 'Dec 15, 2024'
    },
    {
      title: 'Final: Algorithms',
      attempts: 0,
      bestScore: null,
      status: 'pending',
      deadline: 'Dec 25, 2024'
    },
  ];

  const courses = [
    {
      title: 'CS101: Introduction to Computer Science',
      professor: 'Dr. Smith',
      assignedBy: 'professor',
      progress: 65
    },
    {
      title: 'Advanced Machine Learning',
      professor: 'AI Recommended',
      assignedBy: 'ai',
      progress: 30
    },
    {
      title: 'Web Development Bootcamp',
      professor: 'Prof. Johnson',
      assignedBy: 'professor',
      progress: 80
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'continue': return 'text-blue-600 bg-blue-50';
      case 'assigned': return 'text-orange-600 bg-orange-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-ink font-bold mb-6">Study Hub</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-brand border-b-2 border-brand'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <BookOpen className="text-brand" size={24} />
                  {resource.aiTailored && (
                    <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Sparkles size={12} />
                      AI-Tailored
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-ink mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.type}</p>
                
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand h-2 rounded-full transition-all"
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{resource.progress}% complete</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            {tests.map((test, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="text-brand" size={20} />
                      <h3 className="font-semibold text-ink">{test.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-600">Due: {test.deadline}</span>
                      </div>
                      <div className="text-gray-600">
                        Attempts: {test.attempts}
                      </div>
                      {test.bestScore && (
                        <div className="text-gray-600">
                          Best Score: {test.bestScore}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    {test.status === 'passed' ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">Passed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle size={20} />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <GraduationCap className="text-brand" size={24} />
                  {course.assignedBy === 'ai' && (
                    <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Sparkles size={12} />
                      AI-Assigned
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-ink mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.professor}</p>
                
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{course.progress}% complete</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Study;