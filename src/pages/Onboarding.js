import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);

  const totalSteps = 5;

  const roles = [
    'Student',
    'Educator', 
    'Professional',
    'Organization',
    'Hobbyist'
  ];

  const goals = [
    'Learn',
    'Mentor',
    'Compete',
    'Collaborate',
    'Showcase'
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      setCurrentStep(3); // Skip step 3, go to goals
    }, 300);
  };

  const handleGoalSelect = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('userGoals', JSON.stringify(selectedGoals));
      navigate('/app');
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('userGoals', JSON.stringify(selectedGoals));
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#B67070] flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white">
        <span className="text-sm font-medium">09:46</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <svg className="w-6 h-4 text-white ml-2" fill="currentColor" viewBox="0 0 20 12">
            <path d="M2 10h16v-2H2v2zm0-6h16V2H2v2z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
            <h1 className="text-4xl font-bold mb-12">AXORA</h1>
            <p className="text-xl leading-relaxed mb-16 px-4">
              Let's set up your creative journey together.
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
              Let's start by getting to know you better.
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
              Tell us about your goals
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
            {selectedGoals.length > 0 && (
              <button
                onClick={() => setCurrentStep(5)}
                className="mt-8 px-8 py-3 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 5: Final Message */}
        {currentStep === 5 && (
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-12 leading-relaxed px-4">
              We'll tailor your dashboard, content, and opportunities based on your journey.
            </h1>
            <p className="text-lg leading-relaxed mb-16 px-4 opacity-90">
              This helps us match you with the right challenges, mentors, and resources.
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

export default Onboarding;