import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// import { checkAuth } from '../auth/config'; // Unused import
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';
import UploadModal from '../components/UploadModal';
import { uploadAssignment, getCourseSubmissions } from '../utils/uploadStorage';

const Study = () => {
  // const user = checkAuth(); // Unused variable
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resources');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle URL parameters for direct tab linking
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['resources', 'courses', 'tests'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // useEffect moved after array definitions

  const tabs = [
    { id: 'resources', label: 'RESOURCES' },
    { id: 'courses', label: 'COURSES' },
    { id: 'tests', label: 'TESTS' },
  ];

  // Duplicate definitions removed - moved above

  const continueContent = [
    {
      title: 'Modern Communications Systems',
      image: '/assets/Modern Communications Systems.png',
      description: 'Advanced communication technologies for modern architecture'
    },
    {
      title: 'A is for Architecture Podcast',
      image: '/assets/A IS FOR ARCHITECTURE.png',
      description: 'Weekly architectural insights and industry discussions'
    },
    {
      title: 'Civil Engineering Construction',
      image: '/assets/Engineering Civil Construction.png',
      description: 'Fundamentals of construction engineering and project management'
    }
  ];

  const assignedContent = [
    {
      title: 'AutoCAD 2024 for Civil Engineering Applications',
      image: '/assets/AutoCAD 2024 for Civil Engineering.png',
      description: 'Master AutoCAD for professional civil engineering projects'
    },
    {
      title: 'Fifty Modern Buildings That Changed the World',
      image: '/assets/Fifty Modern Buildings.png',
      description: 'Explore iconic structures that revolutionized architecture'
    },
    {
      title: 'Archispeak',
      image: '/assets/ARCHISPEAK.png',
      description: 'Professional architectural terminology and communication'
    }
  ];

  const aiSuggestedContent = [
    {
      title: 'Rapid Urbanization and Its Effects',
      image: '/assets/Rapid Urbanization.jpeg',
      description: 'AI-recommended course on environmental architecture and green building practices'
    },
    {
      title: 'Advanced Structural Analysis',
      image: '/assets/Structural analysis.jpeg',
      description: 'Personalized learning path for structural engineering fundamentals'
    },
    {
      title: 'AI and Machine Learning',
      image: '/assets/AI & Machine Learning.jpeg',
      description: 'Smart city design concepts tailored to your learning progress'
    }
  ];

  // const aiTailoredContent = [ // Unused variable
  //   {
  //     title: '99% Invisible',
  //     image: '/assets/99_ INVISIBLE.png',
  //     description: 'Discover hidden design elements in everyday architecture'
  //   },
  //   {
  //     title: 'The Big Burn',
  //     image: '/assets/Big Burn.png',
  //     description: 'Environmental design lessons from historical disasters'
  //   },
  //   {
  //     title: 'Why Buildings Fall Down',
  //     image: '/assets/Why Buildings Fall Down.png',
  //     description: 'Structural engineering failures and safety principles'
  //   }
  // ];

  const selectedCourses = useMemo(() => [
    {
      title: 'INTRO TO SPATIAL REASONING',
      complete: '3 weeks',
      left: '9 weeks'
    },
    {
      title: 'BIM APPLI.: GIS MAPPING',
      complete: '7 weeks',
      left: '7 weeks'
    },
    {
      title: 'INTRO TO SUSTAINABILITY & DESIGN',
      complete: '3 weeks',
      left: '10 weeks'
    }
  ], []);

  const aiAssignedCourses = useMemo(() => [
    {
      title: 'WHAT HAPPENS AFTER CONSTRUCTION? ENG334',
      complete: '4 weeks',
      left: '12 weeks'
    },
    {
      title: 'STRUCTURES I-III',
      complete: '15 weeks',
      left: '3 weeks'
    },
    {
      title: 'FOUNDATIONS OF GEOTECHNICAL ENGINEE-',
      complete: '3 weeks',
      left: '12 weeks'
    }
  ], []);

  // Load existing submissions on component mount
  useEffect(() => {
    const allCourses = [
      ...selectedCourses,
      ...aiAssignedCourses
    ];
    
    const submissions = {};
    allCourses.forEach(course => {
      const courseSubmissions = getCourseSubmissions(course.title);
      if (courseSubmissions.length > 0) {
        submissions[course.title] = courseSubmissions;
      }
    });
    
    setCourseSubmissions(submissions);
  }, [selectedCourses, aiAssignedCourses]);

  const selectedTests = [
    {
      title: 'SPATIAL REASONING 289',
      course: 'General Assessment',
      attempts: 3,
      highest: '76/110',
      status: 'available',
      dueDate: '2024-03-25'
    },
    {
      title: 'NCARB/A.R.E. MOCK-TEST',
      course: 'Professional Certification',
      attempts: 3,
      highest: 'PASS',
      status: 'completed',
      dueDate: '2024-03-20'
    }
  ];

  const aiAssignedTests = [
    {
      title: 'C.A.S.E. MOCK-TEST',
      course: 'AI Recommended',
      attempts: 4,
      highest: 'PASS',
      status: 'completed',
      dueDate: '2024-03-18'
    },
    {
      title: 'NAAB-accredited + A.X.P. + A.R.E. MOCK',
      course: 'AI Recommended',
      attempts: 2,
      highest: 'FAIL',
      status: 'available',
      dueDate: '2024-03-22'
    },
    {
      title: 'CSI CDT MOCK TEST',
      course: 'AI Recommended',
      attempts: 3,
      highest: 'FAIL',
      status: 'available',
      dueDate: '2024-03-28'
    }
  ];

  const courseAssignedTests = [
    {
      title: 'Midterm Exam - Spatial Reasoning',
      course: 'INTRO TO SPATIAL REASONING',
      attempts: 2,
      highest: '76/100',
      status: 'available',
      dueDate: '2024-03-15'
    },
    {
      title: 'BIM Software Proficiency Test',
      course: 'BIM APPLI.: GIS MAPPING',
      attempts: 1,
      highest: '85/100',
      status: 'available',
      dueDate: '2024-03-20'
    },
    {
      title: 'Facility Management Assessment',
      course: 'WHAT HAPPENS AFTER CONSTRUCTION',
      attempts: 0,
      highest: 'Not Taken',
      status: 'locked',
      dueDate: '2024-03-25'
    },
    {
      title: 'Structural Analysis Final Exam',
      course: 'STRUCTURES I-III',
      attempts: 3,
      highest: '92/100',
      status: 'completed',
      dueDate: '2024-03-10'
    },
    {
      title: 'Geotechnical Engineering Quiz',
      course: 'FOUNDATIONS OF GEOTECHNICAL',
      attempts: 1,
      highest: '78/100',
      status: 'available',
      dueDate: '2024-03-18'
    },
    {
      title: 'Sustainability Design Project',
      course: 'INTRO TO SUSTAINABILITY & DESIGN',
      attempts: 0,
      highest: 'Not Taken',
      status: 'locked',
      dueDate: '2024-03-22'
    }
  ];

  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseSubmissions, setCourseSubmissions] = useState({});

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // In real app, this would filter content
  };

  const handleResourceClick = (resource, type) => {
    setSelectedResource({ ...resource, type });
    setShowModal(true);
  };

  const handleTestClick = (test) => {
    console.log('Starting test:', test.title);
    // Simulate test starting
    alert(`Starting ${test.title}...\n\nThis would launch an interactive test with questions and real-time feedback.`);
  };

  const handleCourseClick = (course) => {
    console.log('Opening course:', course.title);
    // Map course titles to their corresponding IDs
    const courseIdMap = {
      'INTRO TO SPATIAL REASONING': 'intro-spatial-reasoning',
      'BIM APPLI.: GIS MAPPING': 'bim-gis-mapping',
      'WHAT HAPPENS AFTER CONSTRUCTION? ENG334': 'what-happens-after-construction',
      'STRUCTURES I-III': 'structures-i-iii',
      'FOUNDATIONS OF GEOTECHNICAL ENGINEE-': 'foundations-geotechnical',
      'INTRO TO SUSTAINABILITY & DESIGN': 'intro-sustainability-design'
    };
    
    const courseId = courseIdMap[course.title] || course.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-|-$/g, '');
    
    console.log('Navigating to course ID:', courseId);
    navigate(`/app/course/${courseId}`);
  };

  const handleUploadSubmit = async (submissionData) => {
    try {
      const result = await uploadAssignment(submissionData);
      console.log('Upload successful:', result);
      
      // Update course submissions state
      const submissions = getCourseSubmissions(submissionData.courseTitle);
      setCourseSubmissions(prev => ({
        ...prev,
        [submissionData.courseTitle]: submissions
      }));
      
      return result;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="STUDY"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={false}
        showSearch={true}
        hideMessageIcon={true}
        hideNotificationIcon={true}
        searchComponent={
          <SearchBar 
            placeholder="Search resources, courses, tests..." 
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
        {/* Resources Tab Content */}
        {activeTab === 'resources' && (
          <div className="space-y-12">
            {/* CONTINUE Section */}
            <section>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">CONTINUE</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {continueContent.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleResourceClick(item, 'continue')}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-base text-center mt-2 font-medium text-gray-700 line-clamp-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ASSIGNED Section */}
            <section>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">ASSIGNED</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {assignedContent.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleResourceClick(item, 'assigned')}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-base text-center mt-2 font-medium text-gray-700 line-clamp-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI-SUGGESTED Section */}
            <section>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">AI-SUGGESTED</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {aiSuggestedContent.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleResourceClick(item, 'ai-suggested')}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-base text-center mt-2 font-medium text-gray-700 line-clamp-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SELECTED STUDY GROUPS Section */}
            <section>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">SELECTED STUDY GROUPS</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2">Modern Architecture Basics</h4>
                    <p className="text-sm text-gray-600 mb-3">12 members • Active discussion</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">MA</div>
                      <span className="text-sm text-gray-700">Last activity: 2h ago</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2">Structural Engineering Study</h4>
                    <p className="text-sm text-gray-600 mb-3">8 members • Weekly meetups</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">SE</div>
                      <span className="text-sm text-gray-700">Last activity: 5h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI-TAILORED STUDY GROUPS Section */}
            <section>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">AI-TAILORED STUDY GROUPS</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#AC5757]/10 to-[#AC5757]/20 rounded-lg hover:from-[#AC5757]/20 hover:to-[#AC5757]/30 transition-colors cursor-pointer border border-[#AC5757]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#AC5757] rounded text-white flex items-center justify-center text-xs">AI</div>
                      <span className="text-xs font-semibold text-[#AC5757] uppercase">Recommended</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Advanced CAD Techniques</h4>
                    <p className="text-sm text-gray-600 mb-3">15 members • Matches your skill level</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">AC</div>
                      <span className="text-sm text-gray-700">92% compatibility</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#AC5757]/10 to-[#AC5757]/20 rounded-lg hover:from-[#AC5757]/20 hover:to-[#AC5757]/30 transition-colors cursor-pointer border border-[#AC5757]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#AC5757] rounded text-white flex items-center justify-center text-xs">AI</div>
                      <span className="text-xs font-semibold text-[#AC5757] uppercase">Recommended</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sustainable Design Principles</h4>
                    <p className="text-sm text-gray-600 mb-3">23 members • Based on your interests</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">SD</div>
                      <span className="text-sm text-gray-700">87% compatibility</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tests Tab Content */}
        {activeTab === 'tests' && (
          <div className="space-y-10">
            {/* COURSE ASSIGNED Tests */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">COURSE ASSIGNED</h2>
              <div className="space-y-4">
                {courseAssignedTests.map((test, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                      test.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                    onClick={() => test.status !== 'locked' && handleTestClick(test)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.course}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Due: {test.dueDate}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.status === 'completed' ? 'bg-green-100 text-green-800' :
                          test.status === 'available' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {test.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">ATTEMPTS</p>
                        <p className="text-xl font-bold text-gray-900">{test.attempts}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">HIGHEST</p>
                        <p className={`text-xl font-bold ${
                          test.highest === 'Not Taken' ? 'text-gray-400' :
                          test.highest.includes('/') ? 'text-blue-600' :
                          'text-gray-900'
                        }`}>
                          {test.highest}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SELECTED Tests */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SELECTED</h2>
              <div className="space-y-4">
                {selectedTests.map((test, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                      test.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                    onClick={() => test.status !== 'locked' && handleTestClick(test)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.course}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Due: {test.dueDate}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.status === 'completed' ? 'bg-green-100 text-green-800' :
                          test.status === 'available' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {test.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">ATTEMPTS</p>
                        <p className="text-xl font-bold text-gray-900">{test.attempts}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">HIGHEST</p>
                        <p className={`text-xl font-bold ${
                          test.highest === 'Not Taken' ? 'text-gray-400' :
                          test.highest.includes('/') ? 'text-blue-600' :
                          test.highest === 'PASS' ? 'text-green-600' :
                          test.highest === 'FAIL' ? 'text-red-600' :
                          'text-gray-900'
                        }`}>
                          {test.highest}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI-ASSIGNED Tests */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-ASSIGNED</h2>
              <div className="space-y-4">
                {aiAssignedTests.map((test, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                      test.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                    onClick={() => test.status !== 'locked' && handleTestClick(test)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.course}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Due: {test.dueDate}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.status === 'completed' ? 'bg-green-100 text-green-800' :
                          test.status === 'available' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {test.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">ATTEMPTS</p>
                        <p className="text-xl font-bold text-gray-900">{test.attempts}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">HIGHEST</p>
                        <p className={`text-xl font-bold ${
                          test.highest === 'Not Taken' ? 'text-gray-400' :
                          test.highest.includes('/') ? 'text-blue-600' :
                          test.highest === 'PASS' ? 'text-green-600' :
                          test.highest === 'FAIL' ? 'text-red-600' :
                          'text-gray-900'
                        }`}>
                          {test.highest}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Courses Tab Content */}
        {activeTab === 'courses' && (
          <div className="space-y-10">
            {/* SELECTED Courses */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SELECTED</h2>
              <div className="space-y-4">
                {selectedCourses.map((course, idx) => {
                  const submissions = courseSubmissions[course.title] || [];
                  const hasSubmissions = submissions.length > 0;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                        hasSubmissions ? 'ring-2 ring-green-200 bg-green-50' : ''
                      }`}
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                          {hasSubmissions && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {submissions.length} submission{submissions.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase mb-1">COMPLETE</p>
                          <p className="text-xl font-bold text-gray-900">{course.complete}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-gray-500 uppercase mb-1">LEFT</p>
                          <p className="text-xl font-bold text-gray-900">{course.left}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* AI-ASSIGNED Courses */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-ASSIGNED</h2>
              <div className="space-y-4">
                {aiAssignedCourses.map((course, idx) => {
                  const submissions = courseSubmissions[course.title] || [];
                  const hasSubmissions = submissions.length > 0;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                        hasSubmissions ? 'ring-2 ring-green-200 bg-green-50' : ''
                      }`}
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                          {hasSubmissions && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {submissions.length} submission{submissions.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase mb-1">COMPLETE</p>
                          <p className="text-xl font-bold text-gray-900">{course.complete}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-gray-500 uppercase mb-1">LEFT</p>
                          <p className="text-xl font-bold text-gray-900">{course.left}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}
      </div>

      {/* Resource Detail Modal */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedResource.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <img 
                src={selectedResource.image} 
                alt={selectedResource.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-600 mb-4">
              {selectedResource.type === 'continue' ? 'Continue where you left off' : 'New assignment from your instructor'}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowModal(false);
                  alert(`Opening ${selectedResource.title}...\n\nThis would launch the full resource with interactive content, videos, and exercises.`);
                }}
                className="flex-1 bg-[#AC5757] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Open Resource
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && selectedCourse && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={handleUploadModalClose}
          courseTitle={selectedCourse.title}
          onSubmit={handleUploadSubmit}
        />
      )}

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Study;