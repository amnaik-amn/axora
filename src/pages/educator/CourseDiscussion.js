import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Edit3, Save, X, Users, Reply } from 'lucide-react';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';

const CourseDiscussion = () => {
  const { courseId, discussionId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [instructions, setInstructions] = useState("Welcome to this discussion! Please read the instructions carefully and participate thoughtfully. Remember to be respectful and constructive in your responses.");
  const [editedInstructions, setEditedInstructions] = useState(instructions);
  const [pointsForPosts, setPointsForPosts] = useState(15);
  const [pointsForReplies, setPointsForReplies] = useState(10);
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [showRepliesModal, setShowRepliesModal] = useState(false);
  const [studentReplies, setStudentReplies] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);

  // Mock course data
  const courseTitles = {
    'advanced-structural-analysis': 'ADVANCED STRUCTURAL ANALYSIS',
    'geotechnical-engineering': 'GEOTECHNICAL ENGINEERING',
    'transportation-systems': 'TRANSPORTATION SYSTEMS DESIGN',
    'environmental-engineering': 'ENVIRONMENTAL ENGINEERING'
  };

  // Mock discussion data
  const discussionData = {
    'advanced-structural-analysis': {
      1: {
        title: "Finite Element Analysis Applications",
        content: "Discuss the practical applications of FEA in structural design and share examples from industry projects.",
        credits: 20,
        publishedPosts: 15,
        totalReplies: 23
      }
    },
    'geotechnical-engineering': {
      1: {
        title: "Soil Classification Systems",
        content: "Compare different soil classification systems and their applications in foundation design.",
        credits: 15,
        publishedPosts: 20,
        totalReplies: 28
      }
    },
    'transportation-systems': {
      1: {
        title: "Traffic Flow Theory",
        content: "Analyze traffic flow models and their application in highway capacity analysis.",
        credits: 18,
        publishedPosts: 14,
        totalReplies: 21
      }
    },
    'environmental-engineering': {
      1: {
        title: "Water Treatment Processes",
        content: "Evaluate different water treatment technologies and their effectiveness in removing contaminants.",
        credits: 22,
        publishedPosts: 25,
        totalReplies: 35
      }
    }
  };

  // Mock student data
  const mockStudents = [
    { id: 1, name: 'Ahmed Al-Mansouri', hasPosted: true, hasReplied: true },
    { id: 2, name: 'Sarah Johnson', hasPosted: false, hasReplied: true },
    { id: 3, name: 'Mohammed Hassan', hasPosted: true, hasReplied: false },
    { id: 4, name: 'Emily Chen', hasPosted: true, hasReplied: true },
    { id: 5, name: 'Omar Khalil', hasPosted: false, hasReplied: true },
    { id: 6, name: 'Lisa Rodriguez', hasPosted: true, hasReplied: true },
    { id: 7, name: 'David Kim', hasPosted: true, hasReplied: false },
    { id: 8, name: 'Fatima Al-Zahra', hasPosted: false, hasReplied: true }
  ];

  // Mock student replies
  const mockReplies = [
    { id: 1, student: 'Ahmed Al-Mansouri', content: 'FEA has been crucial in designing the new bridge project. The software helped us identify stress concentrations that weren\'t visible in traditional calculations.', timestamp: '2 hours ago' },
    { id: 2, student: 'Emily Chen', content: 'In my internship, we used FEA to optimize the design of a high-rise building. It reduced material costs by 15% while maintaining safety standards.', timestamp: '3 hours ago' },
    { id: 3, student: 'Lisa Rodriguez', content: 'The dynamic analysis capabilities of FEA are particularly useful for seismic design. We can model different earthquake scenarios effectively.', timestamp: '4 hours ago' },
    { id: 4, student: 'David Kim', content: 'I\'ve found that FEA validation with physical testing is essential. The software predictions need real-world verification.', timestamp: '5 hours ago' }
  ];

  useEffect(() => {
    // Load data from localStorage or API
    const savedInstructions = localStorage.getItem(`discussion-${courseId}-${discussionId}-instructions`);
    if (savedInstructions) {
      setInstructions(savedInstructions);
      setEditedInstructions(savedInstructions);
    }

    const savedPoints = localStorage.getItem(`discussion-${courseId}-${discussionId}-points`);
    if (savedPoints) {
      const points = JSON.parse(savedPoints);
      setPointsForPosts(points.posts || 15);
      setPointsForReplies(points.replies || 10);
    }

    // Load student data
    const publishedStudents = mockStudents.filter(student => student.hasPosted);
    const repliedStudents = mockStudents.filter(student => student.hasReplied);
    setPublishedPosts(publishedStudents);
    setStudentReplies(mockReplies);
  }, [courseId, discussionId]);

  const handleBackToCourse = () => {
    navigate(`/educator/study`);
  };

  const handleEditInstructions = () => {
    setIsEditingInstructions(true);
  };

  const handleSaveInstructions = () => {
    setInstructions(editedInstructions);
    localStorage.setItem(`discussion-${courseId}-${discussionId}-instructions`, editedInstructions);
    setIsEditingInstructions(false);
  };

  const handleCancelEdit = () => {
    setEditedInstructions(instructions);
    setIsEditingInstructions(false);
  };

  const handlePointsChange = (type, value) => {
    if (type === 'posts') {
      setPointsForPosts(value);
    } else {
      setPointsForReplies(value);
    }
    
    // Save to localStorage
    const points = { posts: pointsForPosts, replies: pointsForReplies };
    if (type === 'posts') {
      points.posts = value;
    } else {
      points.replies = value;
    }
    localStorage.setItem(`discussion-${courseId}-${discussionId}-points`, JSON.stringify(points));
  };

  const currentDiscussion = discussionData[courseId]?.[discussionId];
  const courseTitle = courseTitles[courseId] || 'COURSE DISCUSSION';

  if (!currentDiscussion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Discussion Not Found</h1>
          <button
            onClick={handleBackToCourse}
            className="bg-[#AC5757] text-white px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Red Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={handleBackToCourse}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          
          <h1 className="font-oswald font-medium text-white text-[35px]">{courseTitle} DISCUSSION</h1>
          
          <button 
            onClick={() => navigate('/educator/profile')}
            className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors"
          >
            <span className="text-[#AC5757] font-semibold text-sm">SJ</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Discussion Title */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentDiscussion.title}</h2>
          <p className="text-gray-700">{currentDiscussion.content}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-[#AC5757] text-white px-3 py-1 rounded-full text-sm font-semibold">
              {pointsForPosts + pointsForReplies} Credits
            </span>
          </div>
        </div>

        {/* Instructions Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Discussion Instructions</h3>
            {!isEditingInstructions && (
              <button
                onClick={handleEditInstructions}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit3 size={16} className="text-gray-600" />
              </button>
            )}
          </div>
          
          {isEditingInstructions ? (
            <div className="space-y-4">
              <textarea
                value={editedInstructions}
                onChange={(e) => setEditedInstructions(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                placeholder="Enter discussion instructions..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveInstructions}
                  className="bg-[#AC5757] text-white px-4 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">{instructions}</p>
          )}
        </div>

        {/* Student Replies Chat Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="text-[#AC5757]" size={20} />
            Student Replies
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {studentReplies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{reply.student}</span>
                  <span className="text-sm text-gray-500">{reply.timestamp}</span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Cells */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Posts Cell */}
          <div 
            onClick={() => setShowPostsModal(true)}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#AC5757] mb-1">{currentDiscussion.publishedPosts}</div>
                <div className="text-gray-600 font-medium">Published Posts</div>
              </div>
              <Users className="text-[#AC5757]" size={32} />
            </div>
            <div className="mt-3 text-sm text-gray-500">Click to view students</div>
          </div>

          {/* Replies Cell */}
          <div 
            onClick={() => setShowRepliesModal(true)}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#AC5757] mb-1">{currentDiscussion.totalReplies}</div>
                <div className="text-gray-600 font-medium">Student Replies</div>
              </div>
              <Reply className="text-[#AC5757]" size={32} />
            </div>
            <div className="mt-3 text-sm text-gray-500">Click to view students</div>
          </div>
        </div>

        {/* Points System */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grading Points</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points for Posts</label>
              <input
                type="number"
                value={pointsForPosts}
                onChange={(e) => handlePointsChange('posts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                placeholder="Enter points"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points for Replies</label>
              <input
                type="number"
                value={pointsForReplies}
                onChange={(e) => handlePointsChange('replies', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                placeholder="Enter points"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Modal */}
      {showPostsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Students Who Published Posts</h3>
              <button 
                onClick={() => setShowPostsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {publishedPosts.map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-gray-900">{student.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Replies Modal */}
      {showRepliesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Students Who Replied</h3>
              <button 
                onClick={() => setShowRepliesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {mockStudents.filter(student => student.hasReplied).map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-gray-900">{student.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default CourseDiscussion;
