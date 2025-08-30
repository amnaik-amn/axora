import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { checkAuth } from './auth/config';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Study from './pages/Study';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Alerts from './pages/Alerts';
import Messages from './pages/Messages';
import Support from './pages/Support';
import Concepts from './pages/Concepts';
import VRLanding from './pages/VRLanding';

// Components
import AppShell from './components/AppShell';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth();
  const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected Routes with AppShell */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="study" element={<Study />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Alerts />} />
          <Route path="messages" element={<Messages />} />
          <Route path="support" element={<Support />} />
          <Route path="concepts" element={<Concepts />} />
          <Route path="vr" element={<VRLanding />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
