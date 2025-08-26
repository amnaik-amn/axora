import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Star, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';

const Study = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('resources');

  const tabs = [
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'tests', label: 'Tests', icon: CheckCircle },
    { id: 'courses', label: 'Courses', icon: BarChart3 },
  ];

  const resources = [
    {
      title: 'Modern Engineering Systems',
      subtitle: 'Comprehensive guide to contemporary engineering',
      duration: '2h 30m',
      difficulty: 'Intermediate',
      progress: 65,
      category: 'Engineering',
      rating: 4.8
    },
    {
      title: 'Spatial Reasoning Fundamentals',
      subtitle: 'Master 3D thinking and visualization',
      duration: '1h 45m', 
      difficulty: 'Beginner',
      progress: 30,
      category: 'Mathematics',
      rating: 4.9
    },
    {
      title: 'Architecture Design Principles',
      subtitle: 'Learn the basics of architectural design',
      duration: '3h 15m',
      difficulty: 'Advanced',
      progress: 85,
      category: 'Architecture',
      rating: 4.7
    }
  ];

  const tests = [
    {
      title: 'Spatial Reasoning Assessment',
      subtitle: 'Test your 3D visualization skills',
      attempts: 3,
      bestScore: 76,
      maxScore: 100,
      status: 'completed',
      timeLimit: '45 min'
    },
    {
      title: 'NCARB Practice Exam',
      subtitle: 'Architecture licensing preparation',
      attempts: 2,
      bestScore: null,
      status: 'passed',
      timeLimit: '2h 30m'
    },
    {
      title: 'Engineering Fundamentals Quiz',
      subtitle: 'Core engineering concepts',
      attempts: 1,
      bestScore: 92,
      maxScore: 100,
      status: 'completed',
      timeLimit: '30 min'
    }
  ];

  const courses = [
    {
      title: 'Introduction to Sustainability',
      instructor: 'Prof. Hussein',
      progress: 75,
      totalHours: 12,
      completedHours: 9,
      nextDeadline: '3 days',
      category: 'Environmental'
    },
    {
      title: 'BIM Applications: GIS Mapping',
      instructor: 'Dr. Martinez',
      progress: 45,
      totalHours: 8,
      completedHours: 3.6,
      nextDeadline: '1 week',
      category: 'Technology'
    },
    {
      title: 'Structural Engineering Basics',
      instructor: 'Prof. Chen',
      progress: 90,
      totalHours: 16,
      completedHours: 14.4,
      nextDeadline: 'Completed',
      category: 'Engineering'
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

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {resources.map((resource, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="aspect-video bg-brand-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-brand-200 rounded-xl"></div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          resource.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {resource.difficulty}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                          {resource.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.subtitle}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {resource.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          {resource.rating}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{resource.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brand-500 h-2 rounded-full transition-all"
                            style={{ width: `${resource.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessments & Tests</h2>
              <div className="space-y-4">
                {tests.map((test, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${
                            test.status === 'passed' ? 'bg-green-50 text-green-600' :
                            test.status === 'completed' ? 'bg-blue-50 text-blue-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {test.status === 'passed' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{test.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{test.subtitle}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div>
                                <span className="font-medium">Attempts:</span> {test.attempts}
                              </div>
                              <div>
                                <span className="font-medium">Time limit:</span> {test.timeLimit}
                              </div>
                              {test.bestScore && (
                                <div>
                                  <span className="font-medium">Best score:</span> {test.bestScore}
                                  {test.maxScore && `/${test.maxScore}`}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        test.status === 'passed' ? 'bg-green-100 text-green-700' :
                        test.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {test.status === 'passed' ? 'Passed' :
                         test.status === 'completed' ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrolled Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 text-sm">by {course.instructor}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {course.category}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brand-500 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Completed:</span> {course.completedHours}h / {course.totalHours}h
                        </div>
                        <div>
                          <span className="font-medium">Next deadline:</span> {course.nextDeadline}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Study;