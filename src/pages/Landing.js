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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="font-serif text-2xl font-bold text-brand">
                AXORA
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-brand transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-brand transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-brand transition-colors">Testimonials</a>
              <Button as={Link} to="/login">
                Get Started
              </Button>
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
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block text-gray-700 hover:text-brand transition-colors">Features</a>
                <a href="#how-it-works" className="block text-gray-700 hover:text-brand transition-colors">How it Works</a>
                <a href="#testimonials" className="block text-gray-700 hover:text-brand transition-colors">Testimonials</a>
                <Button as={Link} to="/login" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </Container>
      </nav>

      {/* Hero Section */}
      <Section background="bg-gray-50" padding="pt-32 pb-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand rounded-full filter blur-3xl opacity-20 animate-pulse" />
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>✨</span>
            AI-Powered Education Platform
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-ink mb-6 leading-tight">
            Learn. Build.
            <span className="text-brand"> Level Up.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            An AI-guided study workspace that pairs your classes with real-world challenges—so you learn faster and earn XP while you do it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button as={Link} to="/login" variant="secondary" size="lg">
              Launch Demo <ArrowRight size={20} />
            </Button>
            <Button variant="secondary" size="lg">
              <Play size={20} /> Watch Demo
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            No credit card required • Use preset demo login
          </div>

          {/* Stats Preview */}
          <div className="mt-12 max-w-5xl mx-auto">
            <Card className="border-2 border-brand/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-brand">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="bg-gray-50">
        <Section.Header 
          title="Everything You Need to Excel"
          subtitle="Powerful features designed to accelerate your learning journey"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="group">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <Section.Header 
          title="How It Works"
          subtitle="Get started in minutes and transform your learning experience"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Tell Us Your Journey', desc: 'Pick your courses and interests to get personalized recommendations', color: 'bg-brand' },
            { step: 2, title: 'Get Tailored Content', desc: 'Resources, tests, and projects automatically adapt to your level', color: 'bg-purple-600' },
            { step: 3, title: 'Earn XP & Level Up', desc: 'Complete challenges, track progress, and unlock opportunities', color: 'bg-green-600' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg`}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" background="bg-gray-50">
        <Section.Header 
          title="Loved by Students & Educators"
          subtitle="Join thousands who've transformed their learning experience"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <Card key={idx}>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500" size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-bold text-ink">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="bg-brand" padding="py-20">
        <div className="text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join AXORA today and start earning XP while mastering real-world skills
          </p>
          
          <Card className="bg-brand-500 max-w-md mx-auto mb-8">
            <p className="text-white font-medium mb-2">Demo Credentials</p>
            <div className="bg-brand-600 rounded-lg p-3 text-white font-mono text-sm">
              Email: ahmed.almansouri@demo.com<br />
              Password: demo123
            </div>
          </Card>
          
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Landing;