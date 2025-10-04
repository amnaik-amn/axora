import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import LiveChat from './LiveChat';

const AppShell = () => {

  return (
    <div className="min-h-screen bg-white">{/* Removed headers - each page now has its own */}

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <MobileNavigation />

      {/* Live Chat - Available on all app pages */}
      <LiveChat />
    </div>
  );
};

export default AppShell;