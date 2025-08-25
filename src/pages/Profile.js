import React from 'react';
import { User, Trophy, Zap, Calendar, TrendingUp, Award, Edit } from 'lucide-react';
import { checkAuth } from '../auth/config';

const Profile = () => {
  const user = checkAuth();

  const stats = [
    { label: 'Total XP', value: user?.xp || 0, icon: Zap, color: 'bg-purple-500' },
    { label: 'Current Streak', value: `${user?.streak || 0} days`, icon: Calendar, color: 'bg-orange-500' },
    { label: 'Challenges', value: user?.completedChallenges || 0, icon: Trophy, color: 'bg-green-500' },
    { label: 'Rank', value: 'Rising Star', icon: Award, color: 'bg-blue-500' },
  ];

  const achievements = [
    { name: 'Fast Learner', description: 'Complete 5 courses', earned: true },
    { name: 'Problem Solver', description: 'Solve 10 challenges', earned: true },
    { name: 'Team Player', description: 'Join 3 study groups', earned: false },
    { name: 'Consistent', description: '30-day streak', earned: false },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Data Structures Quiz', time: '2 hours ago', xp: 50 },
    { action: 'Started', item: 'Machine Learning Course', time: '1 day ago', xp: 0 },
    { action: 'Joined', item: 'AI Study Group', time: '3 days ago', xp: 25 },
    { action: 'Completed', item: 'Urban Sustainability Challenge', time: '1 week ago', xp: 500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center">
              <User className="text-brand" size={40} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-serif text-2xl text-ink font-bold mb-1">{user?.name}</h1>
              <p className="text-gray-600 mb-2">{user?.program} • {user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm font-medium">
                  Level 12
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Top 10% Learner
                </span>
              </div>
            </div>
            <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <TrendingUp className="text-green-500" size={16} />
                </div>
                <div className="text-2xl font-bold text-ink">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-serif text-xl text-ink font-bold mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {achievement.earned && <Trophy className="text-white" size={16} />}
                    </div>
                    <div>
                      <div className={`font-medium ${achievement.earned ? 'text-ink' : 'text-gray-400'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                  {achievement.earned && (
                    <span className="text-green-600 text-sm font-medium">Earned</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-serif text-xl text-ink font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-ink">{activity.action}</span>
                      <span className="text-gray-600"> {activity.item}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                  {activity.xp > 0 && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      +{activity.xp} XP
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-purple-50 rounded-xl p-6 mt-6">
          <h2 className="font-serif text-xl text-ink font-bold mb-4">Your Learning Journey</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-bold text-brand mb-1">85%</div>
              <div className="text-sm text-gray-600">Course Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">A+</div>
              <div className="text-sm text-gray-600">Average Grade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">Top 5%</div>
              <div className="text-sm text-gray-600">Class Ranking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;