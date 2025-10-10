import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Award, BarChart3, Calendar } from 'lucide-react';

const ProgressDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#AC5757]" />,
      title: "Real-time Analytics",
      description: "Track your learning progress with detailed insights and performance metrics"
    },
    {
      icon: <Target className="w-8 h-8 text-[#AC5757]" />,
      title: "Goal Setting",
      description: "Set personalized learning objectives and track your achievement milestones"
    },
    {
      icon: <Award className="w-8 h-8 text-[#AC5757]" />,
      title: "Achievement System",
      description: "Earn badges, certificates, and recognition for your accomplishments"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#AC5757]" />,
      title: "Performance Reports",
      description: "Get comprehensive reports on your skills, strengths, and areas for improvement"
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#AC5757]" />,
      title: "Learning Calendar",
      description: "Plan and track your study schedule with intelligent reminders and suggestions"
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
              <h1 className="text-3xl font-bold text-[#5C1A1A]">Progress Tracker</h1>
              <p className="text-gray-600">Monitor your growth, celebrate achievements, and stay motivated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src="/assets/progressicon.png" alt="Progress" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-[#5C1A1A] mb-6" style={{ fontFamily: 'serif' }}>
            PROGRESS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your progress across all learning activities, set meaningful goals, 
            and celebrate your achievements with our comprehensive progress tracking system.
          </p>
        </div>

        {/* Quick Actions Style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <TrendingUp className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>ANALYTICS</h3>
            <p className="text-white/80 text-center mt-2">Track your learning progress</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Target className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>GOALS</h3>
            <p className="text-white/80 text-center mt-2">Set and track objectives</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Award className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>ACHIEVEMENTS</h3>
            <p className="text-white/80 text-center mt-2">Celebrate your milestones</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#5C1A1A] mb-6 text-center">Experience Our Progress Platform</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#AC5757] mb-4">What You'll Track:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Course completion rates and study time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Skill development across different domains</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Challenge performance and rankings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Community engagement and contributions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Portfolio growth and project milestones</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-[#AC5757] mx-auto mb-4" />
                <p className="text-gray-600">Progress Demo Coming Soon</p>
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

export default ProgressDemo;
