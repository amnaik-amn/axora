import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Container, Section } from '../components/layout';
import Footer from '../components/Footer';
import { useScrollPosition } from '../hooks';
import { FEATURES, STATS, TESTIMONIALS } from '../constants/content';

// Typewriter effect component
const TypewriterText = ({ text, speed = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};


const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isPastHero, setIsPastHero] = useState(false);
  const isScrolled = useScrollPosition();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'testimonials'];
      const scrollPosition = window.scrollY + 100;

      // Check if we've scrolled past the hero image
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsPastHero(window.scrollY > heroBottom - 100);
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          } else {
            setActiveSection('');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md shadow-sm' : ''
      }`} style={{ backgroundColor: '#F3E9E7' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button - Left Side */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Nav - Right Side */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <a 
                href="#features" 
                className={`transition-colors font-medium px-4 py-2 rounded-lg text-sm ${
                  !isPastHero 
                    ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                    : activeSection === 'features' 
                      ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                      : 'text-[#AC5757] bg-red-100 cursor-default'
                }`}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className={`transition-colors font-medium px-4 py-2 rounded-lg text-sm ${
                  !isPastHero 
                    ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                    : activeSection === 'how-it-works' 
                      ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                      : 'text-[#AC5757] bg-red-100 cursor-default'
                }`}
              >
                How it Works
              </a>
              <a 
                href="#testimonials" 
                className={`transition-colors font-medium px-4 py-2 rounded-lg text-sm ${
                  !isPastHero 
                    ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                    : activeSection === 'testimonials' 
                      ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                      : 'text-[#AC5757] bg-red-100 cursor-default'
                }`}
              >
                Testimonials
              </a>
              <Link 
                to="/login" 
                className={`transition-colors font-medium text-sm px-2 ${
                  !isPastHero 
                    ? 'text-gray-700 hover:text-[#AC5757]' 
                    : activeSection ? 'text-[#AC5757]' : 'text-gray-700 hover:text-[#AC5757]'
                }`}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="w-16 h-16 rounded-full font-semibold transition-colors flex items-center justify-center text-xs bg-[#AC5757] text-white hover:bg-[#8A4A4A]"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden" style={{ backgroundColor: '#F3E9E7' }}>
              <div className="px-4 py-4 space-y-3">
                <a 
                  href="#features" 
                  className={`block transition-colors font-medium px-3 py-2 rounded-lg ${
                    !isPastHero 
                      ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                      : activeSection === 'features' 
                        ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                        : 'text-[#AC5757] bg-red-100 cursor-default'
                  }`}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className={`block transition-colors font-medium px-3 py-2 rounded-lg ${
                    !isPastHero 
                      ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                      : activeSection === 'how-it-works' 
                        ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                        : 'text-[#AC5757] bg-red-100 cursor-default'
                  }`}
                >
                  How it Works
                </a>
                <a 
                  href="#testimonials" 
                  className={`block transition-colors font-medium px-3 py-2 rounded-lg ${
                    !isPastHero 
                      ? 'text-gray-700 hover:text-[#AC5757] bg-white hover:bg-gray-100' 
                      : activeSection === 'testimonials' 
                        ? 'text-black hover:text-gray-600 bg-white hover:bg-gray-100' 
                        : 'text-[#AC5757] bg-red-100 cursor-default'
                  }`}
                >
                  Testimonials
                </a>
                <Link 
                  to="/login" 
                  className={`block transition-colors font-medium text-center ${
                    !isPastHero 
                      ? 'text-gray-700 hover:text-[#AC5757]' 
                      : activeSection ? 'text-[#AC5757]' : 'text-gray-700 hover:text-[#AC5757]'
                  }`}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-16 h-16 rounded-full font-semibold text-center transition-colors flex items-center justify-center mx-auto text-xs bg-[#AC5757] text-white hover:bg-[#8A4A4A]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <Section background="bg-white" padding="pt-32 pb-20" className="hero-section">
        {/* Full Scale Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/Gemini_Generated_Image_waduttwaduttwadu.png')`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          ></div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/20"></div>
        </div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        
        <div className="relative z-10 text-center mt-16">
          {/* AXORA Logo */}
          <div className="mb-8">
            <span className="font-oswald font-medium text-[#5C1A1A]" style={{ fontSize: '12rem' }}>
              AXORA
            </span>
          </div>
          
          <div className="mt-32">
            <h1 className="font-judson text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Learn. Build.
              <span className="text-[#AC5757]"> Level Up.</span>
            </h1>
            
            <p className="text-base text-black mb-8 max-w-2xl mx-auto bg-white px-8 py-4 rounded-lg shadow-lg">
              <TypewriterText 
                text="An AI-guided study workspace that pairs your education with real-world challenges—so you learn faster and earn XP while you do it."
                speed={20}
                className="font-mono"
              />
            </p>

            <div className="flex justify-center gap-4 mb-12">
              <Link to="/login?role=learner" className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors shadow-lg">
                Launch Learner Demo <ArrowRight size={20} />
              </Link>
              <Link to="/educator-login" className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors shadow-lg">
                Launch Educator Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="bg-white">
        {/* Stats Preview - Now positioned above the title */}
        <div className="max-w-4xl mx-auto px-4 -mt-12 mb-12">
          <div className="p-4 md:p-6 border-8 border-[#AC5757] rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#8C4947]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Section.Header 
          title="Master Your Field with AXORA"
          subtitle="Revolutionary features that transform education through artificial intelligence and immersive virtual reality"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#AC5757]/20 to-[#AC5757]/5 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                  <Icon className="text-[#AC5757]" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
              <div className="w-20 h-20 bg-gradient-to-br from-[#AC5757] to-[#8A4A4A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-2xl font-black" style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '1px'
                }}>
                  {item.step}
                </span>
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
            Join AXORA today
          </p>
          
          {/* Demo Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/login?role=learner" className="inline-flex items-center gap-2 bg-white text-[#AC5757] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Launch Learner Demo <ArrowRight size={20} />
            </Link>
            <Link to="/educator-login" className="inline-flex items-center gap-2 bg-white text-[#AC5757] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Launch Educator Demo <ArrowRight size={20} />
            </Link>
          </div>
          
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Landing;