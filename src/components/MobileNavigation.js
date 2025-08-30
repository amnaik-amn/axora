import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, User, MessageCircle } from 'lucide-react';

const MobileNavigation = () => {
  const navItems = [
    { path: '/app', icon: Home, label: 'Home' },
    { path: '/app/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/app/notifications', icon: Bell, label: 'Alerts' },
    { path: '/app/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#AC5757] z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex flex-col items-center p-2 transition-colors
              ${isActive ? 'text-white' : 'text-white/70'}
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