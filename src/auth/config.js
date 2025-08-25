export const DEMO_USER = {
  email: "student@demo.com",
  password: "demo123",
  name: "Demo Student",
  program: "Computer Science",
  xp: 1250,
  streak: 7,
  completedChallenges: 12
};

export const checkAuth = () => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

export const login = (email, password) => {
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    const session = {
      ...DEMO_USER,
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