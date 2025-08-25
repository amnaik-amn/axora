import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Users, TrendingUp, Calendar, Briefcase, ChevronRight, Zap, Clock, Sparkles } from 'lucide-react';
import { checkAuth } from '../auth/config';

const Home = () => {
  const user = checkAuth();

  const quickActions = [
    { icon: BookOpen, label: 'Study', path: '/app/study', color: 'bg-blue-500' },
    { icon: Trophy, label: 'Challenges', path: '/app/challenges', color: 'bg-green-500' },
    { icon: Users, label: 'Community', path: '/app/community', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Progress', path: '/app/profile', color: 'bg-orange-500' },
  ];

  const concepts = [
    { title: 'Machine Learning Basics', progress: 65, difficulty: 'Intermediate' },
    { title: 'Data Structures', progress: 80, difficulty: 'Advanced' },
    { title: 'Web Development', progress: 45, difficulty: 'Beginner' },
    { title: 'Cloud Computing', progress: 30, difficulty: 'Intermediate' },
  ];

  const opportunities = [
    { type: 'Event', title: 'AI Workshop', date: 'Tomorrow, 2PM', icon: Calendar },
    { type: 'Job', title: 'Junior Developer - TechCo', date: 'Apply by Dec 15', icon: Briefcase },
    { type: 'News', title: 'New Python Course Available', date: '2 hours ago', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-brand text-white p-8 lg:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300/20 rounded-full filter blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-yellow-300" size={20} />
            <span className="text-yellow-300 text-sm font-medium">Active Learner</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-white/90 text-lg mb-6">
            You're on a {user?.streak}-day streak 🔥 Keep it up!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
              <Zap className="text-yellow-300" size={16} />
              <span className="font-bold">{user?.xp} XP</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
              <Trophy className="text-yellow-300" size={16} />
              <span className="font-bold">{user?.completedChallenges} Challenges</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
              <TrendingUp className="text-green-300" size={16} />
              <span className="font-bold">Top 10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-ink font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <Link
                key={path}
                to={path}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-lg text-ink">{label}</h3>
                <ChevronRight className="text-gray-400 group-hover:text-brand transition-colors mt-2" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Concepts */}
      <div className="p-6 lg:p-8 pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-2xl text-ink font-bold">Explore Concepts</h2>
            <Link to="/app/study" className="text-brand flex items-center gap-1 hover:gap-2 transition-all font-medium">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {concepts.map((concept, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all min-w-[280px] group hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-ink">{concept.title}</h3>
                  <Sparkles className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    concept.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    concept.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {concept.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{Math.floor(concept.progress * 0.8)} lessons</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-brand h-3 rounded-full transition-all shadow-sm"
                      style={{ width: `${concept.progress}%` }}
                    />
                  </div>
                  <div className="text-sm font-bold text-brand mt-2">{concept.progress}% complete</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities Feed */}
      <div className="p-6 lg:p-8 pt-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-ink font-bold mb-4">Opportunities</h2>
          <div className="space-y-4">
            {opportunities.map((opp, idx) => {
              const Icon = opp.icon;
              const colors = [
                'bg-blue-500',
                'bg-green-500',
                'bg-purple-500'
              ];
              return (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${colors[idx]} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{opp.type}</div>
                        <h3 className="font-bold text-lg text-ink group-hover:text-brand transition-colors">{opp.title}</h3>
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Clock size={14} />
                          {opp.date}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-brand transition-colors group-hover:translate-x-1" size={24} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;