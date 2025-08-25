import { Brain, Trophy, Users, TrendingUp } from 'lucide-react';

export const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized study paths that adapt to your learning style and pace',
    color: 'bg-purple-500'
  },
  {
    icon: Trophy,
    title: 'Real-World Challenges',
    description: 'Complete projects that matter and build a portfolio employers love',
    color: 'bg-green-500'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Connect with professors and peers in focused study groups',
    color: 'bg-blue-500'
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Visual insights into your learning journey with XP and achievements',
    color: 'bg-orange-500'
  }
];

export const STATS = [
  { value: '10,000+', label: 'Active Students' },
  { value: '500+', label: 'Challenges' },
  { value: '95%', label: 'Success Rate' },
  { value: '4.9', label: 'App Rating' }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    content: 'AXORA transformed how I learn. The AI recommendations are spot-on, and I love earning XP for real projects.',
    rating: 5
  },
  {
    name: 'Prof. Michael Davis',
    role: 'Data Science Professor',
    content: 'Finally, a platform that bridges the gap between academic learning and industry skills. My students are more engaged than ever.',
    rating: 5
  },
  {
    name: 'Alex Johnson',
    role: 'Engineering Student',
    content: 'The challenges helped me land my dream internship. Employers were impressed by my project portfolio.',
    rating: 5
  }
];

export const CONCEPTS = [
  { title: 'Machine Learning Basics', progress: 65, difficulty: 'Intermediate' },
  { title: 'Data Structures', progress: 80, difficulty: 'Advanced' },
  { title: 'Web Development', progress: 45, difficulty: 'Beginner' },
  { title: 'Cloud Computing', progress: 30, difficulty: 'Intermediate' },
];

export const OPPORTUNITIES = [
  { type: 'Event', title: 'AI Workshop', date: 'Tomorrow, 2PM', icon: 'Calendar' },
  { type: 'Job', title: 'Junior Developer - TechCo', date: 'Apply by Dec 15', icon: 'Briefcase' },
  { type: 'News', title: 'New Python Course Available', date: '2 hours ago', icon: 'Zap' },
];