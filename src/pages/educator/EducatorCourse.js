import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, MessageCircle, Plus, Save, X, FileText, Upload, ToggleLeft, ToggleRight, Video, File, FolderOpen, Link, FileCheck, User, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EducatorNavigationModal from '../../components/EducatorNavigationModal';

// Mock contextual notifications linked to courses
const contextualNotifications = [
  {
    id: 1,
    courseId: 'advanced-structural-analysis',
    courseTitle: 'ADVANCED STRUCTURAL ANALYSIS',
    type: 'assignment',
    title: 'Finite Element Analysis Assignment',
    description: '23 submissions pending review',
    status: 'pending',
    timestamp: '2 hours ago',
    icon: 'assignment',
    color: 'yellow'
  },
  {
    id: 2,
    courseId: 'advanced-structural-analysis',
    courseTitle: 'ADVANCED STRUCTURAL ANALYSIS',
    type: 'student',
    title: 'Ahmed Al-Mansouri',
    description: 'Completed Advanced Architecture module',
    status: 'completed',
    timestamp: '5 hours ago',
    icon: 'student',
    color: 'green'
  },
  {
    id: 3,
    courseId: 'geotechnical-engineering',
    courseTitle: 'GEOTECHNICAL ENGINEERING',
    type: 'discussion',
    title: 'Foundation Design Discussion',
    description: '8 new posts in discussion',
    status: 'active',
    timestamp: '1 day ago',
    icon: 'discussion',
    color: 'blue'
  },
  {
    id: 4,
    courseId: 'transportation-systems',
    courseTitle: 'TRANSPORTATION SYSTEMS DESIGN',
    type: 'assignment',
    title: 'Highway Design Project',
    description: '15 submissions pending review',
    status: 'pending',
    timestamp: '3 hours ago',
    icon: 'assignment',
    color: 'yellow'
  },
  {
    id: 5,
    courseId: 'environmental-engineering',
    courseTitle: 'ENVIRONMENTAL ENGINEERING',
    type: 'student',
    title: 'Fatima Al-Zahra',
    description: 'Completed Water Treatment module',
    status: 'completed',
    timestamp: '6 hours ago',
    icon: 'student',
    color: 'green'
  },
  {
    id: 6,
    courseId: 'environmental-engineering',
    courseTitle: 'ENVIRONMENTAL ENGINEERING',
    type: 'discussion',
    title: 'Waste Management Forum',
    description: '12 new posts in discussion',
    status: 'active',
    timestamp: '2 days ago',
    icon: 'discussion',
    color: 'blue'
  }
];

// Mock engineering courses for professor
const professorCourses = [
  {
    id: 'advanced-structural-analysis',
    title: 'ADVANCED STRUCTURAL ANALYSIS',
    description: 'Advanced course covering finite element analysis, dynamic analysis, and modern structural design principles for complex engineering structures.',
    instructor: 'Prof. Sarah Johnson',
    duration: '16 weeks',
    credits: 4,
    semester: 'Fall 2024',
    enrolledStudents: 32
  },
  {
    id: 'geotechnical-engineering',
    title: 'GEOTECHNICAL ENGINEERING',
    description: 'Comprehensive study of soil mechanics, foundation design, slope stability, and geotechnical site investigation methods.',
    instructor: 'Prof. Sarah Johnson',
    duration: '14 weeks',
    credits: 3,
    semester: 'Fall 2024',
    enrolledStudents: 28
  },
  {
    id: 'transportation-systems',
    title: 'TRANSPORTATION SYSTEMS DESIGN',
    description: 'Design and analysis of transportation infrastructure including highways, railways, and traffic management systems.',
    instructor: 'Prof. Sarah Johnson',
    duration: '15 weeks',
    credits: 3,
    semester: 'Fall 2024',
    enrolledStudents: 24
  },
  {
    id: 'environmental-engineering',
    title: 'ENVIRONMENTAL ENGINEERING',
    description: 'Water and wastewater treatment, air pollution control, solid waste management, and environmental impact assessment.',
    instructor: 'Prof. Sarah Johnson',
    duration: '13 weeks',
    credits: 3,
    semester: 'Fall 2024',
    enrolledStudents: 35
  }
];

// Mock discussions for educator view
const educatorDiscussions = {
  'advanced-structural-analysis': [
    {
      id: 1,
      title: "Finite Element Analysis Applications",
      content: "Discuss the practical applications of FEA in structural design and share examples from industry projects.",
      credits: 20,
      postedDate: "2024-01-15",
      dueDate: "2024-02-15",
      replies: 12,
      responses: 8,
      publishedPosts: 15,
      totalReplies: 23
    },
    {
      id: 2,
      title: "Dynamic Analysis of Structures",
      content: "Explore the importance of dynamic analysis in earthquake-resistant design and wind loading calculations.",
      credits: 25,
      postedDate: "2024-01-20",
      dueDate: "2024-02-20",
      replies: 8,
      responses: 6,
      publishedPosts: 12,
      totalReplies: 18
    }
  ],
  'geotechnical-engineering': [
    {
      id: 1,
      title: "Soil Classification Systems",
      content: "Compare different soil classification systems and their applications in foundation design.",
      credits: 15,
      postedDate: "2024-01-10",
      dueDate: "2024-02-10",
      replies: 15,
      responses: 10,
      publishedPosts: 20,
      totalReplies: 28
    }
  ],
  'transportation-systems': [
    {
      id: 1,
      title: "Traffic Flow Theory",
      content: "Analyze traffic flow models and their application in highway capacity analysis.",
      credits: 18,
      postedDate: "2024-01-12",
      dueDate: "2024-02-12",
      replies: 10,
      responses: 7,
      publishedPosts: 14,
      totalReplies: 21
    }
  ],
  'environmental-engineering': [
    {
      id: 1,
      title: "Water Treatment Processes",
      content: "Evaluate different water treatment technologies and their effectiveness in removing contaminants.",
      credits: 22,
      postedDate: "2024-01-18",
      dueDate: "2024-02-18",
      replies: 18,
      responses: 12,
      publishedPosts: 25,
      totalReplies: 35
    }
  ]
};

const EducatorCourse = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [lectureVideos, setLectureVideos] = useState({});
  const [uploadData, setUploadData] = useState({
    title: '',
    publishDate: '',
    file: null
  });
  const [activeTab, setActiveTab] = useState('lectures');
  const [vrClipsEnabled, setVrClipsEnabled] = useState(false);
  const [courseNotes, setCourseNotes] = useState([]);
  const [vrClips, setVrClips] = useState([]);
  const [showCourseNotesModal, setShowCourseNotesModal] = useState(false);
  const [courseNotesData, setCourseNotesData] = useState({
    title: '',
    type: 'file', // 'file', 'folder', 'link'
    file: null,
    fileName: '',
    link: '',
    folderPath: ''
  });

  // Load lecture videos from localStorage
  useEffect(() => {
    const savedVideos = localStorage.getItem('lectureVideos');
    if (savedVideos) {
      setLectureVideos(JSON.parse(savedVideos));
    }
  }, []);

  // Load course notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('courseNotes');
    if (savedNotes) {
      setCourseNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Load VR clips from localStorage
  useEffect(() => {
    const savedVrClips = localStorage.getItem('vrClips');
    if (savedVrClips) {
      setVrClips(JSON.parse(savedVrClips));
    }
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleLectureUpload = () => {
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a video format
      const videoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm', 'audio/mp3', 'audio/wav', 'audio/m4a'];
      if (videoTypes.includes(file.type)) {
        setUploadData(prev => ({ ...prev, file }));
      } else {
        alert('Please select a valid video or audio file (.mp4, .mov, .avi, .mkv, .webm, .mp3, .wav, .m4a)');
        e.target.value = '';
      }
    }
  };

  const handleSaveLecture = () => {
    if (!uploadData.file || !uploadData.title || !uploadData.publishDate) {
      alert('Please fill in all fields and select a file');
      return;
    }

    // Simulate saving to Vercel Blob (in real app, this would be an API call)
    const newVideo = {
      id: Date.now(),
      title: uploadData.title,
      publishDate: uploadData.publishDate,
      fileName: uploadData.file.name,
      fileSize: uploadData.file.size,
      uploadDate: new Date().toISOString()
    };

    const courseId = selectedCourse.id;
    const updatedVideos = {
      ...lectureVideos,
      [courseId]: [...(lectureVideos[courseId] || []), newVideo]
    };

    setLectureVideos(updatedVideos);
    localStorage.setItem('lectureVideos', JSON.stringify(updatedVideos));

    // Reset form
    setUploadData({ title: '', publishDate: '', file: null });
    setShowUploadModal(false);
    
    alert('Lecture video uploaded successfully!');
  };

  const handleCancelUpload = () => {
    setUploadData({ title: '', publishDate: '', file: null });
    setShowUploadModal(false);
  };

  const handleDiscussionClick = (courseId, discussion) => {
    navigate(`/educator/course/${courseId}/discussion/${discussion.id}`);
  };

  // VR Clips toggle handler
  const handleVrToggle = () => {
    setVrClipsEnabled(!vrClipsEnabled);
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return <FileText size={20} className="text-[#AC5757]" />;
    if (type.includes('excel') || type.includes('spreadsheet') || type.includes('csv')) return <FileText size={20} className="text-[#AC5757]" />;
    if (type.includes('word') || type.includes('doc')) return <FileText size={20} className="text-[#AC5757]" />;
    if (type.includes('powerpoint') || type.includes('presentation') || type.includes('ppt')) return <FileText size={20} className="text-[#AC5757]" />;
    if (type.includes('video') || type.includes('vr')) return <Video size={20} className="text-[#AC5757]" />;
    return <FileText size={20} className="text-[#AC5757]" />;
  };

  // Course Notes handlers
  const handleCourseNotesFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseNotesData({
        ...courseNotesData,
        file: file,
        fileName: file.name,
        title: file.name.split('.')[0]
      });
    }
  };

  const handleCourseNotesSave = () => {
    if (!courseNotesData.title || (!courseNotesData.file && !courseNotesData.link && !courseNotesData.folderPath)) {
      alert('Please fill in all required fields');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: courseNotesData.title,
      courseTitle: selectedCourse.title,
      type: courseNotesData.type,
      fileName: courseNotesData.fileName,
      link: courseNotesData.link,
      folderPath: courseNotesData.folderPath,
      uploadedAt: new Date().toISOString()
    };

    setCourseNotes(prev => [newNote, ...prev]);
    setCourseNotesData({ title: '', type: 'file', file: null, fileName: '', link: '', folderPath: '' });
    setShowCourseNotesModal(false);
  };

  const getCourseNotesIcon = (type) => {
    switch (type) {
      case 'file': return <File size={20} className="text-[#AC5757]" />;
      case 'folder': return <FolderOpen size={20} className="text-[#AC5757]" />;
      case 'link': return <Link size={20} className="text-[#AC5757]" />;
      default: return <FileText size={20} className="text-[#AC5757]" />;
    }
  };

  // Handle notification click - navigate to specific course
  const handleNotificationClick = (notification) => {
    const course = professorCourses.find(c => c.id === notification.courseId);
    if (course) {
      setSelectedCourse(course);
      // Set appropriate tab based on notification type
      if (notification.type === 'assignment') {
        setActiveTab('lectures');
      } else if (notification.type === 'discussion') {
        setActiveTab('discussions');
      } else if (notification.type === 'student') {
        setActiveTab('lectures'); // Default to lectures for student activities
      }
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return <FileCheck size={16} />;
      case 'student': return <User size={16} />;
      case 'discussion': return <MessageCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  // Get notification color class
  const getNotificationColor = (color) => {
    switch (color) {
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedCourse) {
    const courseVideos = lectureVideos[selectedCourse.id] || [];
    const courseDiscussions = educatorDiscussions[selectedCourse.id] || [];
    const courseNotifications = contextualNotifications.filter(notification => 
      notification.courseId === selectedCourse.id
    );

  return (
    <div className="min-h-screen bg-gray-100">
        {/* Custom Header similar to CourseDetail */}
        <header className="bg-[#AC5757] sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 h-24">
            <button 
              onClick={handleBackToList}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            
            <h1 className="font-oswald font-medium text-white text-[35px]">{selectedCourse.title}</h1>
            
              <button
              onClick={() => navigate('/educator/profile')}
              className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors"
            >
              <span className="text-[#AC5757] font-semibold text-sm">SJ</span>
              </button>
          </div>
        </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Course Overview */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
            {/* Course Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Course Description</h2>
              <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                      </div>
            
            {/* Course Statistics */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#AC5757] mb-1">{selectedCourse.enrolledStudents}</div>
                <div className="text-sm text-gray-600">Enrolled Students</div>
                    </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#AC5757] mb-1">{selectedCourse.credits}</div>
                <div className="text-sm text-gray-600">Credits</div>
                </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#AC5757] mb-1">{selectedCourse.duration}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#AC5757] mb-1">{selectedCourse.semester}</div>
                <div className="text-sm text-gray-600">Semester</div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {selectedCourse ? `${selectedCourse.title} - Recent Activity` : 'Recent Activity'}
              </h2>
              <div className="space-y-4">
                {(selectedCourse ? courseNotifications : contextualNotifications.slice(0, 6)).map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getNotificationColor(notification.color)}`}></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {!selectedCourse && `${notification.courseTitle} • `}{notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                
                {((selectedCourse ? courseNotifications : contextualNotifications).length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>No recent activity</p>
                    <p className="text-sm">
                      {selectedCourse 
                        ? `No recent activity for ${selectedCourse.title}` 
                        : 'Activity from your courses will appear here'
                      }
                    </p>
                  </div>
                )}
                </div>
              </div>
            </section>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('lectures')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'lectures'
                      ? 'border-[#AC5757] text-[#AC5757]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Play className="inline mr-2" size={16} />
                  Lecture Videos
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notes'
                      ? 'border-[#AC5757] text-[#AC5757]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="inline mr-2" size={16} />
                  Course Notes
                </button>
                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'discussions'
                      ? 'border-[#AC5757] text-[#AC5757]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <MessageCircle className="inline mr-2" size={16} />
                  Discussions
                </button>
              </nav>
                      </div>

            <div className="p-6">
              {/* Lecture Videos Tab */}
              {activeTab === 'lectures' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Play className="text-[#AC5757]" size={24} />
                    Lecture Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courseVideos.map((video, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                        <div className="w-16 h-16 bg-[#AC5757] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="text-white" size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">Published: {new Date(video.publishDate).toLocaleDateString()}</p>
                        <button className="w-full bg-[#AC5757] text-white py-2 px-4 rounded-lg hover:bg-[#8A4A4A] transition-colors">
                          Play Video
                        </button>
                    </div>
                  ))}
                    
                    {/* Add New Lecture Button */}
                    <div 
                      onClick={handleLectureUpload}
                      className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-[#AC5757] hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="text-gray-400" size={24} />
                </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Add New Lecture</h3>
                      <p className="text-gray-500 text-sm">Upload video content</p>
              </div>
                  </div>
          </div>
        )}

              {/* Course Notes Tab */}
              {activeTab === 'notes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="text-[#AC5757]" size={24} />
                    Course Notes
                  </h2>
              <div className="space-y-4">
                    {courseNotes
                      .filter(note => note.courseTitle === selectedCourse.title)
                      .map((note, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#AC5757]/10 rounded-lg flex items-center justify-center">
                              {getFileIcon(note.fileType)}
                      </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{note.title}</h4>
                              <p className="text-sm text-gray-600">{note.fileName}</p>
                              <p className="text-xs text-gray-500">Uploaded: {new Date(note.uploadedAt).toLocaleDateString()}</p>
                    </div>
                      </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-[#AC5757] hover:bg-[#AC5757]/10 rounded-lg transition-colors">
                              <Upload size={16} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <X size={16} />
                            </button>
                    </div>
                  </div>
                ))}
                    
                    {courseNotes.filter(note => note.courseTitle === selectedCourse.title).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>No course notes uploaded yet</p>
                        <p className="text-sm">Upload course materials from the home page</p>
              </div>
                    )}
                  </div>
          </div>
        )}

              {/* Discussions Tab */}
              {activeTab === 'discussions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageCircle className="text-[#AC5757]" size={24} />
                    Course Discussions
                  </h2>
              <div className="space-y-4">
                    {courseDiscussions.map((discussion, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleDiscussionClick(selectedCourse.id, discussion)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Credits Badge */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#AC5757] to-[#8A4A4A] rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-lg">
                              <div className="text-xs opacity-90">CREDITS</div>
                              <div className="text-lg">{discussion.credits}</div>
                      </div>
                    </div>
                          
                    <div className="flex-1">
                            {/* Discussion Title and Author */}
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{discussion.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium">Prof. Sarah Johnson</span>
                                <span>•</span>
                                <span>{discussion.postedDate}</span>
                      </div>
                      </div>
                            
                            {/* Discussion Content */}
                            <p className="text-gray-700 mb-4">{discussion.content}</p>
                            
                            {/* Dates and Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-4">
                                <span><strong>Posted:</strong> {discussion.postedDate}</span>
                                <span><strong>Due:</strong> {discussion.dueDate}</span>
                    </div>
                  </div>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MessageCircle size={16} />
                                  <span>{discussion.replies} replies</span>
                      </div>
                                <div className="flex items-center gap-1">
                                  <span>{discussion.participants} participants</span>
                    </div>
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}
            </div>
          </div>

          {/* Course Notes Section */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border-2 border-[#AC5757]">
                    <FileText size={32} className="text-[#AC5757]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Course Notes</h3>
                    <p className="text-gray-600">Upload files, folders, or share drive links</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCourseNotesModal(true)}
                  className="px-6 py-3 bg-[#AC5757] text-white rounded-xl hover:bg-[#8A4A4A] transition-colors font-semibold flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Course Notes
                </button>
                        </div>

              <div className="space-y-3">
                {courseNotes
                  .filter(note => note.courseTitle === selectedCourse.title)
                  .map((note, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#AC5757]/10 rounded-lg flex items-center justify-center">
                          {getCourseNotesIcon(note.type)}
                      </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{note.title}</h4>
                          <p className="text-sm text-gray-600">
                            {note.type === 'file' && note.fileName}
                            {note.type === 'folder' && note.folderPath}
                            {note.type === 'link' && note.link}
                          </p>
                          <p className="text-xs text-gray-500">Added: {new Date(note.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-[#AC5757] hover:bg-[#AC5757]/10 rounded-lg transition-colors">
                          <Upload size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                
                {courseNotes.filter(note => note.courseTitle === selectedCourse.title).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>No course notes added yet</p>
                    <p className="text-sm">Click "Add Course Notes" to upload files, folders, or share links</p>
                  </div>
                )}
              </div>
              </div>
            </section>

          {/* VR Clips Section */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#AC5757] rounded-xl flex items-center justify-center">
                    <Video size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">VR Clips</h3>
                    <p className="text-gray-600">Enable VR content for this course</p>
                  </div>
                </div>
                <button
                  onClick={handleVrToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    vrClipsEnabled
                      ? 'bg-[#AC5757] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {vrClipsEnabled ? (
                    <>
                      <ToggleRight size={20} />
                      VR Enabled
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={20} />
                      Enable VR
                    </>
                  )}
                </button>
                        </div>

              {vrClipsEnabled && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">
                    VR clips are now enabled for this course. Students will be able to access VR content.
                      </div>
                  
                  {/* VR Clips List */}
                  <div className="space-y-3">
                    {vrClips
                      .filter(clip => clip.courseTitle === selectedCourse.title)
                      .map((clip, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#AC5757]/10 rounded-lg flex items-center justify-center">
                              <Video size={20} className="text-[#AC5757]" />
                        </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{clip.title}</h4>
                              <p className="text-sm text-gray-600">{clip.fileName}</p>
                              <p className="text-xs text-gray-500">Uploaded: {new Date(clip.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-[#AC5757] hover:bg-[#AC5757]/10 rounded-lg transition-colors">
                              <Upload size={16} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <X size={16} />
                            </button>
                    </div>
              </div>
                      ))}

                    {vrClips.filter(clip => clip.courseTitle === selectedCourse.title).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Video size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>No VR clips uploaded yet</p>
                        <p className="text-sm">Upload VR content from the home page</p>
          </div>
        )}
      </div>
                </div>
              )}
              </div>
            </section>

        </div>

        {/* Lecture Upload Modal */}
        {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Upload Lecture Video</h3>
              <button 
                  onClick={handleCancelUpload}
                className="text-gray-400 hover:text-gray-600"
              >
                  <X size={20} />
              </button>
            </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter lecture title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
              />
            </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={uploadData.publishDate}
                    onChange={(e) => setUploadData(prev => ({ ...prev, publishDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                  />
                    </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                  <input
                    type="file"
                    accept=".mp4,.mov,.avi,.mkv,.webm,.mp3,.wav,.m4a"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, MOV, AVI, MKV, WebM, MP3, WAV, M4A</p>
                      </div>
                    </div>
              
              <div className="flex gap-3 mt-6">
              <button 
                  onClick={handleSaveLecture}
                  className="flex-1 bg-[#AC5757] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Save
              </button>
              <button 
                  onClick={handleCancelUpload}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                  Cancel
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Navigation Modal */}
        <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    );
  }

  // Course List View
                  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="COURSES"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={false}
        showSearch={false}
        hideMessageIcon={true}
        hideNotificationIcon={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Teaching Courses</h1>
          <p className="text-gray-600">Manage your engineering courses and content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professorCourses.map((course) => (
            <div
              key={course.id}
                      onClick={() => handleCourseClick(course)}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Students:</span>
                  <div className="font-semibold text-gray-900">{course.enrolledStudents}</div>
                        </div>
                <div>
                  <span className="text-gray-500">Credits:</span>
                  <div className="font-semibold text-gray-900">{course.credits}</div>
                      </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <div className="font-semibold text-gray-900">{course.duration}</div>
                        </div>
                <div>
                  <span className="text-gray-500">Semester:</span>
                  <div className="font-semibold text-gray-900">{course.semester}</div>
                    </div>
              </div>
              
              <button className="w-full mt-4 bg-[#AC5757] text-white py-2 px-4 rounded-lg hover:bg-[#8A4A4A] transition-colors">
                Manage Course
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Modal */}
      <EducatorNavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default EducatorCourse;