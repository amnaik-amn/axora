import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Upload, BookOpen, Award, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

// Mock course data - in real app, this would come from API
const mockCourses = {
    'intro-spatial-reasoning': {
      id: 'intro-spatial-reasoning',
      title: 'INTRO TO SPATIAL REASONING',
      description: 'This course introduces fundamental concepts of spatial reasoning and 3D visualization essential for architectural design. Students will learn to interpret architectural drawings, understand spatial relationships, and develop skills in mental rotation and perspective drawing.',
      instructor: 'Prof. Ahmed Al-Rashid',
      duration: '12 weeks',
      credits: 3,
      progress: 25,
      complete: '3 weeks',
      left: '9 weeks'
    },
    'bim-gis-mapping': {
      id: 'bim-gis-mapping',
      title: 'BIM APPLI.: GIS MAPPING',
      description: 'Advanced course covering Building Information Modeling (BIM) applications in Geographic Information Systems (GIS) mapping. Students will learn to integrate BIM data with GIS for urban planning, infrastructure management, and environmental analysis.',
      instructor: 'Prof. Fatima Al-Zahra',
      duration: '14 weeks',
      credits: 4,
      progress: 50,
      complete: '7 weeks',
      left: '7 weeks'
    },
    'what-happens-after-construction': {
      id: 'what-happens-after-construction',
      title: 'WHAT HAPPENS AFTER CONSTRUCTION? ENG334',
      description: 'Comprehensive study of post-construction processes including building maintenance, facility management, lifecycle analysis, and sustainability considerations. Covers both technical and managerial aspects of building operations.',
      instructor: 'Prof. Omar Al-Mansouri',
      duration: '16 weeks',
      credits: 4,
      progress: 25,
      complete: '4 weeks',
      left: '12 weeks'
    },
    'structures-i-iii': {
      id: 'structures-i-iii',
      title: 'STRUCTURES I-III',
      description: 'Three-part series covering structural engineering principles from basic statics to advanced structural analysis. Includes steel, concrete, and timber design, seismic considerations, and modern structural systems.',
      instructor: 'Prof. Khalid Al-Hassan',
      duration: '18 weeks',
      credits: 6,
      progress: 83,
      complete: '15 weeks',
      left: '3 weeks'
    },
    'foundations-geotechnical': {
      id: 'foundations-geotechnical',
      title: 'FOUNDATIONS OF GEOTECHNICAL ENGINEERING',
      description: 'Introduction to soil mechanics, foundation design, and geotechnical engineering principles. Covers soil classification, bearing capacity, slope stability, and foundation systems for various construction projects.',
      instructor: 'Prof. Aisha Al-Sabah',
      duration: '15 weeks',
      credits: 3,
      progress: 20,
      complete: '3 weeks',
      left: '12 weeks'
    },
    'intro-sustainability-design': {
      id: 'intro-sustainability-design',
      title: 'INTRO TO SUSTAINABILITY & DESIGN',
      description: 'Explores sustainable design principles, green building practices, and environmental considerations in architectural design. Includes LEED certification, energy efficiency, and sustainable materials.',
      instructor: 'Prof. Youssef Al-Mahmoud',
      duration: '13 weeks',
      credits: 3,
      progress: 23,
      complete: '3 weeks',
      left: '10 weeks'
    }
  };


  // Course-specific assignments data
  const courseAssignments = {
    'intro-spatial-reasoning': [
      {
        id: 1,
        title: '3D Mental Rotation Assessment',
        description: 'Complete spatial reasoning exercises and submit analysis of your performance',
        dueDate: '2024-02-15',
        points: 25,
        type: 'assessment',
        status: 'completed',
        weight: '15%'
      },
      {
        id: 2,
        title: 'Architectural Visualization Project',
        description: 'Create 3D models of given 2D floor plans using CAD software',
        dueDate: '2024-02-22',
        points: 30,
        type: 'project',
        status: 'assigned',
        weight: '20%'
      },
      {
        id: 3,
        title: 'Spatial Reasoning Portfolio',
        description: 'Compile a portfolio showcasing your spatial reasoning development',
        dueDate: '2024-03-01',
        points: 20,
        type: 'portfolio',
        status: 'assigned',
        weight: '12%'
      }
    ],
    'bim-gis-mapping': [
      {
        id: 1,
        title: 'BIM-GIS Integration Report',
        description: 'Analyze the challenges and benefits of integrating BIM with GIS systems',
        dueDate: '2024-02-18',
        points: 25,
        type: 'report',
        status: 'completed',
        weight: '25%'
      },
      {
        id: 2,
        title: 'Urban Planning GIS Project',
        description: 'Create a comprehensive GIS analysis for a proposed urban development',
        dueDate: '2024-02-25',
        points: 30,
        type: 'project',
        status: 'assigned',
        weight: '30%'
      },
      {
        id: 3,
        title: 'Data Interoperability Exercise',
        description: 'Demonstrate seamless data flow between Revit and ArcGIS platforms',
        dueDate: '2024-03-05',
        points: 20,
        type: 'practical',
        status: 'assigned',
        weight: '20%'
      }
    ],
    'what-happens-after-construction': [
      {
        id: 1,
        title: 'Facility Management Case Study',
        description: 'Analyze post-construction challenges in a real-world building project',
        dueDate: '2024-02-20',
        points: 25,
        type: 'case_study',
        status: 'completed',
        weight: '22%'
      },
      {
        id: 2,
        title: 'Maintenance Planning Proposal',
        description: 'Develop a comprehensive maintenance strategy for a commercial building',
        dueDate: '2024-02-27',
        points: 30,
        type: 'proposal',
        status: 'assigned',
        weight: '25%'
      },
      {
        id: 3,
        title: 'Smart Building Technology Report',
        description: 'Research and evaluate IoT technologies for building operations',
        dueDate: '2024-03-08',
        points: 20,
        type: 'research',
        status: 'assigned',
        weight: '18%'
      }
    ],
    'structures-i-iii': [
      {
        id: 1,
        title: 'Structural Analysis Design Project',
        description: 'Design and analyze a multi-story building structure using advanced methods',
        dueDate: '2024-02-16',
        points: 35,
        type: 'design_project',
        status: 'completed',
        weight: '35%'
      },
      {
        id: 2,
        title: 'Seismic Design Analysis',
        description: 'Perform seismic analysis and design for a high-rise building in earthquake zone',
        dueDate: '2024-02-23',
        points: 25,
        type: 'analysis',
        status: 'assigned',
        weight: '25%'
      },
      {
        id: 3,
        title: 'Material Selection Report',
        description: 'Compare structural materials and justify selection for specific applications',
        dueDate: '2024-03-02',
        points: 20,
        type: 'report',
        status: 'assigned',
        weight: '15%'
      }
    ],
    'foundations-geotechnical': [
      {
        id: 1,
        title: 'Foundation Design Project',
        description: 'Design foundations for challenging soil conditions with detailed analysis',
        dueDate: '2024-02-19',
        points: 30,
        type: 'design_project',
        status: 'assigned',
        weight: '30%'
      },
      {
        id: 2,
        title: 'Slope Stability Analysis',
        description: 'Perform slope stability analysis using multiple methods and software tools',
        dueDate: '2024-02-26',
        points: 25,
        type: 'analysis',
        status: 'completed',
        weight: '22%'
      },
      {
        id: 3,
        title: 'Geotechnical Investigation Report',
        description: 'Plan and document a comprehensive geotechnical site investigation',
        dueDate: '2024-03-06',
        points: 20,
        type: 'investigation',
        status: 'assigned',
        weight: '18%'
      }
    ],
    'intro-sustainability-design': [
      {
        id: 1,
        title: 'LEED Certification Analysis',
        description: 'Analyze a building project and develop strategies for LEED certification',
        dueDate: '2024-02-17',
        points: 25,
        type: 'analysis',
        status: 'completed',
        weight: '25%'
      },
      {
        id: 2,
        title: 'Sustainable Design Project',
        description: 'Design a net-zero energy building with comprehensive sustainability features',
        dueDate: '2024-02-24',
        points: 30,
        type: 'design_project',
        status: 'assigned',
        weight: '30%'
      },
      {
        id: 3,
        title: 'Life Cycle Assessment Study',
        description: 'Conduct LCA analysis for different building materials and systems',
        dueDate: '2024-03-03',
        points: 20,
        type: 'assessment',
        status: 'assigned',
        weight: '20%'
      }
    ]
  };

  // Function to get assignments for a specific course
  const getCourseAssignments = (courseId) => {
    return courseAssignments[courseId] || [];
  };

  // Mock notes data
  const mockNotes = [
    {
      id: 1,
      title: 'Lecture 1: Introduction to Spatial Reasoning',
      description: 'Key concepts and terminology',
      uploadDate: '2024-01-15',
      type: 'lecture_notes',
      fileUrl: '#'
    },
    {
      id: 2,
      title: 'Assignment Guidelines',
      description: 'Detailed instructions for all assignments',
      uploadDate: '2024-01-20',
      type: 'guidelines',
      fileUrl: '#'
    }
  ];

  // Mock tests data
  const mockTests = [
    {
      id: 1,
      title: 'Midterm Exam - Spatial Reasoning',
      description: 'Comprehensive exam covering chapters 1-6',
      duration: '90 minutes',
      totalQuestions: 50,
      maxScore: 100,
      attempts: 2,
      status: 'available'
    },
    {
      id: 2,
      title: 'BIM Software Proficiency Test',
      description: 'Practical test on BIM software usage',
      duration: '120 minutes',
      totalQuestions: 30,
      maxScore: 100,
      attempts: 1,
      status: 'available'
    },
    {
      id: 3,
      title: 'Final Exam - Structures',
      description: 'Final comprehensive exam',
      duration: '180 minutes',
      totalQuestions: 75,
      maxScore: 150,
      attempts: 0,
      status: 'locked'
    }
  ];

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'assignments', label: 'Discussions', icon: MessageCircle },
  { id: 'tests', label: 'Tests', icon: Award }
];

// Course-specific discussion data
const courseDiscussions = {
  'intro-spatial-reasoning': [
    {
      title: "How does mental rotation affect architectural design?",
      author: "Prof. Ahmed Al-Rashid",
      content: "In this week's discussion, I want you to explore how mental rotation skills directly impact architectural design. Share examples from your own experience or research where spatial reasoning has been crucial in design decisions.",
      credits: 15,
      replies: 8,
      responses: 12,
      assignedDate: "Jan 15, 2024",
      dueDate: "Jan 22, 2024",
      postedDate: "2 days ago"
    },
    {
      title: "Challenges with 3D visualization in CAD software",
      author: "Prof. Ahmed Al-Rashid",
      content: "I'm struggling with visualizing complex 3D structures in AutoCAD. The 2D to 3D transition is really challenging. Has anyone found effective techniques or exercises that helped improve their 3D visualization skills?",
      credits: 10,
      replies: 15,
      responses: 23,
      assignedDate: "Jan 16, 2024",
      dueDate: "Jan 23, 2024",
      postedDate: "1 day ago"
    },
    {
      title: "Spatial reasoning exercises that actually work",
      author: "Prof. Ahmed Al-Rashid",
      content: "I've been practicing with the spatial reasoning exercises from Chapter 3, but I'm not seeing much improvement. What specific exercises or techniques have worked best for you? Any recommendations for additional practice materials?",
      credits: 8,
      replies: 6,
      responses: 9,
      assignedDate: "Jan 17, 2024",
      dueDate: "Jan 24, 2024",
      postedDate: "5 hours ago"
    }
  ],
  'bim-gis-mapping': [
    {
      title: "Integrating BIM data with GIS for urban planning",
      author: "Prof. Fatima Al-Zahra",
      content: "This week we're exploring the intersection of Building Information Modeling and Geographic Information Systems. Discuss the challenges and opportunities you see in integrating these two technologies for large-scale urban planning projects.",
      credits: 20,
      replies: 12,
      responses: 18,
      assignedDate: "Jan 14, 2024",
      dueDate: "Jan 21, 2024",
      postedDate: "3 days ago"
    },
    {
      title: "Best practices for BIM-GIS data interoperability",
      author: "Prof. Fatima Al-Zahra",
      content: "I'm working on a project that requires seamless data flow between Revit and ArcGIS. What are the most effective workflows you've used? Any specific plugins or tools that have made this process smoother?",
      credits: 12,
      replies: 9,
      responses: 14,
      assignedDate: "Jan 15, 2024",
      dueDate: "Jan 22, 2024",
      postedDate: "2 days ago"
    },
    {
      title: "Environmental analysis using BIM-GIS integration",
      author: "Prof. Fatima Al-Zahra",
      content: "How can we effectively use integrated BIM-GIS data to analyze environmental impacts of construction projects? I'm particularly interested in energy modeling and sustainability metrics.",
      credits: 15,
      replies: 7,
      responses: 11,
      assignedDate: "Jan 16, 2024",
      dueDate: "Jan 23, 2024",
      postedDate: "1 day ago"
    }
  ],
  'what-happens-after-construction': [
    {
      title: "Post-construction facility management challenges",
      author: "Prof. Omar Al-Mansouri",
      content: "Once construction is complete, what are the most critical challenges in facility management? Share your thoughts on maintenance planning, lifecycle costs, and operational efficiency.",
      credits: 18,
      replies: 11,
      responses: 16,
      assignedDate: "Jan 13, 2024",
      dueDate: "Jan 20, 2024",
      postedDate: "4 days ago"
    },
    {
      title: "Sustainable building operations and maintenance",
      author: "Prof. Omar Al-Mansouri",
      content: "I'm researching sustainable practices in building operations. What innovative approaches have you seen for reducing energy consumption and waste in existing buildings?",
      credits: 14,
      replies: 8,
      responses: 13,
      assignedDate: "Jan 14, 2024",
      dueDate: "Jan 21, 2024",
      postedDate: "3 days ago"
    },
    {
      title: "Technology integration in facility management",
      author: "Prof. Omar Al-Mansouri",
      content: "How are IoT sensors and smart building technologies changing facility management? What are the practical benefits and implementation challenges you've observed?",
      credits: 10,
      replies: 5,
      responses: 8,
      assignedDate: "Jan 15, 2024",
      dueDate: "Jan 22, 2024",
      postedDate: "2 days ago"
    }
  ],
  'structures-i-iii': [
    {
      title: "Advanced structural analysis methods",
      author: "Prof. Khalid Al-Hassan",
      content: "This week we're diving into advanced structural analysis techniques. Discuss the advantages and limitations of different analysis methods (finite element, matrix analysis, etc.) in real-world applications.",
      credits: 25,
      replies: 14,
      responses: 21,
      assignedDate: "Jan 12, 2024",
      dueDate: "Jan 19, 2024",
      postedDate: "5 days ago"
    },
    {
      title: "Seismic design considerations in high-rise buildings",
      author: "Prof. Khalid Al-Hassan",
      content: "I'm working on a high-rise project in a seismic zone. What are the key considerations for seismic design? How do you balance structural safety with architectural requirements?",
      credits: 20,
      replies: 16,
      responses: 24,
      assignedDate: "Jan 13, 2024",
      dueDate: "Jan 20, 2024",
      postedDate: "4 days ago"
    },
    {
      title: "Material selection for structural systems",
      author: "Prof. Khalid Al-Hassan",
      content: "When choosing between steel, concrete, and timber for structural systems, what factors do you prioritize? Cost, performance, sustainability, or constructability?",
      credits: 12,
      replies: 9,
      responses: 15,
      assignedDate: "Jan 14, 2024",
      dueDate: "Jan 21, 2024",
      postedDate: "3 days ago"
    }
  ],
  'foundations-geotechnical': [
    {
      title: "Foundation design for challenging soil conditions",
      author: "Prof. Aisha Al-Sabah",
      content: "This week we're exploring foundation design in difficult soil conditions. Share your experiences with soft clay, expansive soils, or other challenging ground conditions. What solutions have you found most effective?",
      credits: 22,
      replies: 13,
      responses: 19,
      assignedDate: "Jan 11, 2024",
      dueDate: "Jan 18, 2024",
      postedDate: "6 days ago"
    },
    {
      title: "Slope stability analysis techniques",
      author: "Prof. Aisha Al-Sabah",
      content: "I'm analyzing slope stability for a hillside development project. What methods do you recommend for slope stability analysis? Any software tools that have been particularly helpful?",
      credits: 16,
      replies: 7,
      responses: 12,
      assignedDate: "Jan 12, 2024",
      dueDate: "Jan 19, 2024",
      postedDate: "5 days ago"
    },
    {
      title: "Environmental considerations in geotechnical engineering",
      author: "Prof. Aisha Al-Sabah",
      content: "How do environmental regulations and sustainability goals impact geotechnical engineering decisions? What are the emerging trends in green geotechnical practices?",
      credits: 14,
      replies: 6,
      responses: 10,
      assignedDate: "Jan 13, 2024",
      dueDate: "Jan 20, 2024",
      postedDate: "4 days ago"
    }
  ],
  'intro-sustainability-design': [
    {
      title: "LEED certification process and requirements",
      author: "Prof. Youssef Al-Mahmoud",
      content: "This week we're focusing on LEED certification. Discuss the most challenging aspects of achieving LEED certification and share strategies for meeting energy efficiency and sustainability requirements.",
      credits: 20,
      replies: 10,
      responses: 17,
      assignedDate: "Jan 10, 2024",
      dueDate: "Jan 17, 2024",
      postedDate: "7 days ago"
    },
    {
      title: "Renewable energy integration in building design",
      author: "Prof. Youssef Al-Mahmoud",
      content: "I'm designing a net-zero energy building. What are the most effective strategies for integrating solar panels, wind turbines, and other renewable energy systems into architectural design?",
      credits: 18,
      replies: 12,
      responses: 20,
      assignedDate: "Jan 11, 2024",
      dueDate: "Jan 18, 2024",
      postedDate: "6 days ago"
    },
    {
      title: "Sustainable materials and their life cycle impacts",
      author: "Prof. Youssef Al-Mahmoud",
      content: "How do you evaluate the environmental impact of different building materials? What tools or methods do you use for life cycle assessment in material selection?",
      credits: 15,
      replies: 8,
      responses: 13,
      assignedDate: "Jan 12, 2024",
      dueDate: "Jan 19, 2024",
      postedDate: "5 days ago"
    }
  ]
};

// Function to get discussions for a specific course
const getCourseDiscussions = (courseId) => {
  return courseDiscussions[courseId] || [];
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Load course data
    console.log('Loading course with ID:', courseId);
    console.log('Available courses:', Object.keys(mockCourses));
    
    const courseData = mockCourses[courseId];
    if (courseData) {
      console.log('Course found:', courseData.title);
      setCourse(courseData);
      setAssignments(getCourseAssignments(courseId));
      setNotes(mockNotes);
      setTests(mockTests);
    } else {
      console.log('Course not found for ID:', courseId);
    }
  }, [courseId]);

  const handleBack = () => {
    navigate('/app/study?tab=courses');
  };

  const handleTestClick = (test) => {
    console.log('Starting test:', test.title);
    // In real app, this would navigate to test page
    alert(`Starting ${test.title}...\n\nThis would open the test interface with ${test.totalQuestions} questions and ${test.duration} time limit.`);
  };


  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AC5757] mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">Loading course...</p>
          <p className="text-sm text-gray-500">Course ID: {courseId}</p>
          <button 
            onClick={() => navigate('/app/study?tab=courses')}
            className="mt-4 bg-[#AC5757] text-white px-4 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title={course.title}
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={false}
        showSearch={false}
        hideMessageIcon={true}
        hideNotificationIcon={true}
        customLeftContent={
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
        }
      />

      {/* Course Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Description</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>Instructor: {course.instructor}</span>
                  <span>Duration: {course.duration}</span>
                  <span>Credits: {course.credits}</span>
                </div>
              </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Progress</p>
                <div className="w-24 h-24 relative">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#AC5757"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${course.progress * 2.51} 251`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{course.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#AC5757]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 sm:py-5 md:py-6 font-medium text-base sm:text-lg md:text-xl transition-all whitespace-nowrap mx-3 sm:mx-4 md:mx-5 ${
                  activeTab === tab.id
                    ? 'bg-gray-50 text-gray-900 px-6 sm:px-8 md:px-12'
                    : 'bg-[#AC5757] text-white hover:bg-[#8A4A4A] px-4 sm:px-5 md:px-6.6'
                }`}
              >
                <tab.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Lecture Videos Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Play className="text-[#AC5757]" size={24} />
                Lecture Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((video, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="text-gray-400" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lecture {video}</h3>
                    <p className="text-gray-500 text-sm mb-4">No video available</p>
                    <button 
                      disabled
                      className="w-full bg-gray-100 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Notes Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="text-[#AC5757]" size={24} />
                Course Notes
              </h2>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                {notes.length > 0 ? (
                  <div className="space-y-4">
                    {notes.map(note => (
                      <div key={note.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">{note.title}</h3>
                          <p className="text-sm text-gray-600">{note.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Uploaded: {note.uploadDate}</p>
                        </div>
                        <button className="bg-[#AC5757] text-white px-4 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">No notes uploaded yet</p>
                    <p className="text-sm text-gray-400 mt-2">Instructor will upload course materials here</p>
                  </div>
                )}
              </div>
            </section>

            {/* Assignments Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Upload className="text-[#AC5757]" size={24} />
                Assignments
              </h2>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                {assignments.length > 0 ? (
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                        {/* Points Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-lg">
                            <div className="text-xs opacity-90">POINTS</div>
                            <div className="text-lg">{assignment.points}</div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{assignment.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {assignment.weight}
                              </span>
                              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                                {assignment.type.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span><strong>Due:</strong> {assignment.dueDate}</span>
                              <span><strong>Status:</strong> <span className={`font-medium ${assignment.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>{assignment.status}</span></span>
                            </div>
                            <div className="flex gap-2">
                              <button className={`bg-[#AC5757] text-white px-4 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors text-sm ${assignment.status === 'completed' ? 'flex-1' : ''}`}>
                                View Details
                              </button>
                              {assignment.status !== 'completed' && (
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Upload className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">No assignments posted yet</p>
                    <p className="text-sm text-gray-400 mt-2">Instructor will post assignments here</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map(test => (
                <div 
                  key={test.id} 
                  className={`bg-white rounded-xl p-6 border-2 transition-all ${
                    test.status === 'available' 
                      ? 'border-gray-200 hover:border-[#AC5757] hover:shadow-lg cursor-pointer' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                  }`}
                  onClick={() => test.status === 'available' && handleTestClick(test)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      test.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {test.status === 'available' ? 'Available' : 'Locked'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span>{test.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Score:</span>
                      <span>{test.maxScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attempts:</span>
                      <span>{test.attempts}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      test.status === 'available'
                        ? 'bg-[#AC5757] text-white hover:bg-[#8A4A4A]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={test.status !== 'available'}
                  >
                    {test.status === 'available' ? 'Start Test' : 'Locked'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Discussions</h2>
            <div className="space-y-4">
              {getCourseDiscussions(courseId).map((discussion, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
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
                          <span className="font-medium">{discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.postedDate}</span>
                        </div>
                      </div>
                      
                      {/* Discussion Content */}
                      <p className="text-gray-700 mb-4">{discussion.content}</p>
                      
                      {/* Dates and Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <span><strong>Assigned:</strong> {discussion.assignedDate}</span>
                          <span><strong>Due:</strong> {discussion.dueDate}</span>
                        </div>
                      </div>
                      
                      {/* Bottom Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📝</span>
                            <span>{discussion.responses} responses</span>
                          </div>
                        </div>
                        <button className="text-[#AC5757] hover:text-[#8A4A4A] font-medium text-sm">
                          Participate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Discussion */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
              <textarea
                placeholder="Share your thoughts, ask questions, or start a discussion..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
              />
              <div className="flex justify-end mt-3">
                <button className="bg-[#AC5757] text-white px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors">
                  Post Discussion
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default CourseDetail;
