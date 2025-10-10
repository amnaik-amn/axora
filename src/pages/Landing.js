import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Section } from '../components/layout';
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
      const scrollPosition = window.scrollY + 100;

      // Check if we've scrolled past the hero image
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsPastHero(window.scrollY > heroBottom - 100);
      }

      // Get all section positions
      const featuresSection = document.getElementById('features');
      const howItWorksSection = document.getElementById('how-it-works');
      const testimonialsSection = document.getElementById('testimonials');

      // Determine active section based on ranges between sections
      if (featuresSection && howItWorksSection && testimonialsSection) {
        const featuresStart = featuresSection.offsetTop;
        const howItWorksStart = howItWorksSection.offsetTop;
        const testimonialsStart = testimonialsSection.offsetTop;

        if (scrollPosition >= testimonialsStart) {
          // From testimonials section onwards
          setActiveSection('testimonials');
        } else if (scrollPosition >= howItWorksStart - 200) {
          // From how-it-works section to testimonials section (includes marquees)
          setActiveSection('how-it-works');
        } else if (scrollPosition >= featuresStart) {
          // From features section to how-it-works section
          setActiveSection('features');
          } else {
          // Before features section
            setActiveSection('');
        }
      }
    };

    // Handle smooth scrolling for navigation links
    const handleNavClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        
        if (targetId === 'how-it-works') {
          // For "How It Works", scroll to show both marquees
          const topMarquee = document.querySelector('.top-marquee');
          if (topMarquee) {
            // Set active section immediately
            setActiveSection('how-it-works');
            // Scroll to the very top of the marquee section
            const scrollTop = topMarquee.offsetTop - 20; // 20px offset from the very top
            window.scrollTo({
              top: scrollTop,
              behavior: 'smooth'
            });
          }
        } else {
          // For other sections, use normal scroll behavior
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleNavClick);
    
    // Multi-card hover effect
    const cardsContainer = document.getElementById('feature-cards');
    if (cardsContainer) {
      const cards = Array.from(cardsContainer.querySelectorAll('.feature-card'));

      const updatePositions = (clientX, clientY) => {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          card.style.setProperty('--x', x + 'px');
          card.style.setProperty('--y', y + 'px');
        });
      };

      const handleMouseMove = (e) => {
        updatePositions(e.clientX, e.clientY);
      };

      const handleTouchMove = (e) => {
        const t = e.touches[0];
        if (!t) return;
        updatePositions(t.clientX, t.clientY);
      };

      const hideAll = () => {
        cards.forEach(card => {
          card.style.setProperty('--x', '-100px');
          card.style.setProperty('--y', '-100px');
        });
      };

      cardsContainer.addEventListener('mousemove', handleMouseMove);
      cardsContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      cardsContainer.addEventListener('mouseleave', hideAll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleNavClick);
        cardsContainer.removeEventListener('mousemove', handleMouseMove);
        cardsContainer.removeEventListener('touchmove', handleTouchMove);
        cardsContainer.removeEventListener('mouseleave', hideAll);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'url(/assets/landingbackground.png?v=6)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center top', 
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md shadow-sm' : ''
      }`} style={{ backgroundColor: 'rgba(243, 233, 231, 0.95)' }}>
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
                    ? 'text-[#AC5757] hover:text-[#8A4A4A]' 
                    : activeSection ? 'text-[#AC5757]' : 'text-[#AC5757] hover:text-[#8A4A4A]'
                }`}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm bg-[#AC5757] text-white hover:bg-[#8A4A4A]"
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
                      ? 'text-[#AC5757] hover:text-[#8A4A4A]' 
                      : activeSection ? 'text-[#AC5757]' : 'text-[#AC5757] hover:text-[#8A4A4A]'
                  }`}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-6 py-3 rounded-lg font-semibold text-center transition-colors flex items-center justify-center mx-auto text-sm bg-[#AC5757] text-white hover:bg-[#8A4A4A]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <Section background="bg-transparent" padding="pt-60 sm:pt-40 pb-20" className="hero-section">
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
        
        <div className="relative z-10 text-center mt-9 sm:mt-16 px-4">
          {/* AXORA Logo */}
          <div className="mb-8">
            <span className="font-oswald font-medium text-[#5C1A1A] whitespace-nowrap" style={{ fontSize: 'clamp(4rem, 10vw + 2rem, 12rem)' }}>
              AXORA
            </span>
          </div>
          
          <div className="mt-[100px]">
            <h1 className="font-judson font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg whitespace-nowrap" style={{ fontSize: 'clamp(2rem, 5vw + 1rem, 4.05rem)' }}>
              Learn. Build.
              <span className="text-[#AC5757]"> Level Up.</span>
            </h1>
            
            <p className="text-black mb-6 sm:mb-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.5rem, 1rem)', padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)' }}>
              <TypewriterText 
                text="An AI-guided study workspace that pairs your education with real-world challenges—so you learn faster and earn XP while you do it."
                speed={20}
                className="font-mono"
              />
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link to="/login?role=learner" className="inline-flex items-center justify-center gap-2 bg-[#AC5757] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors shadow-lg text-sm sm:text-base">
                Launch Learner Demo <ArrowRight size={18} />
              </Link>
              <Link to="/educator-login" className="inline-flex items-center justify-center gap-2 bg-[#AC5757] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors shadow-lg text-sm sm:text-base">
                Launch Educator Demo <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="bg-[#F4E9E7]">
        {/* Stats Preview - Now positioned above the title */}
        <div className="max-w-4xl mx-auto px-4 -mt-12 mb-12">
          <div className="p-4 md:p-6 border-8 border-[#814544] rounded-lg">
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
        {/* Axora summary section*/}
        <div className="mb-16 text-center">
          <h2 className="font-judson text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Your Field with <span className="font-oswald font-medium text-[#5C1A1A]">AXORA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionary features that transform education through artificial intelligence and immersive virtual reality
          </p>
        </div>

        <div className="feature-cards" id="feature-cards">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card" tabIndex="0">
                <div className="feature-card__border"></div>
                <div className="feature-card__content">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#AC5757]/20 to-[#AC5757]/5 rounded-3xl flex items-center justify-center mb-4 mx-auto">
                  <Icon className="text-[#AC5757]" size={28} />
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{feature.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{feature.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Icon Marquee - Above How It Works */}
      <div className="bg-[#F4E9E7] py-8 top-marquee">
        {/* Icon Marquee - Full Screen Width */}
        <div className="relative w-screen -mx-6 overflow-hidden">
          <div className="flex gap-4 animate-marquee w-max">
            {/* First set of 5 icons */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Duplicate set for seamless loop */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Duplicate sets for seamless infinite flow */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Additional sets for complete coverage */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Additional sets to match top marquee */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Massive duplicate sets for constant filling */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <Section id="how-it-works" background="bg-[#F4E9E7]" className="py-14">
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
                <span className="text-white font-black" style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '1px',
                  fontSize: '36px'
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

      {/* Bottom Icon Marquee - Outside Section for full width */}
      <div className="bg-[#F4E9E7] py-8">
        <div className="relative w-screen -mx-6 overflow-hidden">
          <div className="flex gap-4 animate-marquee w-max">
            {/* First set of 5 icons */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Duplicate set for seamless loop */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Duplicate sets for seamless infinite flow */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Additional sets for complete coverage */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Additional sets to match top marquee */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            {/* Massive duplicate sets for constant filling */}
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
            </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
            </Link>
            
            <Link to="/app/study-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/studyicon.png" alt="Study" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>STUDY</h4>
            </Link>
            <Link to="/app/challenges-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/challengesicon.png" alt="Challenges" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>CHALLENGES</h4>
            </Link>
            <Link to="/app/community-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/communityicon.png" alt="Community" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>COMMUNITY</h4>
            </Link>
            <Link to="/app/pinup-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/pinupicon.png" alt="Pin Up" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PIN UP</h4>
              </Link>
            <Link to="/app/progress-demo" className="flex-shrink-0 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 w-36 flex flex-col justify-center items-center" style={{ backgroundColor: '#9d0a06' }}>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-2">
                <img src="/assets/progressicon.png" alt="Progress" className="w-20 h-20 object-contain" />
              </div>
              <h4 className="font-bold text-white text-xl text-center" style={{ fontFamily: 'serif' }}>PROGRESS</h4>
              </Link>
            </div>
          </div>
        </div>

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