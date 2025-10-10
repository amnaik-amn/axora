import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, Users, ThumbsUp, MessageCircle, Share } from 'lucide-react';

const PinupDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Image className="w-8 h-8 text-[#AC5757]" />,
      title: "Portfolio Showcase",
      description: "Display your best work with high-quality image galleries and 3D models"
    },
    {
      icon: <Users className="w-8 h-8 text-[#AC5757]" />,
      title: "Peer Review System",
      description: "Get constructive feedback from industry professionals and peers"
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-[#AC5757]" />,
      title: "Community Voting",
      description: "Showcase your work and let the community vote on the best designs"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#AC5757]" />,
      title: "Interactive Comments",
      description: "Engage in detailed discussions about design choices and techniques"
    },
    {
      icon: <Share className="w-8 h-8 text-[#AC5757]" />,
      title: "Social Sharing",
      description: "Share your work across platforms and build your professional network"
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
              <h1 className="text-3xl font-bold text-[#5C1A1A]">Pin-Up Gallery</h1>
              <p className="text-gray-600">Showcase your work, get feedback, and inspire others</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src="/assets/pinupicon.png" alt="Pin Up" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-[#5C1A1A] mb-6" style={{ fontFamily: 'serif' }}>
            PIN UP
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your designs, architectural projects, and creative work. Get valuable feedback 
            from industry professionals, participate in design competitions, and build your reputation.
          </p>
        </div>

        {/* Quick Actions Style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Image className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PORTFOLIO</h3>
            <p className="text-white/80 text-center mt-2">Showcase your best work</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <ThumbsUp className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>VOTING</h3>
            <p className="text-white/80 text-center mt-2">Community feedback system</p>
          </div>
          
          <div className="rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: '#9d0a06' }}>
            <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-4">
              <Share className="w-16 h-16 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>SHARING</h3>
            <p className="text-white/80 text-center mt-2">Build your professional network</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#5C1A1A] mb-6 text-center">Explore Our Pin-Up Platform</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#AC5757] mb-4">What You'll Discover:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>High-resolution image and 3D model uploads</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Professional portfolio templates and layouts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Detailed project descriptions and process documentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Community voting and design competitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#AC5757] rounded-full"></div>
                  <span>Networking opportunities with potential employers</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <Image className="w-16 h-16 text-[#AC5757] mx-auto mb-4" />
                <p className="text-gray-600">Pin-Up Demo Coming Soon</p>
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

export default PinupDemo;
