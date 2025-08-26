import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Grid3X3, Bell, User } from 'lucide-react';

const MobileNavigation = () => {
  const navItems = [
    { path: '/app', icon: Home, label: 'Home' },
    { path: '/app/study', icon: BookOpen, label: 'Study' },
    { path: '/app/challenges', icon: Grid3X3, label: 'Challenges' },
    { path: '/app/notifications', icon: Bell, label: 'Alerts' },
    { path: '/app/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex flex-col items-center p-2 transition-colors
              ${isActive ? 'text-[#E85A5A]' : 'text-gray-500'}
            `}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;