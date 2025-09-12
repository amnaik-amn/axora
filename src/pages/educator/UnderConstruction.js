import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction, BookOpen, Users, Award, BarChart3, Clock, CheckCircle } from 'lucide-react';

const UnderConstruction = () => {
  const [progress, setProgress] = useState(42);

  const upcomingFeatures = [
    { icon: BookOpen, title: "Study Section", description: "Grading courses (Spatial Reasoning, BIM, Structures, Geotechnical Engineering), tests, and teaching resources", status: "in-progress" },
    { icon: Users, title: "Community Hub", description: "Discussion forums, study groups, and course discussions for educators", status: "planned" },
    { icon: Award, title: "Challenges", description: "Local, international, and university teaching challenges with rewards", status: "planned" },
    { icon: BarChart3, title: "Profile & Analytics", description: "Personal profile management and teaching progress tracking", status: "in-progress" },
    { icon: Clock, title: "Messages & Alerts", description: "Chat with students, colleagues, and support team", status: "planned" },
    { icon: CheckCircle, title: "Support & Concepts", description: "FAQ, live chat support, and educational concept library", status: "planned" }
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 42; // Reset to 42 for demo effect
        return prev + Math.random() * 2;
      });
    }, 2000);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center mb-8">
          <Construction className="mx-auto text-6xl text-gray-400 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Under Construction
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            This feature is currently being developed for the Educator's Demo platform.
          </p>
          <p className="text-base text-gray-500">
            We're working hard to bring you powerful tools for managing courses, 
            tracking student progress, and enhancing your teaching experience.
          </p>
        </div>

        {/* Upcoming Features */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What's Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                    feature.status === 'in-progress' 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent 
                      className={`${
                        feature.status === 'in-progress' ? 'text-blue-500' : 'text-gray-400'
                      }`} 
                      size={20} 
                    />
                    <span className={`font-medium text-sm ${
                      feature.status === 'in-progress' ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {feature.title}
                    </span>
                    {feature.status === 'in-progress' && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Development Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Progress updates in real-time as our team builds features for educators
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link 
            to="/educator" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Educator's Demo Platform - Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
