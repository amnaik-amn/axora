import React, { useState } from 'react';
import { checkAuth } from '../auth/config';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const Study = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('tests');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'resources', label: 'RESOURCES' },
    { id: 'tests', label: 'TESTS' },
    { id: 'courses', label: 'COURSES' },
  ];

  const continueContent = [
    {
      title: 'Modern Communications Systems',
      image: '/assets/Screenshot 2025-08-28 at 11.05.52 PM.png',
      description: 'Advanced communication technologies for modern architecture'
    },
    {
      title: 'A is for Architecture Podcast',
      image: '/assets/Screenshot 2025-08-28 at 11.06.09 PM.png',
      description: 'Weekly architectural insights and industry discussions'
    },
    {
      title: 'Civil Engineering Construction',
      image: '/assets/Screenshot 2025-08-28 at 11.06.24 PM.png',
      description: 'Fundamentals of construction engineering and project management'
    }
  ];

  const assignedContent = [
    {
      title: 'AutoCAD 2024 for Civil Engineering Applications',
      image: '/assets/Screenshot 2025-08-28 at 11.06.36 PM.png',
      description: 'Master AutoCAD for professional civil engineering projects'
    },
    {
      title: 'Fifty Modern Buildings That Changed the World',
      image: '/assets/Screenshot 2025-08-28 at 11.06.55 PM.png',
      description: 'Explore iconic structures that revolutionized architecture'
    },
    {
      title: 'Archispeak',
      image: '/assets/Screenshot 2025-08-28 at 11.07.12 PM.png',
      description: 'Professional architectural terminology and communication'
    }
  ];

  const aiTailoredContent = [
    {
      title: '99% Invisible',
      image: '/assets/Screenshot 2025-08-28 at 11.05.52 PM.png',
      description: 'Discover hidden design elements in everyday architecture'
    },
    {
      title: 'The Big Burn',
      image: '/assets/Screenshot 2025-08-28 at 11.06.09 PM.png',
      description: 'Environmental design lessons from historical disasters'
    },
    {
      title: 'Why Buildings Fall Down',
      image: '/assets/Screenshot 2025-08-28 at 11.06.24 PM.png',
      description: 'Structural engineering failures and safety principles'
    }
  ];

  const selectedCourses = [
    {
      title: 'INTRO TO SPATIAL REASONING',
      complete: '30m',
      left: '45m'
    },
    {
      title: 'BIM APPLI.: GIS MAPPING',
      complete: '1h 11m',
      left: '29m'
    }
  ];

  const aiAssignedCourses = [
    {
      title: 'WHAT HAPPENS AFTER CONSTRUCTION? ENG334',
      complete: '44m',
      left: '1h 26m'
    },
    {
      title: 'STRUCTURES I-III',
      complete: '12h 2m',
      left: '32m'
    },
    {
      title: 'FOUNDATIONS OF GEOTECHNICAL ENGINEE-',
      complete: '1h 5m',
      left: '5h'
    }
  ];

  const professorCourses = [
    {
      professor: 'PROFESSOR Hussain',
      courses: [
        {
          title: 'INTRO TO SUSTAINABILITY & DESIGN',
          complete: '45 m',
          left: '1h 57m'
        }
      ]
    }
  ];

  const selectedTests = [
    {
      title: 'SPATIAL REASONING 289',
      attempts: 3,
      highest: '76 /110'
    },
    {
      title: 'NCARB/A.R.E. MOCK-TEST',
      attempts: 3,
      highest: 'PASS'
    }
  ];

  const aiAssignedTests = [
    {
      title: 'C.A.S.E. MOCK-TEST',
      attempts: 4,
      highest: 'PASS'
    },
    {
      title: 'NAAB-accredited + A.X.P. + A.R.E. MOCK',
      attempts: 2,
      highest: 'FAIL'
    },
    {
      title: 'CSI CDT MOCK TEST',
      attempts: 3,
      highest: 'FAIL'
    }
  ];

  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    // Simulate course opening
    alert(`Opening ${course.title}...\n\nProgress: ${course.complete} completed\nRemaining: ${course.left}\n\nThis would open an interactive learning module.`);
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
      <div className="bg-white border-b border-gray-200">
        <div className="flex justify-center">
          <div className="flex w-full max-w-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-bold text-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#AC5757] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
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
                      <p className="text-xs text-center mt-2 font-medium text-gray-700 line-clamp-2">{item.title}</p>
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
                      <p className="text-xs text-center mt-2 font-medium text-gray-700 line-clamp-2">{item.title}</p>
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
            {/* SELECTED Tests */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SELECTED</h2>
              <div className="space-y-4">
                {selectedTests.map((test, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleTestClick(test)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">ATTEMPTS</p>
                        <p className="text-xl font-bold text-gray-900">{test.attempts}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">HIGHEST</p>
                        <p className={`text-xl font-bold ${test.highest === 'PASS' ? 'text-green-600' : 'text-gray-900'}`}>
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
                    className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleTestClick(test)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                    </div>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">ATTEMPTS</p>
                        <p className="text-xl font-bold text-gray-900">{test.attempts}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">HIGHEST</p>
                        <p className={`text-xl font-bold ${
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
                {selectedCourses.map((course, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
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
                ))}
              </div>
            </section>

            {/* AI-ASSIGNED Courses */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-ASSIGNED</h2>
              <div className="space-y-4">
                {aiAssignedCourses.map((course, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
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
                ))}
              </div>
            </section>

            {/* Professor Courses */}
            {professorCourses.map((prof, profIdx) => (
              <section key={profIdx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{prof.professor}</h2>
                <div className="space-y-4">
                  {prof.courses.map((course, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
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
                  ))}
                </div>
              </section>
            ))}
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

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Study;