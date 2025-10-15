import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';

const Support = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I access my course materials?',
      answer: 'You can access all your course materials through the Study tab. Navigate to Resources, and you\'ll find your assigned materials, AI-tailored content, and study groups.'
    },
    {
      id: 2,
      question: 'How does the AI-tailored content work?',
      answer: 'Our AI analyzes your learning patterns, progress, and preferences to recommend personalized study materials, practice tests, and resources that match your current level and goals.'
    },
    {
      id: 3,
      question: 'Can I join study groups with other students?',
      answer: 'Yes! You can join study groups through the Community tab. You can also create your own study groups and invite fellow students to collaborate.'
    },
    {
      id: 4,
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email to reset your password.'
    },
    {
      id: 5,
      question: 'What types of challenges are available?',
      answer: 'We offer various challenges including spatial reasoning tests, architecture knowledge quizzes, design challenges, and practice exams for professional certifications like ARE and NCARB.'
    },
    {
      id: 6,
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked and displayed on your Profile page. You can see your XP, current streak, completed courses, and performance analytics.'
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Support request submitted! We\'ll get back to you within 24 hours.');
    setSupportForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleFormChange = (e) => {
    setSupportForm({
      ...supportForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="SUPPORT"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={false}
        hideNotificationIcon={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-8">
          <div className="flex">
            {[
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'chat', label: 'Live Chat', icon: MessageCircle },
              { id: 'email', label: 'Email Support', icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#AC5757] text-white rounded-t-2xl'
                      : 'text-gray-600 hover:text-[#AC5757]'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              {/* Search FAQs */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                  />
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown size={20} className="text-[#AC5757]" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#AC5757]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={40} className="text-[#AC5757]" />
              </div>
              <h2 className="font-judson text-3xl font-bold text-gray-900 mb-4">Live Chat Support</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get instant help from our support team. Available 24/7 to assist with any questions or issues.
              </p>
              <button className="bg-[#AC5757] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors">
                Start Live Chat
              </button>
              <div className="mt-6 text-sm text-gray-500">
                Average response time: 2 minutes
              </div>
            </div>
          </div>
        )}

        {/* Email Support Tab */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="font-judson text-3xl font-bold text-gray-900 mb-6 text-center">Email Support</h2>
            
            <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={supportForm.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={supportForm.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={supportForm.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={supportForm.message}
                  onChange={handleFormChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent resize-none"
                  placeholder="Please describe your issue or question in detail..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#AC5757] text-white py-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              We typically respond within 24 hours. For urgent issues, please use live chat.
            </div>
          </div>
        )}

        {/* Quick Contact */}
        <div className="bg-[#AC5757] rounded-2xl p-8 text-white text-center">
          <h3 className="font-judson text-2xl font-bold mb-4">Need immediate help?</h3>
          <p className="mb-6 opacity-90">Contact us directly for urgent support</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@axora.app"
              className="inline-flex items-center gap-2 bg-white text-[#AC5757] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail size={20} />
              support@axora.app
            </a>
            <a
              href="tel:+97317123456"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <Phone size={20} />
              +973 1712 3456
            </a>
          </div>
        </div>
      </div>

      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Support;