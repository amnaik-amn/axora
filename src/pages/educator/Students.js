import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';
import { MessageCircle, Send, X, ChevronLeft, User, Clock, CheckCircle } from 'lucide-react';

const Students = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed.almansouri@university.edu',
      course: 'Spatial Reasoning Fundamentals',
      lastActive: '2 hours ago',
      status: 'online',
      avatar: 'AM'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      course: 'BIM Applications',
      lastActive: '5 hours ago',
      status: 'offline',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      email: 'mohammed.hassan@university.edu',
      course: 'Sustainability & Design',
      lastActive: '1 day ago',
      status: 'offline',
      avatar: 'MH'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@university.edu',
      course: 'Structural Analysis',
      lastActive: '3 hours ago',
      status: 'online',
      avatar: 'EC'
    },
    {
      id: 5,
      name: 'Omar Khalil',
      email: 'omar.khalil@university.edu',
      course: 'Geotechnical Engineering',
      lastActive: '6 hours ago',
      status: 'offline',
      avatar: 'OK'
    },
    {
      id: 6,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@university.edu',
      course: 'Facility Management',
      lastActive: '2 days ago',
      status: 'offline',
      avatar: 'LR'
    }
  ];

  // Initialize chat messages for each student
  const initializeChatMessages = () => {
    const initialMessages = {};
    students.forEach(student => {
      initialMessages[student.id] = [
        {
          id: 1,
          sender: 'student',
          message: `Hello Professor! I have a question about ${student.course}.`,
          timestamp: '10:30 AM',
          isRead: true
        },
        {
          id: 2,
          sender: 'student',
          message: 'Could you please clarify the assignment requirements for this week?',
          timestamp: '10:32 AM',
          isRead: true
        }
      ];
    });
    setChatMessages(initialMessages);
  };

  // Initialize messages on component mount
  React.useEffect(() => {
    initializeChatMessages();
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedStudent) {
      const newMessage = {
        id: Date.now(),
        sender: 'professor',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedStudent.id]: [...(prev[selectedStudent.id] || []), newMessage]
      }));

      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedStudent(null);
  };

  const getUnreadCount = (studentId) => {
    const messages = chatMessages[studentId] || [];
    return messages.filter(msg => msg.sender === 'student' && !msg.isRead).length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="STUDENTS"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={false}
        showSearch={false}
        hideMessageIcon={true}
        hideNotificationIcon={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Students List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Student Directory</h2>
            <p className="text-gray-600 mt-1">Click on a student to start a conversation</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => handleStudentClick(student)}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                    student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {student.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                      {getUnreadCount(student.id) > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {getUnreadCount(student.id)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{student.email}</p>
                    <p className="text-gray-500 text-sm">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={14} />
                    <span>{student.lastActive}</span>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${
                    student.status === 'online' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs capitalize">{student.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={closeChat}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  selectedStudent.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedStudent.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedStudent.course}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {(chatMessages[selectedStudent.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'professor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'professor'
                      ? 'bg-[#AC5757] text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'professor' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-[#AC5757] text-white px-6 py-3 rounded-lg hover:bg-[#8A4A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={16} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
    </div>
  );
};

export default Students;
