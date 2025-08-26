import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import MobileNavigation from './MobileNavigation';
import { NAV_ITEMS } from '../constants/navigation';

const AppShell = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white">{/* Removed headers - each page now has its own */}


      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <MobileNavigation />
    </div>
  );
};

export default AppShell;