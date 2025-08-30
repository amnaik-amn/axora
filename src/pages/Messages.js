import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreHorizontal, Send, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const Messages = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const messageInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Al-Mahmoud',
      role: 'Architecture Professor',
      lastMessage: 'Great work on your spatial reasoning assignment!',
      time: '2m ago',
      unread: 2,
      avatar: 'S'
    },
    {
      id: 2,
      name: 'Study Group - Modern Architecture',
      role: 'Group Chat',
      lastMessage: 'Hassan: Who has the reading list for next week?',
      time: '15m ago',
      unread: 0,
      avatar: 'MA'
    },
    {
      id: 3,
      name: 'Ahmed Al-Rashid',
      role: 'Fellow Student',
      lastMessage: 'Thanks for sharing those AutoCAD files!',
      time: '1h ago',
      unread: 0,
      avatar: 'A'
    },
    {
      id: 4,
      name: 'AXORA Support',
      role: 'Customer Service',
      lastMessage: 'How can we help you today?',
      time: '1d ago',
      unread: 0,
      avatar: 'AX'
    }
  ];

  const messages = selectedChat ? [
    { id: 1, sender: 'Dr. Sarah Al-Mahmoud', content: 'Great work on your spatial reasoning assignment!', time: '2:30 PM', isSelf: false },
    { id: 2, sender: 'You', content: 'Thank you Dr. Al-Mahmoud! I really enjoyed working on the 3D visualization part.', time: '2:45 PM', isSelf: true },
    { id: 3, sender: 'Dr. Sarah Al-Mahmoud', content: 'Your attention to detail in the structural elements was impressive. Keep it up!', time: '3:00 PM', isSelf: false }
  ] : [];

  // Keyboard visibility detection for mobile
  useEffect(() => {
    const handleResize = () => {
      // On mobile, if the viewport height changes significantly, keyboard is likely visible
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const screenHeight = window.screen.height;
      const keyboardThreshold = screenHeight * 0.75; // 75% of screen height
      
      setIsKeyboardVisible(viewportHeight < keyboardThreshold);
    };

    // Listen for viewport changes (keyboard show/hide)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive or keyboard opens
  useEffect(() => {
    if (messagesContainerRef.current && selectedChat) {
      const scrollToBottom = () => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      };
      
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, selectedChat, isKeyboardVisible]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      // Add message logic here
      setNewMessage('');
      
      // Scroll to bottom after sending
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleInputFocus = () => {
    // Scroll to bottom when input is focused (keyboard opens)
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 300); // Delay for keyboard animation
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${isKeyboardVisible ? 'pb-2' : 'pb-20'} md:pb-0 transition-all duration-300`}>
      <PageHeader 
        title="MESSAGES"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={true}
      />

      <div className={`max-w-7xl mx-auto ${isKeyboardVisible ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100vh-12rem)]'} md:h-[calc(100vh-6rem)] flex transition-all duration-300`}>
        {/* Conversations List */}
        <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-1/3 bg-white border-r border-gray-200`}>
          {/* Conversation List */}
          <div className="overflow-y-auto h-full">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === conv.id ? 'bg-[#AC5757]/5 border-l-4 border-l-[#AC5757]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#AC5757] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                      {conv.unread > 0 && (
                        <span className="bg-[#AC5757] text-white text-xs rounded-full px-2 py-1 ml-2">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conv.role}</p>
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedChat ? 'block' : 'hidden md:flex'} flex-1 flex-col`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg mr-2"
                  >
                    <ArrowLeft size={20} className="text-gray-600" />
                  </button>
                  
                  <div className="w-10 h-10 bg-[#AC5757] rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-500">{selectedChat.role}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isSelf
                          ? 'bg-[#AC5757] text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isSelf ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    ref={messageInputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-[#AC5757] text-white p-2 rounded-full hover:bg-[#8A4A4A] transition-colors disabled:bg-gray-300"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose from your existing conversations or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileNavigation />
    </div>
  );
};

export default Messages;