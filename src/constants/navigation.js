import { Home, BookOpen, Trophy, Users, User } from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/app', icon: Home, label: 'Home' },
  { path: '/app/study', icon: BookOpen, label: 'Study' },
  { path: '/app/challenges', icon: Trophy, label: 'Challenges' },
  { path: '/app/community', icon: Users, label: 'Community' },
  { path: '/app/profile', icon: User, label: 'Profile' },
];

export const FOOTER_LINKS = {
  learn: [
    { label: 'Study Hub', path: '/app/study' },
    { label: 'Challenges', path: '/app/challenges' },
    { label: 'Community', path: '/app/community' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ]
};