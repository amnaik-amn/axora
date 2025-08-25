import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Users, 
  Zap, 
  Globe, 
  ChevronRight, 
  Play,
  Check,
  Star,
  ArrowRight,
  Brain,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Menu,
  X
} from 'lucide-react';
import Footer from '../components/Footer';

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized study paths that adapt to your learning style and pace',
      color: 'bg-purple-500'
    },
    {
      icon: Trophy,
      title: 'Real-World Challenges',
      description: 'Complete projects that matter and build a portfolio employers love',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with professors and peers in focused study groups',
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Visual insights into your learning journey with XP and achievements',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Students' },
    { value: '500+', label: 'Challenges' },
    { value: '95%', label: 'Success Rate' },
    { value: '4.9', label: 'App Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      content: 'AXORA transformed how I learn. The AI recommendations are spot-on, and I love earning XP for real projects.',
      rating: 5
    },
    {
      name: 'Prof. Michael Davis',
      role: 'Data Science Professor',
      content: 'Finally, a platform that bridges the gap between academic learning and industry skills. My students are more engaged than ever.',
      rating: 5
    },
    {
      name: 'Alex Johnson',
      role: 'Engineering Student',
      content: 'The challenges helped me land my dream internship. Employers were impressed by my project portfolio.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link 
                to="/login" 
                className="bg-brand text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 hover:bg-brand/90"
              >
                Get Started
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-brand transition-colors">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-brand transition-colors">How it Works</a>
              <a href="#testimonials" className="block text-gray-700 hover:text-brand transition-colors">Testimonials</a>
              <Link 
                to="/login" 
                className="block bg-brand text-white px-6 py-2 rounded-full font-medium text-center hover:bg-brand/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gray-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand rounded-full filter blur-3xl opacity-20 animate-pulse" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
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
              <Link 
                to="/login"
                className="bg-brand text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-brand/90 flex items-center justify-center gap-2"
              >
                Launch Demo <ArrowRight size={20} />
              </Link>
              <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium text-lg hover:border-brand hover:text-brand transition-all flex items-center justify-center gap-2">
                <Play size={20} /> Watch Demo
              </button>
            </div>

            <div className="text-sm text-gray-500">
              No credit card required • Use preset demo login
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border-2 border-brand/20 p-1">
              <div className="bg-white rounded-xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-brand">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to accelerate your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Tell Us Your Journey</h3>
              <p className="text-gray-600">Pick your courses and interests to get personalized recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Get Tailored Content</h3>
              <p className="text-gray-600">Resources, tests, and projects automatically adapt to your level</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Earn XP & Level Up</h3>
              <p className="text-gray-600">Complete challenges, track progress, and unlock opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-4">
              Loved by Students & Educators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands who've transformed their learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join AXORA today and start earning XP while mastering real-world skills
          </p>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto mb-8">
            <p className="text-white font-medium mb-2">Demo Credentials</p>
            <div className="bg-white/10 rounded-lg p-3 text-white/90 font-mono text-sm">
              Email: student@demo.com<br />
              Password: demo123
            </div>
          </div>
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-brand px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
          >
            Launch Demo Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;