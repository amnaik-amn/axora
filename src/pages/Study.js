import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';
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
      title: 'Modern Communications Systems: A First Course',
      type: 'book',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      image: null
    },
    {
      title: 'A5 for Architecture Podcast',
      type: 'podcast',
      color: 'bg-gradient-to-br from-red-500 to-orange-500',
      image: null
    },
    {
      title: 'Civil Engineering Construction: Practice and Procedure',
      type: 'book', 
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      image: null
    }
  ];

  const assignedContent = [
    {
      title: 'AutoCAD 2024 for Civil Engineering Applications',
      type: 'course',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      image: null
    },
    {
      title: 'Fifty Modern Buildings That Changed the World',
      type: 'book',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      image: null
    },
    {
      title: 'Archispeak',
      type: 'podcast',
      color: 'bg-gray-900',
      image: null
    }
  ];

  const aiTailoredContent = [
    {
      title: '99% Invisible',
      type: 'podcast',
      color: 'bg-black',
      image: null
    },
    {
      title: 'The Big Burn',
      author: 'Timothy Egan',
      type: 'book',
      color: 'bg-gradient-to-br from-orange-400 to-yellow-500',
      image: null
    },
    {
      title: 'Why Buildings Fall Down',
      type: 'book',
      color: 'bg-white',
      textColor: 'text-gray-900',
      image: null
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          
          <h1 className="font-oswald font-medium text-white text-[38px]">STUDY</h1>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/app/notifications" 
              className="hidden md:flex w-10 h-10 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Bell size={20} className="text-white" />
            </Link>
            <Link to="/app/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
              <span className="text-white font-semibold text-sm">
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
                className={`flex-1 py-3 font-bold text-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
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
        {/* Resources Tab Content */}
        {activeTab === 'resources' && (
          <div className="space-y-12">
            {/* CONTINUE Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">CONTINUE</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {continueContent.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 cursor-pointer">
                    <div className={`w-48 h-64 rounded-lg ${item.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-white font-bold text-center text-sm leading-tight">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ASSIGNED Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ASSIGNED</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {assignedContent.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 cursor-pointer">
                    <div className={`w-48 h-64 rounded-lg ${item.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-white font-bold text-center text-sm leading-tight">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI-TAILORED Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-TAILORED</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {aiTailoredContent.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 cursor-pointer">
                    <div className={`w-48 h-64 rounded-lg ${item.color} ${item.textColor || 'text-white'} flex items-center justify-center relative overflow-hidden border ${item.color === 'bg-white' ? 'border-gray-300' : 'border-transparent'}`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <p className={`font-bold text-center text-sm leading-tight ${item.textColor || 'text-white'}`}>
                          {item.title}
                        </p>
                        {item.author && (
                          <p className={`text-xs mt-2 ${item.textColor || 'text-white'} opacity-80`}>
                            {item.author}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
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
                  <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
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
                  <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
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
                  <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
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
                    <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
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

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Study;