import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import EducatorMobileNavigation from './EducatorMobileNavigation';

const EducatorAppShell = () => {
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
      <EducatorMobileNavigation />
    </div>
  );
};

export default EducatorAppShell;
