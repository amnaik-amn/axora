import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowLeft, Send, HelpCircle, BookOpen, Users, BarChart3, MessageCircle, Settings, FileText, Calendar, Bell, UserCheck, Search, ChevronRight, ExternalLink } from 'lucide-react';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';

const EducatorSupport = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      text: "👋 Hi! I'm your Educator Support Assistant. I can help you navigate the platform, find specific features, or answer questions about your teaching tools. What would you like to know?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Logic - Directs users to specific platform sections
  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Navigation keywords
    if (input.includes('course') || input.includes('lecture') || input.includes('curriculum')) {
      return {
        text: "📚 I can help you with courses! Here are the main course-related features:",
        buttons: [
          { text: "View All Courses", action: "navigate", route: "/educator/study", icon: "📖" },
          { text: "Upload Lecture Video", action: "navigate", route: "/educator/study", icon: "🎥" },
          { text: "Course Discussions", action: "navigate", route: "/educator/study", icon: "💬" }
        ]
      };
    }
    
    if (input.includes('student') || input.includes('pupil') || input.includes('learner')) {
      return {
        text: "👥 Here's how to manage your students:",
        buttons: [
          { text: "Student List & Chat", action: "navigate", route: "/educator/challenges", icon: "👤" },
          { text: "Student Analytics", action: "navigate", route: "/educator/analytics", icon: "📊" },
          { text: "Grade Assignments", action: "navigate", route: "/educator/study", icon: "📝" }
        ]
      };
    }
    
    if (input.includes('analytics') || input.includes('data') || input.includes('report') || input.includes('statistic')) {
      return {
        text: "📊 Access your teaching analytics and reports:",
        buttons: [
          { text: "Dashboard Analytics", action: "navigate", route: "/educator/analytics", icon: "📈" },
          { text: "Student Progress", action: "navigate", route: "/educator/analytics", icon: "📋" },
          { text: "Course Performance", action: "navigate", route: "/educator/analytics", icon: "🎯" }
        ]
      };
    }
    
    if (input.includes('faculty') || input.includes('colleague') || input.includes('collaborate')) {
      return {
        text: "🤝 Connect with your faculty colleagues:",
        buttons: [
          { text: "Faculty Community", action: "navigate", route: "/educator/community", icon: "👥" },
          { text: "Share Resources", action: "navigate", route: "/educator/community", icon: "📤" },
          { text: "Collaborate on Projects", action: "navigate", route: "/educator/community", icon: "🤝" }
        ]
      };
    }
    
    if (input.includes('assignment') || input.includes('homework') || input.includes('task')) {
      return {
        text: "📝 Manage assignments and tasks:",
        buttons: [
          { text: "Create Assignments", action: "navigate", route: "/educator/study", icon: "✏️" },
          { text: "View Submissions", action: "navigate", route: "/educator/challenges", icon: "📄" },
          { text: "Grade Assignments", action: "navigate", route: "/educator/study", icon: "✅" }
        ]
      };
    }
    
    if (input.includes('vr') || input.includes('virtual') || input.includes('immersive')) {
      return {
        text: "🥽 Access VR teaching tools:",
        buttons: [
          { text: "VR Sessions", action: "navigate", route: "/educator/vr", icon: "🥽" },
          { text: "Schedule VR Demo", action: "navigate", route: "/educator/vr", icon: "📅" },
          { text: "VR Analytics", action: "navigate", route: "/educator/vr", icon: "📊" }
        ]
      };
    }
    
    if (input.includes('notification') || input.includes('alert') || input.includes('message')) {
      return {
        text: "🔔 Manage your notifications and messages:",
        buttons: [
          { text: "View Notifications", action: "navigate", route: "/educator/notifications", icon: "🔔" },
          { text: "Messages", action: "navigate", route: "/educator/messages", icon: "💬" },
          { text: "Settings", action: "navigate", route: "/educator/profile", icon: "⚙️" }
        ]
      };
    }
    
    if (input.includes('profile') || input.includes('account') || input.includes('settings')) {
      return {
        text: "👤 Manage your profile and account:",
        buttons: [
          { text: "Edit Profile", action: "navigate", route: "/educator/profile", icon: "✏️" },
          { text: "Account Settings", action: "navigate", route: "/educator/profile", icon: "⚙️" },
          { text: "Preferences", action: "navigate", route: "/educator/profile", icon: "🎛️" }
        ]
      };
    }
    
    // Default response with quick actions
    return {
      text: "I'm here to help! Here are some quick actions to get you started:",
      buttons: [
        { text: "Course Management", action: "navigate", route: "/educator/study", icon: "📚" },
        { text: "Student Overview", action: "navigate", route: "/educator/challenges", icon: "👥" },
        { text: "Analytics Dashboard", action: "navigate", route: "/educator/analytics", icon: "📊" },
        { text: "Faculty Community", action: "navigate", route: "/educator/community", icon: "🤝" },
        { text: "VR Tools", action: "navigate", route: "/educator/vr", icon: "🥽" },
        { text: "Profile Settings", action: "navigate", route: "/educator/profile", icon: "⚙️" }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse.text,
        buttons: aiResponse.buttons,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleButtonClick = (button) => {
    if (button.action === 'navigate') {
      navigate(button.route);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          
          <h1 className="font-oswald font-medium text-white text-[70px]">AXORA</h1>
          
          <button 
            onClick={() => navigate('/educator')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={29} className="text-white" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Educator Support Hub</h2>
          <p className="text-gray-600 text-xl">Your AI-powered navigation assistant for the platform</p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-[#AC5757] rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Support Assistant</h3>
                <p className="text-white/80 text-sm">Ask me anything about the platform</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-[#AC5757] text-white ml-12' 
                      : 'bg-gray-100 text-gray-900 mr-12'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    
                    {/* Action Buttons */}
                    {message.buttons && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {message.buttons.map((button, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleButtonClick(button)}
                            className="flex items-center gap-2 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-left"
                          >
                            <span>{button.icon}</span>
                            <span className="text-sm font-medium">{button.text}</span>
                            <ChevronRight size={16} className="ml-auto" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl mr-12">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about courses, students, analytics, or any platform feature..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#AC5757] focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-6 py-3 bg-[#AC5757] text-white rounded-xl hover:bg-[#8A4A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={24} className="text-[#AC5757]" />
              <h3 className="font-semibold text-gray-900">Course Management</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Manage your courses, upload lectures, and create discussions.</p>
            <button 
              onClick={() => navigate('/educator/study')}
              className="text-[#AC5757] text-sm font-medium hover:underline flex items-center gap-1"
            >
              Go to Courses <ExternalLink size={16} />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} className="text-[#AC5757]" />
              <h3 className="font-semibold text-gray-900">Student Management</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">View students, chat with them, and track their progress.</p>
            <button 
              onClick={() => navigate('/educator/challenges')}
              className="text-[#AC5757] text-sm font-medium hover:underline flex items-center gap-1"
            >
              Go to Students <ExternalLink size={16} />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 size={24} className="text-[#AC5757]" />
              <h3 className="font-semibold text-gray-900">Analytics & Reports</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">View teaching analytics, student progress, and course performance.</p>
            <button 
              onClick={() => navigate('/educator/analytics')}
              className="text-[#AC5757] text-sm font-medium hover:underline flex items-center gap-1"
            >
              Go to Analytics <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>

      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default EducatorSupport;
