import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';
import EducatorMobileNavigation from '../../components/EducatorMobileNavigation';
import { BarChart3, Users, BookOpen, FileText, Clock, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Analytics = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock analytics data
  const stats = [
    {
      title: 'Active Students',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Courses',
      value: '4',
      change: '+1',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Assignments',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Hours This Week',
      value: '18h',
      change: '-2h',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const studentProgress = [
    { name: 'Ahmed Al-Mansouri', course: 'Spatial Reasoning', progress: 85, status: 'Excellent' },
    { name: 'Sarah Johnson', course: 'BIM Applications', progress: 72, status: 'Good' },
    { name: 'Mohammed Hassan', course: 'Sustainability', progress: 91, status: 'Excellent' },
    { name: 'Emily Chen', course: 'Structural Analysis', progress: 68, status: 'Good' },
    { name: 'Omar Khalil', course: 'Geotechnical', progress: 45, status: 'Needs Improvement' },
    { name: 'Lisa Rodriguez', course: 'Facility Management', progress: 78, status: 'Good' }
  ];

  const courseAnalytics = [
    { course: 'Spatial Reasoning Fundamentals', enrolled: 45, completed: 38, avgGrade: 87 },
    { course: 'BIM Applications', enrolled: 32, completed: 28, avgGrade: 82 },
    { course: 'Sustainability & Design', enrolled: 28, completed: 25, avgGrade: 89 },
    { course: 'Structural Analysis', enrolled: 22, completed: 18, avgGrade: 79 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Needs Improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="ANALYTICS"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={false}
        showSearch={false}
        hideMessageIcon={true}
        hideNotificationIcon={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Period Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <div className="flex gap-2">
                {['week', 'month', 'semester'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-[#AC5757] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Progress */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Student Progress Overview</h3>
          <div className="space-y-4">
            {studentProgress.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{student.course}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-2xl font-bold text-gray-900">{student.progress}%</p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Analytics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Enrolled</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Completed</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Grade</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {courseAnalytics.map((course, idx) => {
                  const completionRate = Math.round((course.completed / course.enrolled) * 100);
                  return (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{course.course}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-gray-900">{course.enrolled}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-gray-900">{course.completed}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-semibold ${
                          course.avgGrade >= 85 ? 'text-green-600' :
                          course.avgGrade >= 70 ? 'text-blue-600' :
                          'text-red-600'
                        }`}>
                          {course.avgGrade}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                completionRate >= 80 ? 'bg-green-500' :
                                completionRate >= 60 ? 'bg-blue-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{completionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Navigation Modal */}
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <EducatorMobileNavigation />
    </div>
  );
};

export default Analytics;
