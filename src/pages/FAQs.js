import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, ArrowLeft, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const FAQs = () => {
  const navigate = useNavigate();
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  // const user = signupUser || demoUser;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleLogout = () => {
    // Clear authentication
    logout();
    // Clear signup user data
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    // Clear onboarding completion so user goes through questions again
    localStorage.removeItem('onboardingComplete');
    // Redirect to login
    window.location.href = '/login';
  };

  const handleBack = () => {
    navigate('/app/help-support');
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqs = [
    {
      category: "Subscription Plans",
      questions: [
        {
          question: "What subscription plans are available?",
          answer: "We offer three main plans: Free (basic features), Premium ($9.99/month with advanced features), and Pro ($19.99/month with full access to all features including VR modules and priority support)."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
        },
        {
          question: "Do you offer student discounts?",
          answer: "Yes! We offer 50% off for students with valid .edu email addresses. Contact support@axora.app with your student ID for verification."
        },
        {
          question: "What happens to my data if I cancel?",
          answer: "Your data remains accessible for 30 days after cancellation. You can download your data anytime during this period. After 30 days, data is permanently deleted."
        }
      ]
    },
    {
      category: "Certificates and Credentials",
      questions: [
        {
          question: "How do I earn certificates?",
          answer: "Complete courses with a passing grade of 80% or higher. Certificates are automatically generated and can be downloaded from your profile under 'Achievements'."
        },
        {
          question: "Are certificates recognized by employers?",
          answer: "Yes, our certificates are industry-recognized and can be shared on LinkedIn. They include verification codes that employers can use to verify authenticity."
        },
        {
          question: "Can I retake courses to improve my grade?",
          answer: "Yes, you can retake any course up to 3 times. Your highest score will be used for certificate eligibility."
        },
        {
          question: "How long are certificates valid?",
          answer: "Certificates don't expire, but we recommend staying updated with new course content as technology evolves."
        }
      ]
    },
    {
      category: "Payment Methods",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for institutional accounts."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and don't store your payment details. All transactions are processed through secure payment processors."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 30-day money-back guarantee for new subscriptions. Contact support within 30 days of your first payment for a full refund."
        },
        {
          question: "Do you offer annual billing discounts?",
          answer: "Yes! Annual subscriptions save you 20% compared to monthly billing. You can switch to annual billing anytime from your account settings."
        }
      ]
    },
    {
      category: "Data Privacy and Profile Settings",
      questions: [
        {
          question: "How is my personal data protected?",
          answer: "We follow GDPR and CCPA compliance standards. Your data is encrypted in transit and at rest, and we never sell your personal information to third parties."
        },
        {
          question: "Can I control who sees my profile?",
          answer: "Yes, you can set your profile visibility to Public, Connections Only, or Private in your Privacy & Security settings."
        },
        {
          question: "How do I delete my account?",
          answer: "Go to Privacy & Security → Data Access → Delete My Account & Data. This action is permanent and cannot be undone."
        },
        {
          question: "Can I download my data?",
          answer: "Yes, you can download all your data including courses, progress, and certificates from Privacy & Security → Data Access → Download My Data."
        },
        {
          question: "What information is shared with other users?",
          answer: "Only information you choose to make public is visible to others. You control what's shared through your privacy settings."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What are the system requirements?",
          answer: "AXORA works on Windows 10+, macOS 10.15+, and modern browsers (Chrome, Firefox, Safari, Edge). VR features require compatible VR headsets."
        },
        {
          question: "Why is my video not loading?",
          answer: "Check your internet connection and try refreshing the page. If issues persist, clear your browser cache or try a different browser."
        },
        {
          question: "How do I enable VR features?",
          answer: "VR features require a compatible headset. Connect your headset and enable VR mode in the course settings. Make sure your browser supports WebXR."
        },
        {
          question: "Can I use AXORA on mobile?",
          answer: "Yes, AXORA is fully responsive and works on mobile devices. However, some advanced features like VR require desktop or laptop computers."
        }
      ]
    },
    {
      category: "Course Content",
      questions: [
        {
          question: "How often is content updated?",
          answer: "We update course content monthly with the latest industry practices and technology developments. You'll be notified of major updates."
        },
        {
          question: "Can I access courses offline?",
          answer: "Premium and Pro subscribers can download course materials for offline viewing. VR modules require an internet connection."
        },
        {
          question: "Are there prerequisites for courses?",
          answer: "Most courses are designed for beginners, but some advanced courses may have prerequisites. Check the course description for details."
        },
        {
          question: "How long do I have access to courses?",
          answer: "As long as your subscription is active, you have unlimited access to all courses in your plan."
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[38px]">AXORA</h1>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} className="text-white" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[#AC5757] hover:text-[#8A4A4A] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Help & Support</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find quick answers to common questions about AXORA.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all text-lg"
            />
          </div>
        </div>

        {/* FAQs by Category */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#AC5757] px-6 py-4">
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isExpanded = expandedFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle size={20} className="text-[#AC5757] flex-shrink-0" />
                            <span className="font-medium text-gray-900">{faq.question}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-gray-100">
                            <div className="pt-4 text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600 mb-4">Try searching with different keywords or browse all FAQs.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contact Support CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#AC5757] to-[#8A4A4A] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg mb-6 opacity-90">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button
            onClick={() => navigate('/app/help-support')}
            className="px-8 py-3 bg-white text-[#AC5757] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default FAQs;
