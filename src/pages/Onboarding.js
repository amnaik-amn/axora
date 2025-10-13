import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    educationLevel: '',
    institution: '',
    institutionType: '',
    experience: '',
    interests: [],
    keyConcepts: []
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Save onboarding data to localStorage
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    localStorage.setItem('onboardingComplete', 'true');
    
    // Redirect to home page
    window.location.href = '/app';
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const renderStep1 = () => (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Axora</h1>
      <p className="text-xl text-gray-600 mb-12">Let's personalize your experience!</p>
      <p className="text-lg text-gray-700 mb-8">Choose the option that best describes you to help us tailor your learning and professional resources.</p>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">WHO ARE YOU?*</h2>
      <div className="space-y-4">
        <button
          onClick={() => updateFormData('userType', 'student')}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.userType === 'student' 
              ? 'border-[#AC5757] bg-[#AC5757]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🎓</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">I'm a Student</h3>
              <p className="text-gray-600">High school or university learner exploring architecture, engineering, or design concepts</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => updateFormData('userType', 'educator')}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.userType === 'educator' 
              ? 'border-[#AC5757] bg-[#AC5757]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🧑‍🏫</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">I'm an Educator</h3>
              <p className="text-gray-600">Professor, instructor, or mentor guiding learners or managing design studios</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => updateFormData('userType', 'professional')}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.userType === 'professional' 
              ? 'border-[#AC5757] bg-[#AC5757]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🏗️</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">I'm a Professional</h3>
              <p className="text-gray-600">Practicing architect, engineer, or designer — working, freelancing, or upskilling</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => updateFormData('userType', 'organization')}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.userType === 'organization' 
              ? 'border-[#AC5757] bg-[#AC5757]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🏢</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">I represent an Organization</h3>
              <p className="text-gray-600">Firm, government entity, or university department using Axora for team learning</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Tell us more about yourself</h2>
      <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">1. Profession / Education Level</h3>
      <p className="text-gray-600 mb-6 text-center">Select one that best fits you:</p>
      
      <div className="space-y-3">
        {[
          'High School Student',
          'University Student (Specify year: 1st, 2nd, 3rd, 4th, or Final Year)',
          'Graduate / Master\'s Student',
          'PhD Candidate / Researcher',
          'Practicing Professional (1–5 years of experience)',
          'Senior Professional (5–10+ years of experience)',
          'Industry Expert / Mentor',
          'Looking for a Job or Internship'
        ].map((option) => (
          <button
            key={option}
            onClick={() => updateFormData('educationLevel', option)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              formData.educationLevel === option 
                ? 'border-[#AC5757] bg-[#AC5757]/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-gray-900">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Where are you learning or working?</h2>
      <p className="text-gray-600 mb-8 text-center">Your educational institution or workplace helps us connect you with relevant communities:</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => updateFormData('institution', e.target.value)}
            placeholder="Enter your school, university, or organization"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={formData.institutionType}
            onChange={(e) => updateFormData('institutionType', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="high-school">High School</option>
            <option value="university">University</option>
            <option value="firm">Architecture/Engineering Firm</option>
            <option value="government">Government Entity</option>
            <option value="other">Other</option>
          </select>
        </div>

        {formData.userType === 'professional' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Duration</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => updateFormData('experience', e.target.value)}
              placeholder="e.g., 1 year, 5+ years"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => {
    const architectureInterests = [
      'Sustainable Architecture',
      'Building Technology',
      'Digital Fabrication',
      'Urban Design',
      'Interior Architecture',
      'Architectural History & Theory',
      'Landscape Design',
      'Building Information Modeling (BIM)'
    ];

    const engineeringInterests = [
      'Structural Engineering',
      'Civil Engineering',
      'Environmental Engineering',
      'Mechanical Systems in Buildings',
      'Electrical Engineering',
      'Transportation Systems',
      'Materials & Construction Technology',
      'Infrastructure Design'
    ];

    const aiInterests = [
      'AI in Architecture & Engineering',
      'Parametric Design (Grasshopper/Rhino, Revit Dynamo)',
      'Generative Design',
      'Robotics in Construction',
      'Smart Cities & IoT',
      'Simulation & Performance Analysis',
      'Digital Twin Systems'
    ];

    const keyConcepts = [
      'Sustainability',
      'Digital Transformation',
      'Design Competitions',
      'Collaborative Workflows',
      'Research & Innovation',
      'Future Cities',
      'Climate-Responsive Design'
    ];

    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What are you most interested in?</h2>
        <p className="text-gray-600 mb-8 text-center">Choose 4–5 courses or skill areas and 2 key concepts that inspire you the most. (Minimum 1 selection required)</p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {architectureInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleArrayValue('interests', interest)}
                  className={`p-3 text-left border-2 rounded-lg transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-[#AC5757] bg-[#AC5757]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-gray-900">{interest}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Engineering</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {engineeringInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleArrayValue('interests', interest)}
                  className={`p-3 text-left border-2 rounded-lg transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-[#AC5757] bg-[#AC5757]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-gray-900">{interest}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI + Computational Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleArrayValue('interests', interest)}
                  className={`p-3 text-left border-2 rounded-lg transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-[#AC5757] bg-[#AC5757]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-gray-900">{interest}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🌍 Broaden your world</h3>
            <p className="text-gray-600 mb-4">Select 2 key concepts that reflect your interests or career goals:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keyConcepts.map((concept) => (
                <button
                  key={concept}
                  onClick={() => toggleArrayValue('keyConcepts', concept)}
                  disabled={!formData.keyConcepts.includes(concept) && formData.keyConcepts.length >= 2}
                  className={`p-3 text-left border-2 rounded-lg transition-all ${
                    formData.keyConcepts.includes(concept)
                      ? 'border-[#AC5757] bg-[#AC5757]/5'
                      : formData.keyConcepts.length >= 2
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-gray-900">{concept}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep6 = () => (
    <div className="text-center">
      <div className="mb-8">
        <Check className="w-24 h-24 text-[#AC5757] mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ENJOY YOUR TAILORED JOURNEY</h1>
        <p className="text-xl text-gray-600">We've personalized your Axora experience based on your preferences!</p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2: return formData.userType !== '';
      case 3: return formData.educationLevel !== '';
      case 4: return formData.institution !== '' && formData.institutionType !== '';
      case 5: return formData.interests.length >= 1;
      case 6: return true;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#AC5757] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-8 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-all"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-[#AC5757] text-white hover:bg-[#8A4A4A]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;