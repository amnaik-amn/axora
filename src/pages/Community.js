import React, { useState } from 'react';
import { Users, Clock, MapPin } from 'lucide-react';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';

const Community = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showCourseNotification, setShowCourseNotification] = useState(false);
  const [courseNotificationMessage, setCourseNotificationMessage] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    console.log('Searching community for:', searchTerm);
  };

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDiscussionModal(true);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  };

  const handleJoinGroup = (groupName) => {
    setNotificationMessage(`Joined ${groupName}!\n\nYou'll receive notifications about upcoming sessions and can access group materials.`);
    setShowNotification(true);
    setShowGroupModal(false);
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleNewDiscussion = () => {
    alert('Create New Discussion\n\nThis would open a form where you can:\n• Choose a topic category\n• Write your question or topic\n• Add tags for better discovery\n• Attach images or files');
  };

  const handleJoinCourseDiscussion = (courseName) => {
    setCourseNotificationMessage(`Successfully joined ${courseName} discussion!\n\nYou can now:\n• View all discussion topics\n• Reply to existing conversations\n• Ask questions to peers and instructors\n• Get notifications about new posts`);
    setShowCourseNotification(true);
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setShowCourseNotification(false);
    }, 4000);
  };

  const tabs = [
    { id: 'discussions', label: 'DISCUSSIONS' },
    { id: 'courses', label: 'COURSES' },
    { id: 'study-groups', label: 'STUDY GROUPS' },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Struggling with BIM Assignment - Need help with Revit families',
      author: 'Alex Chen',
      authorRole: '3rd Year Student',
      authorAvatar: 'AC',
      replies: 18,
      lastActive: '1 hour ago',
      category: 'Course Help',
      isHot: true,
      upvotes: 23,
      views: 145,
      course: 'BIM APPLI.: GIS MAPPING',
      credits: 0,
      content: `Hey everyone! I'm working on the Revit families assignment for BIM class and I'm completely stuck. The professor wants us to create parametric families but I can't figure out how to set up the constraints properly.

**Specific issues:**
• Door family won't resize correctly
• Window parameters aren't working
• Can't get the visibility graphics right
• Family types keep breaking

**Assignment due:** Next Friday
**Professor:** Dr. Martinez

Anyone who's done this before or is currently working on it? I could really use some guidance! I have the tutorial videos but they're not helping with the specific problems I'm facing.`,
      conversation: [
        {
          author: 'Sarah Kim',
          authorRole: '4th Year Student',
          authorAvatar: 'SK',
          timestamp: '45 minutes ago',
          content: `I just finished this assignment! The key is to set up your reference planes first before adding any geometry. Make sure they're locked and constrained properly. Also, check that your parameters are set to "Instance" vs "Type" - that's usually where people mess up.`,
          upvotes: 8,
          replies: [
            {
              author: 'Alex Chen',
              authorRole: '3rd Year Student',
              authorAvatar: 'AC',
              timestamp: '30 minutes ago',
              content: `Thanks Sarah! That's super helpful. Do you have any screenshots of your reference plane setup? I think I might be doing that wrong.`,
              upvotes: 2
            }
          ]
        },
        {
          author: 'Prof. Martinez',
          authorRole: 'Professor',
          authorAvatar: 'PM',
          timestamp: '30 minutes ago',
          content: `Great question Alex! I'll be holding extra office hours tomorrow from 2-4 PM specifically for this assignment. Also, check the course materials - I uploaded a step-by-step guide last week. The most common mistake is not properly constraining the geometry to the reference planes.`,
          upvotes: 15,
          replies: []
        },
        {
          author: 'Mike Rodriguez',
          authorRole: '3rd Year Student',
          authorAvatar: 'MR',
          timestamp: '20 minutes ago',
          content: `I'm working on this too! Want to study together? I'm free tomorrow afternoon. We could work through it step by step.`,
          upvotes: 5,
          replies: []
        }
      ]
    },
    {
      id: 2,
      title: 'Study materials for Spatial Reasoning midterm - what to focus on?',
      author: 'Emily Johnson',
      authorRole: '2nd Year Student',
      authorAvatar: 'EJ',
      replies: 24,
      lastActive: '2 hours ago',
      category: 'Study Materials',
      isHot: true,
      upvotes: 31,
      views: 189,
      course: 'INTRO TO SPATIAL REASONING',
      credits: 0,
      content: `The midterm is next week and I'm feeling overwhelmed! There's so much material to cover and I'm not sure what to prioritize.

**Topics covered so far:**
• 3D visualization techniques
• Orthographic projections
• Isometric drawings
• Spatial relationships
• Mental rotation tasks

**What I'm struggling with:**
• Complex isometric projections
• Mental rotation under time pressure
• Converting between different view types

**Study resources I have:**
• Textbook chapters 1-6
• Practice problems from Canvas
• Old exam samples

What should I focus on? Any study tips from people who already took this class?`,
      conversation: [
        {
          author: 'David Park',
          authorRole: '3rd Year Student',
          authorAvatar: 'DP',
          timestamp: '1 hour ago',
          content: `I took this class last semester! The key is practicing mental rotation daily - even 15 minutes helps. The professor loves to test on orthographic to isometric conversion, so definitely focus on that. Also, the old exam samples are gold - they're very similar to the actual test.`,
          upvotes: 12,
          replies: []
        },
        {
          author: 'Lisa Chen',
          authorRole: '2nd Year Student',
          authorAvatar: 'LC',
          timestamp: '45 minutes ago',
          content: `I'm in the same boat! Want to form a study group? We could meet at the library and work through practice problems together. I'm free most evenings this week.`,
          upvotes: 8,
          replies: []
        },
        {
          author: 'Prof. Wilson',
          authorRole: 'Professor',
          authorAvatar: 'PW',
          timestamp: '30 minutes ago',
          content: `Great question Emily! Focus on the practice problems I assigned - they're very similar to the exam format. The mental rotation section is worth 30% of the grade, so definitely practice that. I'll be in my office today from 3-5 PM if anyone wants to review.`,
          upvotes: 18,
          replies: []
        }
      ]
    },
    {
      id: 3,
      title: 'Sustainability Design Project - Group looking for 4th member',
      author: 'Marcus Rodriguez',
      authorRole: '4th Year Student',
      authorAvatar: 'MR',
      replies: 12,
      lastActive: '3 hours ago',
      category: 'Study Groups',
      isHot: false,
      upvotes: 15,
      views: 67,
      course: 'INTRO TO SUSTAINABILITY & DESIGN',
      credits: 50,
      content: `Our group needs one more member for the sustainability design project! We're working on a LEED-certified residential complex design.

**Current group:**
• Me (4th year, focus on structural design)
• Sarah (3rd year, environmental systems)
• Alex (3rd year, landscape architecture)

**Project requirements:**
• 20-page design report
• 3D model and renderings
• LEED scorecard analysis
• Presentation to class

**What we need:**
• Someone with strong Revit skills
• Available for weekly meetings (Tuesdays 7 PM)
• Can commit 8-10 hours per week

**Credits:** 50 XP for joining (professor-assigned group)
**Due date:** March 15th

Interested? DM me or reply here!`,
      conversation: [
        {
          author: 'Jennifer Liu',
          authorRole: '3rd Year Student',
          authorAvatar: 'JL',
          timestamp: '2 hours ago',
          content: `I'm interested! I have strong Revit skills and I'm taking the same class. I can definitely commit to the time requirements. When can we meet to discuss the project details?`,
          upvotes: 6,
          replies: []
        },
        {
          author: 'Marcus Rodriguez',
          authorRole: '4th Year Student',
          authorAvatar: 'MR',
          timestamp: '1 hour ago',
          content: `Perfect Jennifer! Let's meet tomorrow at 7 PM in the architecture studio. I'll send you the project brief and our current progress.`,
          upvotes: 3,
          replies: []
        }
      ]
    },
    {
      id: 4,
      title: 'Structures I-III - Need help with moment diagrams',
      author: 'Amanda Foster',
      authorRole: '3rd Year Student',
      authorAvatar: 'AF',
      replies: 16,
      lastActive: '4 hours ago',
      category: 'Course Help',
      isHot: false,
      upvotes: 19,
      views: 98,
      course: 'STRUCTURES I-III',
      credits: 0,
      content: `I'm completely lost on moment diagrams for beams! The homework is due tomorrow and I can't figure out how to draw them correctly.

**Problem:** Simply supported beam with point load at center
**Length:** 8m
**Load:** 20 kN at 4m from left support

**What I'm getting wrong:**
• Maximum moment calculation
• Shape of the diagram
• Sign conventions
• Shear force relationship

**Resources I've tried:**
• Textbook examples
• YouTube tutorials
• Office hours (missed them)

Anyone available to help? I can share my work so far and we can go through it step by step.`,
      conversation: [
        {
          author: 'Carlos Mendez',
          authorRole: '4th Year Student',
          authorAvatar: 'CM',
          timestamp: '3 hours ago',
          content: `I can help! For a simply supported beam with center point load, the max moment is PL/4. So for your case: (20 kN × 8m)/4 = 40 kN⋅m. The diagram is triangular with max at center. Want to meet at the library?`,
          upvotes: 7,
          replies: []
        },
        {
          author: 'Prof. Thompson',
          authorRole: 'Professor',
          authorAvatar: 'PT',
          timestamp: '2 hours ago',
          content: `Amanda, I'll be in my office until 6 PM today. Come by and I'll walk you through the moment diagram step by step. Also, check the course website - I posted a detailed solution guide yesterday.`,
          upvotes: 12,
          replies: []
        }
      ]
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'BIM Study Group - Prof. Martinez',
      members: 12,
      maxMembers: 15,
      description: 'Professor-assigned study group for BIM Applications course. Focus on Revit families, parametric modeling, and GIS integration.',
      nextSession: 'Tomorrow 2:00 PM',
      category: 'Professor-Assigned',
      course: 'BIM APPLI.: GIS MAPPING',
      credits: 75,
      professor: 'Dr. Martinez',
      requirements: 'Must be enrolled in BIM course',
      isProfessorAssigned: true,
      meetingLocation: 'Architecture Studio 201',
      weeklyHours: 6
    },
    {
      id: 2,
      name: 'Spatial Reasoning Prep Group',
      members: 8,
      maxMembers: 10,
      description: 'Student-led study group for Spatial Reasoning midterm prep. Practice problems, study sessions, and peer tutoring.',
      nextSession: 'Today 7:00 PM',
      category: 'Student-Led',
      course: 'INTRO TO SPATIAL REASONING',
      credits: 25,
      professor: 'Prof. Wilson',
      requirements: 'Open to all students',
      isProfessorAssigned: false,
      meetingLocation: 'Library Study Room 3',
      weeklyHours: 4
    },
    {
      id: 3,
      name: 'Sustainability Design Project Team',
      members: 3,
      maxMembers: 4,
      description: 'Professor-assigned group project for LEED-certified residential complex design. Multi-disciplinary team collaboration.',
      nextSession: 'Tuesday 7:00 PM',
      category: 'Professor-Assigned',
      course: 'INTRO TO SUSTAINABILITY & DESIGN',
      credits: 100,
      professor: 'Dr. Chen',
      requirements: 'Must be enrolled in Sustainability course',
      isProfessorAssigned: true,
      meetingLocation: 'Architecture Studio 205',
      weeklyHours: 8
    },
    {
      id: 4,
      name: 'Structures Study Circle',
      members: 15,
      maxMembers: 20,
      description: 'Student-led study group for Structures I-III. Focus on moment diagrams, beam analysis, and structural calculations.',
      nextSession: 'Wednesday 6:00 PM',
      category: 'Student-Led',
      course: 'STRUCTURES I-III',
      credits: 30,
      professor: 'Prof. Thompson',
      requirements: 'Open to all students',
      isProfessorAssigned: false,
      meetingLocation: 'Engineering Building Room 101',
      weeklyHours: 5
    },
    {
      id: 5,
      name: 'VR Design Workshop - Prof. Johnson',
      members: 6,
      maxMembers: 8,
      description: 'Professor-led workshop on VR tools for architectural visualization. Hands-on training with Enscape, Twinmotion, and Unreal Engine.',
      nextSession: 'Friday 3:00 PM',
      category: 'Professor-Assigned',
      course: 'DESIGN TECHNOLOGY',
      credits: 60,
      professor: 'Prof. Johnson',
      requirements: 'Must have completed BIM course',
      isProfessorAssigned: true,
      meetingLocation: 'VR Lab - Architecture Building',
      weeklyHours: 6
    },
    {
      id: 6,
      name: 'Geotechnical Engineering Study Group',
      members: 10,
      maxMembers: 12,
      description: 'Student-led study group for Foundations of Geotechnical Engineering. Soil analysis, foundation design, and lab report collaboration.',
      nextSession: 'Thursday 5:00 PM',
      category: 'Student-Led',
      course: 'FOUNDATIONS OF GEOTECHNICAL ENGINEE-',
      credits: 35,
      professor: 'Dr. Park',
      requirements: 'Open to all students',
      isProfessorAssigned: false,
      meetingLocation: 'Civil Engineering Lab',
      weeklyHours: 4
    }
  ];

  const courseDiscussions = [
    {
      courseName: 'Introduction to Sustainability',
      instructor: 'Prof. Ahmed Al-Hassan / Dr. Sarah Wilson',
      instructorArabic: 'أحمد الحسن',
      instructorEnglish: 'Dr. Sarah Wilson',
      activeTopics: 8,
      participants: 67,
      lastPost: '30 minutes ago',
      lastReplyBy: 'Mariam K: "Thanks for the clarification on LEED certification requirements!"',
      credits: 3,
      dueDate: '2024-03-15',
      hasDueDate: true
    },
    {
      courseName: 'Spatial Reasoning Fundamentals',
      instructor: 'Dr. Omar Al-Rashid / Prof. Michael Thompson',
      instructorArabic: 'عمر الراشد',
      instructorEnglish: 'Prof. Michael Thompson',
      activeTopics: 12,
      participants: 54,
      lastPost: '1 hour ago',
      lastReplyBy: 'Ahmed M: "The 3D visualization exercises are really challenging but helpful"',
      credits: 4,
      dueDate: null,
      hasDueDate: false
    },
    {
      courseName: 'BIM Applications: GIS Mapping',
      instructor: 'Prof. Fatima Al-Zahra / Dr. James Chen',
      instructorArabic: 'فاطمة الزهراء',
      instructorEnglish: 'Dr. James Chen',
      activeTopics: 6,
      participants: 38,
      lastPost: '3 hours ago',
      lastReplyBy: 'Youssef A: "Can someone help with the parametric family assignment?"',
      credits: 5,
      dueDate: '2024-03-20',
      hasDueDate: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="COMMUNITY"
        onMenuClick={() => setIsMenuOpen(true)}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search discussions, groups, courses..." 
            onSearch={handleSearch}
          />
        }
      />
      
      {/* Tab Navigation */}
      <div className="bg-[#AC5757]">
        <div className="flex justify-center">
          <div className="flex w-full max-w-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-50 text-gray-900'
                    : 'bg-[#AC5757] text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
              <button 
                onClick={handleNewDiscussion}
                className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                New Discussion
              </button>
            </div>
            
            {/* Discussions Search Bar */}
            <div className="max-w-md">
              <SearchBar 
                placeholder="Search discussions, courses, topics..." 
                onSearch={handleSearch}
              />
            </div>
            
            <div className="space-y-4">
              {discussions
                .filter(discussion => 
                  searchQuery === '' || 
                  discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((discussion, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleDiscussionClick(discussion)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-[#AC5757] transition-colors">
                          {discussion.title}
                        </h3>
                        {discussion.isHot && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            🔥 Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {discussion.authorAvatar}
                          </div>
                        <span>by {discussion.author}</span>
                          <span className="text-xs text-gray-500">• {discussion.authorRole}</span>
                        </div>
                        <span>•</span>
                        <span>{discussion.replies} replies</span>
                        <span>•</span>
                        <span>{discussion.lastActive}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {discussion.category}
                    </span>
                  </div>
                  
                  {/* Course and Credit Info */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {discussion.course}
                    </span>
                    {discussion.credits > 0 && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[#AC5757]/20 text-[#AC5757]">
                        +{discussion.credits} XP
                      </span>
                    )}
                  </div>
                  
                  {/* Preview of discussion content */}
                  <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {discussion.content.substring(0, 200)}...
                  </div>
                  
                  {/* Engagement stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span className="text-green-600">▲</span>
                        {discussion.upvotes} upvotes
                      </span>
                      <span>{discussion.views} views</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {discussion.conversation.length} active participants
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'study-groups' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Study Groups</h2>
              <button 
                onClick={() => alert('Create Study Group\n\nThis would open a form to:\n• Name your study group\n• Set description and goals\n• Choose meeting schedule\n• Invite members')}
                className="bg-[#AC5757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Create Group
              </button>
            </div>
            
            {/* Study Groups Search Bar */}
            <div className="max-w-md">
              <SearchBar 
                placeholder="Search study groups, courses, professors..." 
                onSearch={handleSearch}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyGroups
                .filter(group => 
                  searchQuery === '' || 
                  group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.course.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((group, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border-2 border-[#AC5757] bg-gradient-to-br from-[#AC5757]/5 to-[#AC5757]/10 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleGroupClick(group)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        {group.isProfessorAssigned && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#AC5757] text-white">
                            Professor-Assigned
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>Course: {group.course}</span>
                        <span>•</span>
                        <span>Prof: {group.professor}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#AC5757]/20 text-[#AC5757]">
                      {group.category}
                    </span>
                  </div>
                  
                  {/* Credit System */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Credits Available</span>
                      <span className="text-lg font-bold text-[#AC5757]">{group.credits} XP</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Earn credits by participating in study sessions and completing group activities
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                        {group.members}/{group.maxMembers} members
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {group.weeklyHours}h/week
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Next Session</div>
                      <div className="font-medium">{group.nextSession}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin size={12} />
                      {group.meetingLocation}
                    </div>
                    <div className="text-gray-400">{group.requirements}</div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinGroup(group.name);
                    }}
                    className="w-full bg-[#AC5757] text-white py-2 rounded-lg font-medium hover:bg-[#8A4A4A] transition-colors"
                  >
                    Join Group {group.credits > 0 ? `(+${group.credits} XP)` : ''}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Discussions Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Course Discussions</h2>
            </div>
            
            {/* Course Discussions Search Bar */}
            <div className="max-w-md">
              <SearchBar 
                placeholder="Search courses, instructors..." 
                onSearch={handleSearch}
              />
            </div>
            
            <div className="space-y-4">
              {courseDiscussions
                .filter(course => 
                  searchQuery === '' || 
                  course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  course.instructorArabic.includes(searchQuery) ||
                  course.instructorEnglish.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((course, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{course.courseName}</h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {course.credits} Credits
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Arabic:</span> {course.instructorArabic}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">English:</span> {course.instructorEnglish}
                        </p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{course.activeTopics}</span> active topics
                        </div>
                        <div>
                          <span className="font-medium">{course.participants}</span> participants
                        </div>
                        <div>Last post: {course.lastPost}</div>
                        </div>
                        
                        <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                          <span className="font-medium">Last reply:</span> {course.lastReplyBy}
                        </div>
                        
                        {course.hasDueDate && (
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <Clock size={14} />
                            <span className="font-medium">Due Date:</span>
                            <span>{new Date(course.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleJoinCourseDiscussion(course.courseName)}
                      className="bg-[#AC5757] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8A4A4A] transition-colors"
                    >
                      Join Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Discussion Detail Modal */}
      {showDiscussionModal && selectedDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedDiscussion.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {selectedDiscussion.authorAvatar}
                      </div>
                    <span>by {selectedDiscussion.author}</span>
                      <span className="text-xs text-gray-500">• {selectedDiscussion.authorRole}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedDiscussion.replies} replies</span>
                    <span>•</span>
                    <span>{selectedDiscussion.lastActive}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">▲</span>
                      {selectedDiscussion.upvotes} upvotes
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDiscussionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* Original Post */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#AC5757] rounded-full flex items-center justify-center text-white font-bold">
                      {selectedDiscussion.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{selectedDiscussion.author}</span>
                        <span className="text-sm text-gray-500">{selectedDiscussion.authorRole}</span>
                        <span className="text-sm text-gray-400">• {selectedDiscussion.lastActive}</span>
                      </div>
                      <div className="text-gray-700 whitespace-pre-line">
                        {selectedDiscussion.content}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Replies ({selectedDiscussion.conversation.length})</h3>
                  {selectedDiscussion.conversation.map((reply, idx) => (
                    <div key={idx} className="border-l-2 border-gray-200 pl-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {reply.authorAvatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">{reply.author}</span>
                              <span className="text-sm text-gray-500">{reply.authorRole}</span>
                              <span className="text-sm text-gray-400">• {reply.timestamp}</span>
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <span className="text-green-600">▲</span>
                                {reply.upvotes}
                              </span>
                            </div>
                            <div className="text-gray-700 mb-3">
                              {reply.content}
                            </div>
                            
                            {/* Nested Replies */}
                            {reply.replies && reply.replies.length > 0 && (
                              <div className="ml-4 space-y-3">
                                {reply.replies.map((nestedReply, nestedIdx) => (
                                  <div key={nestedIdx} className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                      <div className="w-6 h-6 bg-[#AC5757] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {nestedReply.authorAvatar}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-semibold text-gray-900 text-sm">{nestedReply.author}</span>
                                          <span className="text-xs text-gray-500">{nestedReply.authorRole}</span>
                                          <span className="text-xs text-gray-400">• {nestedReply.timestamp}</span>
                                          <span className="flex items-center gap-1 text-xs text-gray-500">
                                            <span className="text-green-600">▲</span>
                                            {nestedReply.upvotes}
                                          </span>
                                        </div>
                                        <div className="text-gray-700 text-sm">
                                          {nestedReply.content}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      alert('Reply added!\n\nYour response has been posted to the discussion.');
                      setShowDiscussionModal(false);
                    }}
                    className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                  >
                    Reply to Discussion
                  </button>
                  <button 
                    onClick={() => alert('Discussion bookmarked!\n\nYou can find it in your saved items.')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Bookmark
                  </button>
                  <button 
                    onClick={() => alert('Discussion upvoted!\n\nThanks for your contribution.')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span className="text-green-600">▲</span>
                    Upvote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Group Detail Modal */}
      {showGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{selectedGroup.name}</h2>
                    {selectedGroup.isProfessorAssigned && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#AC5757] text-white">
                        Professor-Assigned
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedGroup.course} • {selectedGroup.professor}
                  </div>
                </div>
                <button 
                  onClick={() => setShowGroupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{selectedGroup.description}</p>
              
              {/* Credit System */}
              <div className="bg-gradient-to-r from-[#AC5757]/10 to-[#AC5757]/5 rounded-lg p-4 mb-4 border border-[#AC5757]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Credits Available</span>
                  <span className="text-2xl font-bold text-[#AC5757]">{selectedGroup.credits} XP</span>
                </div>
                <div className="text-xs text-gray-600">
                  Earn credits by participating in study sessions, completing assignments, and contributing to group discussions
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                  <span className="text-gray-600">Members:</span>
                    <span className="font-medium">{selectedGroup.members}/{selectedGroup.maxMembers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Weekly Hours:</span>
                    <span className="font-medium">{selectedGroup.weeklyHours}h</span>
                </div>
                  <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Session:</span>
                  <span className="font-medium">{selectedGroup.nextSession}</span>
                </div>
                  <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{selectedGroup.category}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin size={14} />
                    {selectedGroup.meetingLocation}
                  </div>
                  <div className="text-xs text-gray-500">
                    Requirements: {selectedGroup.requirements}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleJoinGroup(selectedGroup.name)}
                  className="w-full bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  Join Group {selectedGroup.credits > 0 ? `(+${selectedGroup.credits} XP)` : ''}
                </button>
                <button 
                  onClick={() => setShowGroupModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification Popup */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Success!</h3>
              <p className="text-gray-600 mb-6 whitespace-pre-line">
                {notificationMessage}
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="bg-[#AC5757] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Discussion Notification Popup */}
      {showCourseNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discussion Joined!</h3>
              <p className="text-gray-600 mb-6 whitespace-pre-line">
                {courseNotificationMessage}
              </p>
              <button
                onClick={() => setShowCourseNotification(false)}
                className="bg-[#AC5757] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Community;