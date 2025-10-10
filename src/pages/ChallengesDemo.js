import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Trophy, Clock, Zap, Award } from 'lucide-react';

const ChallengesDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8 text-[#AC5757]" />,
      title: "Skill-Based Challenges",
      description: "Test your knowledge with real-world problems and scenarios"
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#AC5757]" />,
      title: "Competitive Leaderboards",
      description: "Compete with peers and climb the global rankings"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#AC5757]" />,
      title: "Time-Limited Events",
      description: "Participate in exciting time-bound challenges and hackathons"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#AC5757]" />,
      title: "Instant Feedback",
      description: "Get immediate results and detailed explanations for your solutions"
    },
    {
      icon: <Award className="w-8 h-8 text-[#AC5757]" />,
      title: "Achievement Badges",
      description: "Earn recognition and unlock special rewards for your accomplishments"
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
              <h1 className="text-3xl font-bold text-[#5C1A1A]">Challenges Arena</h1>
              <p className="text-gray-600">Test your skills, compete with peers, and unlock your potential</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src="/assets/challengesicon.png" alt="Challenges" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-[#5C1A1A] mb-6" style={{ fontFamily: 'serif' }}>
            CHALLENGES
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Push your limits with engaging challenges, compete with professionals worldwide, 
            and earn recognition for your expertise in architecture, engineering, and design.
          </p>
        </div>

        {/* Quick Actions Style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Target className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>SKILL TESTS</h3>
            <p className="text-white/80 text-center mt-2">Test your knowledge with real-world problems</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>LEADERBOARDS</h3>
            <p className="text-white/80 text-center mt-2">Compete with peers globally</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Award className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>ACHIEVEMENTS</h3>
            <p className="text-white/80 text-center mt-2">Earn badges and recognition</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#5C1A1A] mb-6 text-center">Try Our Challenge Platform</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#AC5757] mb-4">What You'll Experience:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Daily coding and design challenges</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Industry-specific problem-solving scenarios</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Real-time leaderboards and rankings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Team challenges and collaborative competitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Certification pathways through challenge completion</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <Target className="w-16 h-16 text-[#AC5757] mx-auto mb-4" />
                <p className="text-gray-600">Challenge Demo Coming Soon</p>
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

export default ChallengesDemo;
