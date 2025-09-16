import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUp,
  User,
  LogIn,
  X,
  ChevronRight,
  Star,
  Zap,
  Target
} from 'lucide-react';

const InspiredLanding = () => {

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom AI-Inspired Background - from top to Master Your Field section */}
      <div className="absolute top-0 left-0 right-0 z-0" style={{ height: '120vh' }}>
        {/* Base gradient background */}
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        
        {/* AI-Generated Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          {/* Ladder Structure - Left Side */}
          <div className="absolute top-20 left-10 w-1 h-96 bg-gradient-to-b from-blue-400 to-blue-600 transform rotate-12 opacity-60"></div>
          <div className="absolute top-32 left-8 w-20 h-0.5 bg-blue-400 transform rotate-12 opacity-60"></div>
          <div className="absolute top-48 left-8 w-20 h-0.5 bg-blue-400 transform rotate-12 opacity-60"></div>
          <div className="absolute top-64 left-8 w-20 h-0.5 bg-blue-400 transform rotate-12 opacity-60"></div>
          <div className="absolute top-80 left-8 w-20 h-0.5 bg-blue-400 transform rotate-12 opacity-60"></div>
          <div className="absolute top-96 left-8 w-20 h-0.5 bg-blue-400 transform rotate-12 opacity-60"></div>
          
          {/* Dynamic Arrows - Right Side */}
          <div className="absolute top-40 right-32">
            <div className="w-12 h-12 border-r-2 border-b-2 border-blue-300 transform rotate-45 opacity-40"></div>
          </div>
          <div className="absolute top-60 right-28">
            <div className="w-10 h-10 border-r-2 border-b-2 border-blue-300 transform rotate-45 opacity-40"></div>
          </div>
          <div className="absolute top-80 right-24">
            <div className="w-8 h-8 border-r-2 border-b-2 border-blue-300 transform rotate-45 opacity-40"></div>
          </div>
          <div className="absolute top-100 right-20">
            <div className="w-6 h-6 border-r-2 border-b-2 border-blue-300 transform rotate-45 opacity-40"></div>
          </div>
          
          {/* Progress Bar/Timeline */}
          <div className="absolute top-1/2 right-16 w-32 h-0.5 bg-blue-300 opacity-30"></div>
          <div className="absolute top-1/2 right-16 w-32 h-0.5 bg-blue-300 opacity-30 transform translate-y-2"></div>
          <div className="absolute top-1/2 right-16 w-32 h-0.5 bg-blue-300 opacity-30 transform translate-y-4"></div>
          
          {/* Architectural Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-blue-300 opacity-20 transform rotate-45"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-blue-300 opacity-20 transform rotate-12"></div>
          <div className="absolute top-2/3 right-1/5 w-8 h-8 border border-blue-300 opacity-20 transform rotate-45"></div>
          
          {/* Data Flow Lines */}
          <div className="absolute top-1/2 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 transform rotate-12"></div>
          <div className="absolute top-2/3 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 transform -rotate-12"></div>
          <div className="absolute top-1/4 left-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 transform rotate-6"></div>
        </div>
        
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/10"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Ladder-like Structure - Left Side */}
        <div className="absolute top-20 left-10 w-2 h-96 bg-gradient-to-b from-gray-300 to-gray-100 opacity-60 transform rotate-12"></div>
        <div className="absolute top-32 left-8 w-16 h-1 bg-gray-300 opacity-60 transform rotate-12"></div>
        <div className="absolute top-48 left-8 w-16 h-1 bg-gray-300 opacity-60 transform rotate-12"></div>
        <div className="absolute top-64 left-8 w-16 h-1 bg-gray-300 opacity-60 transform rotate-12"></div>
        <div className="absolute top-80 left-8 w-16 h-1 bg-gray-300 opacity-60 transform rotate-12"></div>
        <div className="absolute top-96 left-8 w-16 h-1 bg-gray-300 opacity-60 transform rotate-12"></div>
        
        {/* Dynamic Arrows - Left Side */}
        <div className="absolute top-40 left-32">
          <div className="w-8 h-8 border-r-2 border-b-2 border-gray-300 transform rotate-45 opacity-40"></div>
        </div>
        <div className="absolute top-60 left-36">
          <div className="w-6 h-6 border-r-2 border-b-2 border-gray-300 transform rotate-45 opacity-40"></div>
        </div>
        <div className="absolute top-80 left-40">
          <div className="w-4 h-4 border-r-2 border-b-2 border-gray-300 transform rotate-45 opacity-40"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="flex justify-between items-center">
          {/* TOP Indicator */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <ArrowUp size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">TOP</span>
          </div>

          {/* User Interface Elements - Right Side */}
          <div className="flex items-center gap-4">
            {/* User A Button */}
            <div className="bg-blue-600 text-white rounded-xl px-6 py-3 flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors">
              <User size={20} />
              <span className="font-semibold">User A</span>
            </div>

            {/* Login/Sign Button */}
            <div className="bg-white border-2 border-gray-200 rounded-xl px-6 py-3 flex items-center gap-2 hover:border-blue-300 transition-colors">
              <LogIn size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Login/Sign</span>
              <button className="ml-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={12} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Dynamic AXORA Branding */}
          <div className="mb-12">
            <h1 className="text-9xl md:text-[12rem] font-black text-white transform -rotate-3 hover:rotate-0 transition-transform duration-500 mb-4" 
                style={{
                  textShadow: '6px 6px 0px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)',
                  letterSpacing: '-0.02em'
                }}>
              AXORA
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto rounded-full"></div>
          </div>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-white mb-8 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Build Your Future, One Step at a Time
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Learning</h3>
              <p className="text-gray-600 leading-relaxed">Personalized study paths that adapt to your learning style and pace</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real Challenges</h3>
              <p className="text-gray-600 leading-relaxed">Complete projects that matter and build a portfolio employers love</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">Visual insights into your learning journey with XP and achievements</p>
            </div>
          </div>

          {/* Learner's Demo Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
                Learner's Demo
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the future of education with our interactive AI-guided learning platform
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  to="/login?role=learner" 
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group"
                >
                  Try Demo Now
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/vr-landing" 
                  className="bg-blue-500/20 text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group"
                >
                  VR Experience
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">2.5M+</div>
                <div className="text-lg text-blue-100 font-semibold">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">15K+</div>
                <div className="text-lg text-blue-100 font-semibold">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">87%</div>
                <div className="text-lg text-blue-100 font-semibold">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">4.8</div>
                <div className="text-lg text-blue-100 font-semibold">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Master Your Field with AXORA Section - Background ends here */}
      <div className="relative z-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Master Your Field with <span className="text-blue-600">AXORA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your learning experience with cutting-edge AI technology and immersive educational tools
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Learning</h3>
              <p className="text-gray-600 leading-relaxed">Personalized study paths that adapt to your learning style and pace</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Challenges</h3>
              <p className="text-gray-600 leading-relaxed">Complete projects that matter and build a portfolio employers love</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">Visual insights into your learning journey with XP and achievements</p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black" style={{ letterSpacing: '1px' }}>
                  1
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Tell Your Journey</h4>
                <p className="text-gray-600">Share your learning goals and current skill level</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black" style={{ letterSpacing: '1px' }}>
                  2
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Get Tailored</h4>
                <p className="text-gray-600">Receive personalized learning paths and challenges</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black" style={{ letterSpacing: '1px' }}>
                  3
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Earn XP & Level Up</h4>
                <p className="text-gray-600">Complete challenges and track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-20 bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Ready to Transform Your Learning?</h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of students who are already mastering their fields with AXORA
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/login?role=learner" 
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 group"
            >
              Start Your Journey
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/educator-login" 
              className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 group"
            >
              For Educators
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - only in background image area */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse z-10"></div>
      <div className="absolute top-1/2 right-1/6 w-12 h-12 bg-purple-100 rounded-full opacity-25 animate-pulse delay-500 z-10"></div>
    </div>
  );
};

export default InspiredLanding;
