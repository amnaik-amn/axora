import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardHat, Wrench, Hammer, Construction, AlertTriangle, Coffee, Zap } from 'lucide-react';

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🚧</div>
        <div className="absolute top-20 right-20 text-4xl opacity-10 animate-pulse">🔨</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-bounce delay-1000">⚡</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-10 animate-pulse delay-500">🛠️</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-bounce delay-700">🏗️</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-10 animate-pulse delay-300">⚙️</div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Construction Icons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <HardHat className="text-yellow-500 animate-spin" size={24} />
          <Wrench className="text-orange-500 animate-pulse" size={24} />
          <Hammer className="text-red-500 animate-bounce" size={24} />
        </div>

        {/* ASCII Art */}
        <div className="mb-8">
          <pre className="text-xs md:text-sm text-gray-600 font-mono leading-tight">
{`
    ╔══════════════════════════════════════╗
    ║  🚧  UNDER CONSTRUCTION  🚧          ║
    ║                                      ║
    ║  ╔══════════════════════════════╗    ║
    ║  ║  🔨 Building something      ║    ║
    ║  ║     AMAZING for you! 🔨     ║    ║
    ║  ╚══════════════════════════════╝    ║
    ║                                      ║
    ║  ⚡ Powered by caffeine & code ⚡    ║
    ╚══════════════════════════════════════╝
`}
          </pre>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="mb-6">
            <Construction className="mx-auto text-6xl text-yellow-500 mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              OOPS! 
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
              We're Building Something Epic! 🚀
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4">
              Our team of digital construction workers (aka developers) are hard at work 
              building the most amazing educator features you've ever seen!
            </p>
            <p className="text-base text-gray-600 mb-6">
              While we're hammering away at the code, why not grab a coffee and check back later? 
              We promise it'll be worth the wait! ☕
            </p>
          </div>

          {/* Fun Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Coffee className="mx-auto text-yellow-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-yellow-700">∞</div>
              <div className="text-xs text-yellow-600">Cups of Coffee</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-3">
              <Zap className="mx-auto text-orange-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-orange-700">99%</div>
              <div className="text-xs text-orange-600">Code Quality</div>
            </div>
            <div className="bg-red-100 rounded-lg p-3">
              <AlertTriangle className="mx-auto text-red-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-red-700">0</div>
              <div className="text-xs text-red-600">Bugs Found</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <HardHat className="mx-auto text-gray-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-700">∞</div>
              <div className="text-xs text-gray-600">Safety First</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Construction Progress</span>
              <span>42% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" style={{width: '42%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              *Progress may vary based on coffee consumption and bug encounters
            </p>
          </div>

          {/* Fun Messages */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 italic">
              "Rome wasn't built in a day, and neither was this amazing educator platform!" 
              <br />
              <span className="text-xs">- Our Development Team (probably)</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/educator" 
              className="bg-[#AC5757] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              Try Again
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              🚧 This page is under construction. Check back soon for updates! 🚧
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Need help? Contact our support team or check our status page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
