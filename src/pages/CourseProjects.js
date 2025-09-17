import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus, 
  Filter, 
  Heart, 
  ChevronDown,
  Calendar,
  User,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const CourseProjects = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Mock data for course projects
  const courseProjects = [
    {
      id: 1,
      courseTitle: 'INTRO TO SPATIAL REASONING',
      courseCode: 'SR',
      progress: 25, // 3/12 weeks
      totalWeeks: 12,
      completedWeeks: 3,
      projects: [
        {
          id: 1,
          title: '3D Spatial Analysis',
          description: 'Analyze spatial relationships in architectural design',
          dueDate: '2024-02-15',
          status: 'completed',
          grade: 'A',
          type: 'Assignment'
        },
        {
          id: 2,
          title: 'Perspective Drawing Exercise',
          description: 'Master one-point and two-point perspective techniques',
          dueDate: '2024-02-22',
          status: 'in-progress',
          grade: null,
          type: 'Project'
        },
        {
          id: 3,
          title: 'Final Portfolio Submission',
          description: 'Comprehensive portfolio of spatial reasoning work',
          dueDate: '2024-03-01',
          status: 'upcoming',
          grade: null,
          type: 'Portfolio'
        }
      ]
    },
    {
      id: 2,
      courseTitle: 'BIM APPLI.: GIS MAPPING',
      courseCode: 'BIM',
      progress: 50, // 7/14 weeks
      totalWeeks: 14,
      completedWeeks: 7,
      projects: [
        {
          id: 4,
          title: 'GIS Data Integration',
          description: 'Integrate GIS data with BIM models',
          dueDate: '2024-02-10',
          status: 'completed',
          grade: 'B+',
          type: 'Assignment'
        },
        {
          id: 5,
          title: '3D City Modeling',
          description: 'Create detailed 3D city models using BIM tools',
          dueDate: '2024-02-28',
          status: 'in-progress',
          grade: null,
          type: 'Project'
        }
      ]
    },
    {
      id: 3,
      courseTitle: 'INTRO TO SUSTAINABILITY & DESIGN',
      courseCode: 'SD',
      progress: 23, // 3/13 weeks
      totalWeeks: 13,
      completedWeeks: 3,
      projects: [
        {
          id: 6,
          title: 'LEED Certification Analysis',
          description: 'Analyze building designs for LEED certification',
          dueDate: '2024-02-20',
          status: 'completed',
          grade: 'A-',
          type: 'Assignment'
        },
        {
          id: 7,
          title: 'Sustainable Design Proposal',
          description: 'Develop comprehensive sustainable design proposal',
          dueDate: '2024-03-05',
          status: 'upcoming',
          grade: null,
          type: 'Project'
        }
      ]
    },
    {
      id: 4,
      courseTitle: 'WHAT HAPPENS AFTER CONSTRUCTION? ENG334',
      courseCode: 'WC',
      progress: 25, // 4/16 weeks
      totalWeeks: 16,
      completedWeeks: 4,
      projects: [
        {
          id: 8,
          title: 'Facility Management Plan',
          description: 'Develop comprehensive facility management strategy',
          dueDate: '2024-03-10',
          status: 'upcoming',
          grade: null,
          type: 'Project'
        }
      ]
    },
    {
      id: 5,
      courseTitle: 'STRUCTURES I-III',
      courseCode: 'ST',
      progress: 83, // 15/18 weeks
      totalWeeks: 18,
      completedWeeks: 15,
      projects: [
        {
          id: 9,
          title: 'Structural Analysis Report',
          description: 'Comprehensive structural analysis of complex building',
          dueDate: '2024-02-05',
          status: 'completed',
          grade: 'A',
          type: 'Project'
        },
        {
          id: 10,
          title: 'Final Design Review',
          description: 'Present final structural design for review',
          dueDate: '2024-02-25',
          status: 'in-progress',
          grade: null,
          type: 'Presentation'
        }
      ]
    },
    {
      id: 6,
      courseTitle: 'FOUNDATIONS OF GEOTECHNICAL ENGINEE-',
      courseCode: 'GE',
      progress: 20, // 3/15 weeks
      totalWeeks: 15,
      completedWeeks: 3,
      projects: [
        {
          id: 11,
          title: 'Soil Analysis Lab',
          description: 'Conduct comprehensive soil analysis and testing',
          dueDate: '2024-03-15',
          status: 'upcoming',
          grade: null,
          type: 'Lab Report'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Courses', count: courseProjects.length },
    { id: 'in-progress', label: 'In Progress', count: courseProjects.filter(c => c.progress > 0 && c.progress < 100).length },
    { id: 'completed', label: 'Completed', count: courseProjects.filter(c => c.progress === 100).length },
    { id: 'upcoming', label: 'Upcoming', count: courseProjects.filter(c => c.progress === 0).length }
  ];

  const filteredProjects = courseProjects.filter(course => {
    const matchesCategory = activeFilter === 'all' || 
      (activeFilter === 'in-progress' && course.progress > 0 && course.progress < 100) ||
      (activeFilter === 'completed' && course.progress === 100) ||
      (activeFilter === 'upcoming' && course.progress === 0);
    
    const matchesSearch = course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.projects.some(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 60) return 'from-blue-400 to-blue-600';
    if (progress >= 40) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="COURSE PROJECTS"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={false}
        hideNotificationIcon={false}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search courses, projects..." 
            onSearch={handleSearch}
          />
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Projects</h1>
            <p className="text-gray-600">Track your academic progress and project submissions</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Filter size={16} />
                {categories.find(cat => cat.id === activeFilter)?.label || 'All Courses'}
                <ChevronDown size={16} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveFilter(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        activeFilter === category.id
                          ? 'bg-[#AC5757] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => alert('Create new project...\n\nThis would open a project creation modal.')}
              className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>
        </div>

        {/* Overall Progress Overview */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">PROGRESS OVERVIEW</h2>
          
          {/* Circular Progress */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                  className="text-[#AC5757]"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">65%</span>
                <span className="text-sm text-gray-500">PROGRESS</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <div className="text-sm text-gray-500 uppercase">COURSES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">11</div>
              <div className="text-sm text-gray-500 uppercase">PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-500 uppercase">COMPLETED</div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            {[
              { label: 'STUDY', progress: 75, color: 'bg-green-500' },
              { label: 'CHALLENGES', progress: 34, color: 'bg-orange-500' },
              { label: 'COMMUNITY', progress: 46, color: 'bg-orange-500' },
              { label: 'PIN UP', progress: 59, color: 'bg-orange-500' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-24 text-sm font-semibold text-gray-900">{item.label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">{item.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
              {/* Course Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#AC5757] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{course.courseCode}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="text-lg font-bold text-gray-900">{course.progress}%</div>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {course.courseTitle}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.completedWeeks}/{course.totalWeeks} weeks</span>
                  <span>{course.projects.length} projects</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(course.progress)} transition-all duration-500`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Projects List */}
              <div className="p-6">
                <div className="space-y-3">
                  {course.projects.slice(0, 3).map((project) => (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                          {project.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                        {project.grade && (
                          <span className="font-semibold text-green-600">{project.grade}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {course.projects.length > 3 && (
                    <div className="text-center">
                      <button className="text-sm text-[#AC5757] hover:text-[#8A4A4A] font-semibold">
                        +{course.projects.length - 3} more projects
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {selectedProject.type}
                </span>
                {selectedProject.grade && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                    Grade: {selectedProject.grade}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{selectedProject.description}</p>
              
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <Calendar size={16} />
                Due: {new Date(selectedProject.dueDate).toLocaleDateString()}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowProjectModal(false);
                    alert(`Opening ${selectedProject.title}...\n\nThis would launch the project details and submission interface.`);
                  }}
                  className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  View Project
                </button>
                <button 
                  onClick={() => alert('Project submitted!')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Upload size={16} />
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileNavigation />
    </div>
  );
};

export default CourseProjects;
