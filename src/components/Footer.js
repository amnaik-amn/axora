import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-white border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-oswald font-medium text-white text-[28px]">AXORA</span>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            AI-powered education platform that transforms how you learn through real-world challenges and personalized study paths.
          </p>
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Demo <ArrowRight size={16} />
          </Link>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold text-white mb-6">Platform</h3>
          <div className="space-y-3">
            <Link to="/app/study" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Study Hub</Link>
            <Link to="/app/challenges" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Challenges</Link>
            <Link to="/app/community" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Community</Link>
            <Link to="/app/profile" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Profile</Link>
          </div>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="font-semibold text-white mb-6">Resources</h3>
          <div className="space-y-3">
            <a href="#features" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-[#AC5757] transition-colors">How it Works</a>
            <a href="#testimonials" className="block text-gray-300 hover:text-[#AC5757] transition-colors">Testimonials</a>
          </div>
        </div>

        {/* Demo & Contact */}
        <div>
          <h3 className="font-semibold text-white mb-6">Get Started</h3>
          <div className="space-y-3 mb-6">
            <div className="text-gray-300">
              <div className="text-sm font-medium mb-2">Demo Credentials:</div>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm border border-gray-700">
                <div className="text-gray-400">Email:</div>
                <div className="text-white mb-1">ahmed.almansouri@demo.com</div>
                <div className="text-gray-400">Password:</div>
                <div className="text-white">demo123</div>
              </div>
            </div>
          </div>
          <div className="text-gray-300">
            <a href="mailto:hello@axora.app" className="text-[#AC5757] hover:text-[#8A4A4A] transition-colors">
              hello@axora.app
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 AXORA. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;