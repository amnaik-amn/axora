import React from 'react';
import { Link } from 'react-router-dom';

// ArrowDots component from Klorah
const ArrowDots = ({ size = 'w-1 h-1', color = 'bg-white' }) => (
  <div className="flex items-center justify-center w-6 h-6 relative">
    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${size} ${color} rounded-full`}></div>
    <div className={`absolute bottom-0 left-0 ${size} ${color} rounded-full`}></div>
    <div className={`absolute bottom-0 right-0 ${size} ${color} rounded-full`}></div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-700 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
          <ArrowDots size="w-1.5 h-1.5" color="bg-brand" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
          A X O R A is the platform<br />
          you've been waiting for.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <ArrowDots size="w-1.5 h-1.5" color="bg-brand" />
            <span className="text-lg font-medium text-white tracking-[0.2em]">A X O R A</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6 text-sm tracking-wider">LEARN</h3>
          <div className="space-y-4">
            <Link to="/app/study" className="block text-gray-400 hover:text-white transition-colors">Study Hub</Link>
            <Link to="/app/challenges" className="block text-gray-400 hover:text-white transition-colors">Challenges</Link>
            <Link to="/app/community" className="block text-gray-400 hover:text-white transition-colors">Community</Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6 text-sm tracking-wider">LEGAL</h3>
          <div className="space-y-4">
            <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6 text-sm tracking-wider">DEMO</h3>
          <div className="space-y-4">
            <Link to="/login" className="block text-gray-400 hover:text-brand transition-colors">Try Demo</Link>
            <div className="text-xs text-gray-500">
              student@demo.com<br />
              demo123
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-gray-300">
          Contact: <a href="mailto:hello@axora.app" className="text-brand hover:text-brand/80 transition-colors">hello@axora.app</a>
        </div>
      </div>
    </div>

    {/* Large background text similar to Klorah */}
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
      <div className="text-[20rem] md:text-[25rem] font-bold text-gray-800/30 leading-none whitespace-nowrap transform translate-y-1/3">
        AXORA
      </div>
    </div>
  </footer>
);

export default Footer;