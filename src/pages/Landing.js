import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Play,
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

import { Button, Card } from '../components/ui';
import { Container, Section } from '../components/layout';
import Footer from '../components/Footer';
import { useScrollPosition } from '../hooks';
import { FEATURES, STATS, TESTIMONIALS } from '../constants/content';

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-white border-b border-gray-200'
      }`}>
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="font-oswald font-medium text-[#AC5757] text-[38px]">
                AXORA
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-[#AC5757] transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-[#AC5757] transition-colors font-medium">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#AC5757] transition-colors font-medium">Testimonials</a>
              <Link to="/login" className="text-gray-700 hover:text-[#AC5757] transition-colors font-medium">
                Log In
              </Link>
              <Link to="/signup" className="bg-[#AC5757] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block text-gray-700 hover:text-[#AC5757] transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="block text-gray-700 hover:text-[#AC5757] transition-colors font-medium">How it Works</a>
                <a href="#testimonials" className="block text-gray-700 hover:text-[#AC5757] transition-colors font-medium">Testimonials</a>
                <Link to="/login" className="block text-gray-700 hover:text-[#AC5757] transition-colors font-medium text-center">
                  Log In
                </Link>
                <Link to="/signup" className="block bg-[#AC5757] text-white px-6 py-2.5 rounded-lg font-semibold text-center hover:bg-[#8A4A4A] transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </Container>
      </nav>

      {/* Hero Section */}
      <Section background="bg-white" padding="pt-32 pb-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 bg-[#AC5757]/10 text-[#AC5757] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>✨</span>
            AI-Powered Education Platform
          </div>
          
          <h1 className="font-judson text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Learn. Build.
            <span className="text-[#AC5757]"> Level Up.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            An AI-guided study workspace that pairs your classes with real-world challenges—so you learn faster and earn XP while you do it.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <Link to="/login?role=learner" className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors">
              Launch Learner Demo <ArrowRight size={20} />
            </Link>
            <Link to="/educator-login" className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors">
              Launch Educator Demo <ArrowRight size={20} />
            </Link>
          </div>



          {/* Stats Preview */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-[#AC5757]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="bg-gray-100">
        <Section.Header 
          title="Everything You Need to Excel"
          subtitle="Powerful features designed to accelerate your learning journey"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                <div className="w-14 h-14 bg-[#AC5757]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-[#AC5757]" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" background="bg-white">
        <Section.Header 
          title="How It Works"
          subtitle="Get started in minutes and transform your learning experience"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Tell Us Your Journey', desc: 'Pick your courses and interests to get personalized recommendations' },
            { step: 2, title: 'Get Tailored Content', desc: 'Resources, tests, and projects automatically adapt to your level' },
            { step: 3, title: 'Earn XP & Level Up', desc: 'Complete challenges, track progress, and unlock opportunities' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 bg-[#AC5757] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" background="bg-gray-100">
        <Section.Header 
          title="Loved by Students & Educators"
          subtitle="Join thousands who've transformed their learning experience"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-[#AC5757]" size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="bg-[#AC5757]" padding="py-20">
        <div className="text-center text-white">
          <h2 className="font-judson text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join AXORA today and start earning XP while mastering real-world skills
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm max-w-2xl mx-auto mb-8 rounded-xl p-6">
            <p className="text-white font-semibold mb-3">Demo Credentials</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm mb-2">Learner Demo:</p>
                <div className="bg-black/20 rounded-lg p-3 text-white font-mono text-xs">
                  Email: ahmed.almansouri@demo.com<br />
                  Password: demo123
                </div>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-2">Educator Demo:</p>
                <div className="bg-black/20 rounded-lg p-3 text-white font-mono text-xs">
                  Email: prof.sarah@demo.com<br />
                  Password: prof123
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Landing;