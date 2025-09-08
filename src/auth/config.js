export const DEMO_USERS = {
  learner: {
    email: "ahmed.almansouri@demo.com",
    password: "demo123",
    name: "Ahmed Al-Mansouri",
    program: "Computer Science",
    xp: 1250,
    streak: 7,
    completedChallenges: 12,
    role: "learner"
  },
  educator: {
    email: "prof.sarah@demo.com",
    password: "prof123",
    name: "Prof. Sarah Johnson",
    department: "Architecture & Design",
    institution: "University of Architecture",
    activeStudents: 127,
    courses: 4,
    role: "educator"
  },
  professor: {
    email: "prof.sarah@demo.com",
    password: "prof123",
    name: "Prof. Sarah Johnson",
    department: "Architecture & Design",
    institution: "University of Architecture",
    activeStudents: 127,
    courses: 4,
    role: "professor"
  },
  recruiter: {
    email: "recruiter@demo.com",
    password: "recruit123",
    name: "Alex Thompson",
    company: "TechCorp Solutions",
    role: "recruiter"
  }
};

// Backward compatibility
export const DEMO_USER = DEMO_USERS.learner;

export const checkAuth = () => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

export const login = (email, password) => {
  // Find matching demo user
  const demoUser = Object.values(DEMO_USERS).find(user => 
    user.email === email && user.password === password
  );
  
  if (demoUser) {
    const session = {
      ...demoUser,
      loggedIn: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('userSession', JSON.stringify(session));
    return session;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('userSession');
};