import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, ArrowLeft, Search, BookOpen, Play, MessageCircle, FileText, Video, HelpCircle, Phone, Mail, AlertTriangle, Lightbulb, Shield, ExternalLink, Heart, X } from 'lucide-react';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const HelpSupport = () => {
  const navigate = useNavigate();
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  const user = signupUser || demoUser;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    category: '',
    subject: '',
    message: ''
  });
  const [showSecurityReport, setShowSecurityReport] = useState(false);
  const [securityReport, setSecurityReport] = useState({
    subject: '',
    message: ''
  });

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
    navigate('/app/profile');
  };

  const handleSubmitRequest = () => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }
    setContactForm(prev => ({
      ...prev,
      category: selectedCategory
    }));
    setShowContactForm(true);
  };

  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendSupport = () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`[${contactForm.category}] ${contactForm.subject}`);
    const body = encodeURIComponent(
      `Category: ${contactForm.category}\n\n` +
      `Subject: ${contactForm.subject}\n\n` +
      `Message:\n${contactForm.message}\n\n` +
      `---\n` +
      `User: ${user?.name || 'Unknown'}\n` +
      `Email: ${user?.email || 'Unknown'}\n` +
      `Submitted: ${new Date().toLocaleString()}`
    );
    
    const mailtoLink = `mailto:support@axora.app?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    // Reset form and close popup
    setContactForm({ category: '', subject: '', message: '' });
    setShowContactForm(false);
    setSelectedCategory('');
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    const drafts = JSON.parse(localStorage.getItem('supportDrafts') || '[]');
    const draft = {
      id: Date.now(),
      ...contactForm,
      createdAt: new Date().toISOString()
    };
    drafts.push(draft);
    localStorage.setItem('supportDrafts', JSON.stringify(drafts));
    
    alert('Draft saved successfully!');
    setShowContactForm(false);
  };

  const handleCancelForm = () => {
    setShowContactForm(false);
    setContactForm({ category: '', subject: '', message: '' });
  };

  const handleSecurityReportChange = (field, value) => {
    setSecurityReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendSecurityReport = () => {
    if (!securityReport.subject.trim() || !securityReport.message.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`[SECURITY] ${securityReport.subject}`);
    const body = encodeURIComponent(
      `Subject: ${securityReport.subject}\n\n` +
      `Message:\n${securityReport.message}\n\n` +
      `---\n` +
      `User: ${user?.name || 'Unknown'}\n` +
      `Email: ${user?.email || 'Unknown'}\n` +
      `Submitted: ${new Date().toLocaleString()}`
    );
    
    const mailtoLink = `mailto:it@axora.app?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    // Reset form and close popup
    setSecurityReport({ subject: '', message: '' });
    setShowSecurityReport(false);
  };

  const handleSaveSecurityDraft = () => {
    // Save to localStorage
    const drafts = JSON.parse(localStorage.getItem('securityDrafts') || '[]');
    const draft = {
      id: Date.now(),
      ...securityReport,
      createdAt: new Date().toISOString()
    };
    drafts.push(draft);
    localStorage.setItem('securityDrafts', JSON.stringify(drafts));
    
    alert('Draft saved successfully!');
    setShowSecurityReport(false);
  };

  const handleCancelSecurityReport = () => {
    setShowSecurityReport(false);
    setSecurityReport({ subject: '', message: '' });
  };

  const supportCategories = [
    'Technical Issue',
    'Account or Login',
    'Payment or Billing',
    'Content or Course Issue',
    'Feedback or Suggestions'
  ];

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
          <span className="font-medium">Back to Profile</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h2>
          <p className="text-gray-600 text-lg">Get the help you need to make the most of your AXORA experience.</p>
        </div>

        {/* 1. Quick Help */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Search size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">1. Quick Help</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Help Center */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Help Center</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Browse our <span className="text-[#AC5757] font-semibold cursor-pointer hover:underline">Knowledge Base</span> to find step-by-step guides on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Setting up your account and profile</li>
                  <li>Enrolling in courses and certifications</li>
                  <li>Joining a Studio or Pin-Up session</li>
                  <li>Managing AI recommendations and VR tools</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Search articles by keyword or browse by category.
                </p>
              </div>

              {/* Getting Started Guide */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Play size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Getting Started Guide</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  New to Axora? Start here → <span className="text-[#AC5757] font-semibold cursor-pointer hover:underline">Onboarding Guide</span>
                </p>
                <p className="text-gray-600">
                  Walk through account setup, verification, and your first course in under five minutes.
                </p>
              </div>

              {/* Live Chat Assistant */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Live Chat Assistant</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Need help now? Chat with our AI-powered assistant available 24/7.
                </p>
                <p className="text-gray-600">
                  If your issue isn't resolved, we'll connect you to a human support agent within minutes.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Look for the chat icon in the bottom-right corner of your screen to start chatting with our AI assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Support Requests */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">2. Support Requests</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Submit a Request */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Submit a Request</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Use the form below to reach our team. Choose a category:
                </p>
                <div className="space-y-2 mb-6">
                  {supportCategories.map((category, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-[#AC5757]"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
                <button 
                  onClick={handleSubmitRequest}
                  className="px-6 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors"
                >
                  Submit → Contact Support
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Tutorials & Learning Assistance */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Video size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">3. Tutorials & Learning Assistance</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Video Tutorials */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Play size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Video Tutorials</h4>
                </div>
                <p className="text-gray-600 mb-4">Watch visual demos on how to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Create and manage Studios</li>
                  <li>Upload and review designs in Pin-Up</li>
                  <li>Use VR/AR learning modules</li>
                  <li>Collaborate and share feedback</li>
                </ul>
                <button className="mt-4 px-6 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors">
                  Watch Tutorials
                </button>
              </div>

              {/* Interactive Walkthroughs */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Interactive Walkthroughs</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  In-app guides appear as tooltips the first time you try a new feature.
                </p>
                <p className="text-gray-600">
                  You can replay them anytime under Settings → Tutorials.
                </p>
              </div>

              {/* FAQs */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">FAQs</h4>
                </div>
                <p className="text-gray-600 mb-4">Find fast answers about:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Subscription plans</li>
                  <li>Certificates and credentials</li>
                  <li>Payment methods</li>
                  <li>Data privacy and profile settings</li>
                </ul>
                <button 
                  onClick={() => navigate('/app/faqs')}
                  className="mt-4 px-6 py-3 border border-[#AC5757] text-[#AC5757] rounded-lg hover:bg-[#AC5757] hover:text-white transition-colors"
                >
                  Browse FAQs
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Contact & Escalation */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Phone size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">4. Contact & Escalation</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Email Support</td>
                      <td className="py-3 px-4 text-gray-600">
                        <span className="text-[#AC5757] font-semibold">support@axora.app</span>
                        <br />
                        <span className="text-sm">— Expect a reply within 24–48 hours.</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Call Support (Premium Users)</td>
                      <td className="py-3 px-4 text-gray-600">
                        Schedule a callback or use our hotline for institutional clients.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Report a Problem</td>
                      <td className="py-3 px-4 text-gray-600">
                        Use <span className="text-[#AC5757] font-semibold cursor-pointer hover:underline">Report an Issue</span> for bugs, broken pages, or content errors.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Safety & Misconduct Reports</td>
                      <td className="py-3 px-4 text-gray-600">
                        Confidentially report harassment, plagiarism, or inappropriate content.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Feedback */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Lightbulb size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">5. Feedback</h3>
              </div>
            </div>
            
            <div className="p-6">
              {/* Feature Requests */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={20} className="text-[#AC5757]" />
                  <h4 className="text-lg font-semibold text-gray-900">Feature Requests</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Have an idea? Submit it through our Feature Request Portal and vote on other users' suggestions.
                </p>
                <button className="px-6 py-3 border border-[#AC5757] text-[#AC5757] rounded-lg hover:bg-[#AC5757] hover:text-white transition-colors">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* 6. Helpful Links */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <ExternalLink size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">6. Helpful Links</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/app/privacy-security')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Shield size={20} className="text-[#AC5757]" />
                  <span className="text-gray-700">Privacy & Security Settings</span>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <FileText size={20} className="text-[#AC5757]" />
                  <span className="text-gray-700">Terms of Service</span>
                </button>
                <button 
                  onClick={() => setShowSecurityReport(true)}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <AlertTriangle size={20} className="text-[#AC5757]" />
                  <span className="text-gray-700">Report a Security Issue</span>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Shield size={20} className="text-[#AC5757]" />
                  <span className="text-gray-700">View Data Policy</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#AC5757] to-[#8A4A4A] rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart size={24} className="text-white" />
              <h3 className="text-2xl font-bold">Our Promise</h3>
            </div>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              We believe in responsive, transparent support. Whether it's a technical bug or a learning roadblock, 
              our mission is to ensure that every Axora user feels empowered, informed, and heard.
            </p>
          </div>
        </section>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Contact Support Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Support</h3>
              <button 
                onClick={handleCancelForm}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {/* Selected Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-gray-900 font-medium">{contactForm.category}</span>
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => handleContactFormChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Brief description of your issue"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleContactFormChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all resize-none"
                  placeholder="Describe your issue to us so we can help you enjoy AXORA"
                />
              </div>

              {/* Email Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Email will be sent to: support@axora.app</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Your message will be sent via your default email client with your user information included.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button 
                onClick={handleCancelForm}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDraft}
                className="flex-1 px-4 py-3 border border-[#AC5757] text-[#AC5757] rounded-lg hover:bg-[#AC5757] hover:text-white transition-colors"
              >
                Save Draft
              </button>
              <button 
                onClick={handleSendSupport}
                className="flex-1 px-4 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Report Modal */}
      {showSecurityReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Report a Security Issue</h3>
              <button 
                onClick={handleCancelSecurityReport}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={securityReport.subject}
                  onChange={(e) => handleSecurityReportChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Brief description of the security issue"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={securityReport.message}
                  onChange={(e) => handleSecurityReportChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all resize-none"
                  placeholder="Please provide detailed information about the security issue you've discovered..."
                />
              </div>

              {/* Email Info */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Email will be sent to: it@axora.app</p>
                    <p className="text-xs text-red-600 mt-1">
                      This is a secure channel for reporting security vulnerabilities and issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button 
                onClick={handleCancelSecurityReport}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSecurityDraft}
                className="flex-1 px-4 py-3 border border-[#AC5757] text-[#AC5757] rounded-lg hover:bg-[#AC5757] hover:text-white transition-colors"
              >
                Save Draft
              </button>
              <button 
                onClick={handleSendSecurityReport}
                className="flex-1 px-4 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;

