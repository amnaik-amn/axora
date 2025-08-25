import React, { useState } from 'react';
import { Trophy, Clock, Target, Zap, Globe, Building, MapPin } from 'lucide-react';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('local');

  const tabs = [
    { id: 'local', label: 'Local', icon: MapPin },
    { id: 'international', label: 'International', icon: Globe },
    { id: 'university', label: 'University', icon: Building },
  ];

  const challenges = {
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
      {
        title: 'Transit Optimization Model',
        category: 'Data Science',
        duration: '3 weeks',
        difficulty: 'Advanced',
        xpReward: 750,
        participants: 12,
        aiSuggested: true
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
      {
        title: 'Multilingual Education Platform',
        category: 'EdTech',
        duration: '3 weeks',
        difficulty: 'Intermediate',
        xpReward: 600,
        participants: 89,
        aiSuggested: true
      },
      {
        title: 'Blockchain for Supply Chain',
        category: 'Web3',
        duration: '2 weeks',
        difficulty: 'Advanced',
        xpReward: 800,
        participants: 67,
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
      {
        title: 'Student Mental Health App',
        category: 'Healthcare',
        duration: '3 weeks',
        difficulty: 'Intermediate',
        xpReward: 550,
        participants: 28,
        aiSuggested: true
      },
      {
        title: 'Library Resource Optimizer',
        category: 'Systems',
        duration: '1 week',
        difficulty: 'Beginner',
        xpReward: 200,
        participants: 52,
        aiSuggested: false
      },
    ],
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-ink font-bold mb-2">Challenges</h1>
          <p className="text-gray-600">Complete real-world projects and earn XP</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-brand border-b-2 border-brand'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Challenge Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challenges[activeTab].map((challenge, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-brand/10 p-2 rounded-lg">
                  <Trophy className="text-brand" size={24} />
                </div>
                {challenge.aiSuggested && (
                  <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Zap size={12} />
                    AI-Suggested
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-ink text-lg mb-1">{challenge.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{challenge.category}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target size={16} className="text-gray-600" />
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <div className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
                    {challenge.xpReward} XP
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {challenge.participants} joined
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations Section */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-purple-600" size={20} />
            <h2 className="font-serif text-xl text-ink font-bold">AI Recommendations</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Based on your skills and interests, we recommend focusing on Data Science and Environmental Tech challenges to maximize your learning and XP gains.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            View Personalized Challenges
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;