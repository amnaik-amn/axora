import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Award, Clock, Target } from 'lucide-react';

const StudyDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#AC5757]" />,
      title: "Personalized Learning Paths",
      description: "AI-powered recommendations based on your skill level and learning goals"
    },
    {
      icon: <Users className="w-8 h-8 text-[#AC5757]" />,
      title: "Study Groups & Collaboration",
      description: "Join virtual study sessions with peers and industry professionals"
    },
    {
      icon: <Award className="w-8 h-8 text-[#AC5757]" />,
      title: "Certification Programs",
      description: "Earn industry-recognized certificates to advance your career"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#AC5757]" />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with 24/7 access to course materials"
    },
    {
      icon: <Target className="w-8 h-8 text-[#AC5757]" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4E9E7] to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#5C1A1A]">Study Platform</h1>
              <p className="text-gray-600">Transform your learning experience with AI-powered education</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src="/assets/studyicon.png" alt="Study" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-[#5C1A1A] mb-6" style={{ fontFamily: 'serif' }}>
            STUDY
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized learning paths and AI-powered education that adapts to your learning style, 
            providing real-time feedback and collaborative tools to accelerate your professional growth.
          </p>
        </div>

        {/* Quick Actions Style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COURSES</h3>
            <p className="text-white/80 text-center mt-2">Access comprehensive learning materials</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY GROUPS</h3>
            <p className="text-white/80 text-center mt-2">Collaborate with peers</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Award className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CERTIFICATIONS</h3>
            <p className="text-white/80 text-center mt-2">Earn industry credentials</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#5C1A1A] mb-6 text-center">Try Our Study Platform</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#AC5757] mb-4">What You'll Experience:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Personalized course recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Interactive learning modules with VR integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Real-time progress tracking and analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Collaborative study groups and peer learning</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Industry-recognized certifications</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-[#AC5757] mx-auto mb-4" />
                <p className="text-gray-600">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#AC5757] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#9a4a4a] transition-colors"
          >
            Join AXORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyDemo;
