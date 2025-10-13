import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

const AppShell = () => {

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