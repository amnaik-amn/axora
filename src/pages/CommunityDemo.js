import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Globe, Award, Calendar } from 'lucide-react';

const CommunityDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-[#AC5757]" />,
      title: "Global Network",
      description: "Connect with professionals and students from around the world"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#AC5757]" />,
      title: "Real-time Collaboration",
      description: "Engage in live discussions, Q&A sessions, and knowledge sharing"
    },
    {
      icon: <Globe className="w-8 h-8 text-[#AC5757]" />,
      title: "Industry Forums",
      description: "Join specialized communities for architecture, engineering, and design"
    },
    {
      icon: <Award className="w-8 h-8 text-[#AC5757]" />,
      title: "Peer Recognition",
      description: "Get feedback, endorsements, and recognition from your community"
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#AC5757]" />,
      title: "Virtual Events",
      description: "Attend workshops, webinars, and networking events"
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
              <h1 className="text-3xl font-bold text-[#5C1A1A]">Community Hub</h1>
              <p className="text-gray-600">Connect, collaborate, and grow with like-minded professionals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src="/assets/communityicon.png" alt="Community" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-[#5C1A1A] mb-6" style={{ fontFamily: 'serif' }}>
            COMMUNITY
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with architects, engineers, designers, and students worldwide. Share knowledge, 
            collaborate on projects, and advance your career through meaningful professional relationships.
          </p>
        </div>

        {/* Quick Actions Style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>NETWORK</h3>
            <p className="text-white/80 text-center mt-2">Connect with professionals globally</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <MessageCircle className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>DISCUSSIONS</h3>
            <p className="text-white/80 text-center mt-2">Engage in live conversations</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Globe className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>FORUMS</h3>
            <p className="text-white/80 text-center mt-2">Join specialized communities</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#5C1A1A] mb-6 text-center">Experience Our Community</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#AC5757] mb-4">What You'll Discover:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Industry-specific discussion forums</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Mentorship programs with industry experts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Project collaboration and portfolio sharing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Job opportunities and career guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Virtual meetups and networking events</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-[#AC5757] mx-auto mb-4" />
                <p className="text-gray-600">Community Demo Coming Soon</p>
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

export default CommunityDemo;
