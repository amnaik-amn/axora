export const STUDY_RESOURCES = [
  { 
    title: 'Introduction to Algorithms',
    type: 'Book',
    progress: 45,
    status: 'continue',
    aiTailored: true
  },
  { 
    title: 'Data Science Fundamentals',
    type: 'PDF',
    progress: 0,
    status: 'assigned',
    aiTailored: false
  },
  { 
    title: 'Machine Learning Handbook',
    type: 'Interactive',
    progress: 78,
    status: 'continue',
    aiTailored: true
  },
  { 
    title: 'Web Development Guide',
    type: 'Video Series',
    progress: 100,
    status: 'completed',
    aiTailored: false
  },
];

export const TESTS = [
  {
    title: 'Midterm: Data Structures',
    attempts: 2,
    bestScore: 85,
    status: 'passed',
    deadline: 'Dec 20, 2024'
  },
  {
    title: 'Quiz: Python Basics',
    attempts: 1,
    bestScore: 92,
    status: 'passed',
    deadline: 'Dec 15, 2024'
  },
  {
    title: 'Final: Algorithms',
    attempts: 0,
    bestScore: null,
    status: 'pending',
    deadline: 'Dec 25, 2024'
  },
];

export const COURSES = [
  {
    title: 'CS101: Introduction to Computer Science',
    professor: 'Dr. Smith',
    assignedBy: 'professor',
    progress: 65
  },
  {
    title: 'Advanced Machine Learning',
    professor: 'AI Recommended',
    assignedBy: 'ai',
    progress: 30
  },
  {
    title: 'Web Development Bootcamp',
    professor: 'Prof. Johnson',
    assignedBy: 'professor',
    progress: 80
  },
];

export const CHALLENGES_DATA = {
  local: [
    {
      title: 'Urban Sustainability App',
      category: 'Environmental Tech',
      duration: '2 weeks',
      difficulty: 'Intermediate',
      xpReward: 500,
      participants: 24,
      aiSuggested: true
    },
    {
      title: 'Community Resource Mapper',
      category: 'Social Impact',
      duration: '1 week',
      difficulty: 'Beginner',
      xpReward: 250,
      participants: 45,
      aiSuggested: false
    },
  ],
  international: [
    {
      title: 'Global Climate Data Analysis',
      category: 'Data Science',
      duration: '4 weeks',
      difficulty: 'Advanced',
      xpReward: 1000,
      participants: 156,
      aiSuggested: false
    },
  ],
  university: [
    {
      title: 'Campus Energy Dashboard',
      category: 'Sustainability',
      duration: '2 weeks',
      difficulty: 'Intermediate',
      xpReward: 400,
      participants: 34,
      aiSuggested: true
    },
  ],
};

export const PROFESSORS = [
  { name: 'Dr. Sarah Smith', course: 'Machine Learning', students: 156, rating: 4.8 },
  { name: 'Prof. John Davis', course: 'Data Structures', students: 234, rating: 4.9 },
  { name: 'Dr. Emily Chen', course: 'Web Development', students: 189, rating: 4.7 },
  { name: 'Prof. Michael Brown', course: 'Algorithms', students: 167, rating: 4.6 },
];

export const STUDENTS = [
  { name: 'Alex Johnson', program: 'Computer Science', year: 3, xp: 2340 },
  { name: 'Maria Garcia', program: 'Data Science', year: 2, xp: 1890 },
  { name: 'James Wilson', program: 'Software Engineering', year: 4, xp: 3120 },
  { name: 'Lisa Anderson', program: 'Computer Science', year: 2, xp: 1560 },
];