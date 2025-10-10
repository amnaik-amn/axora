import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { checkAuth } from './auth/config';

// Pages
import Landing from './pages/Landing';
import InspiredLanding from './pages/InspiredLanding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Study from './pages/Study';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import StudyDemo from './pages/StudyDemo';
import CommunityDemo from './pages/CommunityDemo';
import ChallengesDemo from './pages/ChallengesDemo';
import PinupDemo from './pages/PinupDemo';
import ProgressDemo from './pages/ProgressDemo';
import PrivacySecurity from './pages/PrivacySecurity';
import HelpSupport from './pages/HelpSupport';
import FAQs from './pages/FAQs';
import Alerts from './pages/Alerts';
import Messages from './pages/Messages';
import Support from './pages/Support';
import Concepts from './pages/Concepts';
import VRLanding from './pages/VRLanding';
import CourseDetail from './pages/CourseDetail';
import Pinup from './pages/Pinup';
import CourseProjects from './pages/CourseProjects';
import ProjectDetail from './pages/ProjectDetail';

// Educator Pages
import EducatorLogin from './pages/educator/EducatorLogin';
import EducatorSignup from './pages/educator/EducatorSignup';
import EducatorOnboarding from './pages/educator/EducatorOnboarding';
import EducatorHome from './pages/educator/EducatorHome';
import EducatorStudy from './pages/educator/Study';
import EducatorChallenges from './pages/educator/Challenges';
import EducatorCommunity from './pages/educator/Community';
import EducatorProfile from './pages/educator/Profile';
import EducatorAlerts from './pages/educator/Alerts';
import EducatorMessages from './pages/educator/Messages';
import EducatorSupport from './pages/educator/Support';
import EducatorConcepts from './pages/educator/Concepts';
import EducatorVRLanding from './pages/educator/VRLanding';
import UnderConstruction from './pages/educator/UnderConstruction';

// Components
import AppShell from './components/AppShell';
import EducatorAppShell from './components/EducatorAppShell';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  const isAuthenticated = signupUser || demoUser;
  const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" />;
  }
  
  return children;
};

// Educator Protected Route Component
const EducatorProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth();
  const hasCompletedOnboarding = localStorage.getItem('educatorOnboardingComplete') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/educator-login" />;
  }
  
  if (!hasCompletedOnboarding) {
    return <Navigate to="/educator-onboarding" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/inspired" element={<InspiredLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Educator Public Routes */}
        <Route path="/educator-login" element={<EducatorLogin />} />
        <Route path="/educator-signup" element={<EducatorSignup />} />
        <Route path="/educator-onboarding" element={<EducatorOnboarding />} />

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
          <Route path="progress" element={<Progress />} />
          <Route path="study-demo" element={<StudyDemo />} />
          <Route path="community-demo" element={<CommunityDemo />} />
          <Route path="challenges-demo" element={<ChallengesDemo />} />
          <Route path="pinup-demo" element={<PinupDemo />} />
          <Route path="progress-demo" element={<ProgressDemo />} />
          <Route path="privacy-security" element={<PrivacySecurity />} />
          <Route path="help-support" element={<HelpSupport />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="notifications" element={<Alerts />} />
          <Route path="messages" element={<Messages />} />
          <Route path="support" element={<Support />} />
          <Route path="concepts" element={<Concepts />} />
          <Route path="vr" element={<VRLanding />} />
          <Route path="pinup" element={<Pinup />} />
          <Route path="course-projects" element={<CourseProjects />} />
          <Route path="course/:courseId" element={<CourseDetail />} />
          <Route path="project/:projectId" element={<ProjectDetail />} />
        </Route>

        {/* Educator Protected Routes with EducatorAppShell */}
        <Route
          path="/educator"
          element={
            <EducatorProtectedRoute>
              <EducatorAppShell />
            </EducatorProtectedRoute>
          }
        >
          <Route index element={<EducatorHome />} />
          <Route path="study" element={<UnderConstruction />} />
          <Route path="challenges" element={<UnderConstruction />} />
          <Route path="community" element={<UnderConstruction />} />
          <Route path="profile" element={<UnderConstruction />} />
          <Route path="notifications" element={<UnderConstruction />} />
          <Route path="messages" element={<UnderConstruction />} />
          <Route path="support" element={<UnderConstruction />} />
          <Route path="concepts" element={<UnderConstruction />} />
          <Route path="vr" element={<UnderConstruction />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
