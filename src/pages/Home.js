import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Users, TrendingUp, Calendar, Briefcase, ChevronRight, Zap, Clock, Sparkles } from 'lucide-react';
import { Button, Badge, ProgressBar, Card } from '../components/ui';
import { Container } from '../components/layout';
import { checkAuth } from '../auth/config';
import { CONCEPTS, OPPORTUNITIES } from '../constants/content';
import { getDifficultyColor } from '../utils/helpers';

const Home = () => {
  const user = checkAuth();

  const quickActions = [
    { icon: BookOpen, label: 'Study', path: '/app/study', color: 'bg-blue-500' },
    { icon: Trophy, label: 'Challenges', path: '/app/challenges', color: 'bg-green-500' },
    { icon: Users, label: 'Community', path: '/app/community', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Progress', path: '/app/profile', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-brand text-white p-8 lg:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300/20 rounded-full filter blur-3xl" />
        <Container>
          <div className="relative">
            <Badge variant="success" className="mb-4">
              <Zap size={16} className="mr-2" />
              Active Learner
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-white/90 text-lg mb-6">
              You're on a {user?.streak}-day streak 🔥 Keep it up!
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-md">
                <Zap className="text-yellow-300" size={16} />
                <span className="font-bold">{user?.xp} XP</span>
              </Badge>
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-md">
                <Trophy className="text-yellow-300" size={16} />
                <span className="font-bold">{user?.completedChallenges} Challenges</span>
              </Badge>
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-md">
                <TrendingUp className="text-green-300" size={16} />
                <span className="font-bold">Top 10%</span>
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick Actions */}
      <div className="p-6 lg:p-8">
        <Container>
          <h2 className="font-serif text-2xl text-ink font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <Card key={path} className="group hover:-translate-y-1" as={Link} to={path}>
                <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-lg text-ink">{label}</h3>
                <ChevronRight className="text-gray-400 group-hover:text-brand transition-colors mt-2" size={20} />
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* Explore Concepts */}
      <div className="p-6 lg:p-8 pt-0">
        <Container>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-2xl text-ink font-bold">Explore Concepts</h2>
            <Button as={Link} to="/app/study" variant="ghost" size="sm">
              View all <ChevronRight size={16} />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {CONCEPTS.map((concept, idx) => (
              <Card key={idx} className="min-w-[280px] group hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-ink">{concept.title}</h3>
                  <Sparkles className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{Math.floor(concept.progress * 0.8)} lessons</span>
                </div>
                <ProgressBar value={concept.progress} className="mb-2" />
                <div className="text-sm font-bold text-brand">{concept.progress}% complete</div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* Opportunities Feed */}
      <div className="p-6 lg:p-8 pt-0">
        <Container>
          <h2 className="font-serif text-2xl text-ink font-bold mb-4">Opportunities</h2>
          <div className="space-y-4">
            {OPPORTUNITIES.map((opp, idx) => {
              const Icon = opp.icon === 'Calendar' ? Calendar : opp.icon === 'Briefcase' ? Briefcase : Zap;
              const colors = [
                'bg-blue-500',
                'bg-green-500',
                'bg-purple-500'
              ];
              return (
                <Card key={idx} className="group hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${colors[idx]} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <Badge variant="secondary" size="sm" className="mb-1">
                          {opp.type}
                        </Badge>
                        <h3 className="font-bold text-lg text-ink group-hover:text-brand transition-colors">{opp.title}</h3>
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Clock size={14} />
                          {opp.date}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-brand transition-colors group-hover:translate-x-1" size={24} />
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;