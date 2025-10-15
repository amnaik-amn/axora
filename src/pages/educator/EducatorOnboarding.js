import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EducatorOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);

  const totalSteps = 4;

  const roles = [
    'Professor',
    'Teaching Assistant', 
    'Course Coordinator',
    'Department Head',
    'Academic Advisor'
  ];

  const goals = [
    'Teach',
    'Assess',
    'Mentor',
    'Research',
    'Collaborate'
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      setCurrentStep(3); // Go to step 3 (second question)
    }, 300);
  };

  const handleGoalSelect = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
      // Automatically transition to step 4 after selecting a goal
      setTimeout(() => {
        setCurrentStep(4);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('educatorOnboardingComplete', 'true');
      localStorage.setItem('educatorRole', selectedRole);
      localStorage.setItem('educatorGoals', JSON.stringify(selectedGoals));
      navigate('/educator');
    }
  };

  const handleComplete = () => {
    localStorage.setItem('educatorOnboardingComplete', 'true');
    localStorage.setItem('educatorRole', selectedRole);
    localStorage.setItem('educatorGoals', JSON.stringify(selectedGoals));
    navigate('/educator');
  };

  return (
    <div className="min-h-screen bg-[#B67070] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
            <h1 className="text-4xl font-bold mb-12">AXORA</h1>
            <p className="text-xl leading-relaxed mb-16 px-4">
              Let's set up your educator workspace together.
            </p>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-12 py-4 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {currentStep === 2 && (
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-12 leading-relaxed px-2">
              What's your role in education?
            </h1>
            <div className="space-y-4 mb-8">
              {roles.map((role, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRoleSelect(role)}
                  className="w-full bg-white/90 text-gray-800 py-4 rounded-xl font-semibold text-lg hover:bg-white transition-all"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals Selection */}
        {currentStep === 3 && (
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-12 leading-relaxed">
              What are your main goals?
            </h1>
            <div className="space-y-4 mb-8">
              {goals.map((goal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoalSelect(goal)}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    selectedGoals.includes(goal)
                      ? 'bg-white text-gray-800'
                      : 'bg-white/90 text-gray-800 hover:bg-white'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Final Message */}
        {currentStep === 4 && (
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-12 leading-relaxed px-4">
              We'll customize your educator dashboard with teaching tools and student insights.
            </h1>
            <p className="text-lg leading-relaxed mb-16 px-4 opacity-90">
              This helps us provide the right resources, analytics, and collaboration features.
            </p>
            <button
              onClick={handleComplete}
              className="px-12 py-4 bg-white text-[#B67070] rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Get Started
            </button>
          </div>
        )}

      </div>

      {/* Progress Indicator */}
      <div className="pb-8 px-6">
        <div className="text-center text-white mb-4">
          <span className="text-sm font-medium">STEP {currentStep} OF {totalSteps}</span>
        </div>
        <div className="w-24 mx-auto">
          <div className="h-1 bg-white/30 rounded-full">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorOnboarding;
