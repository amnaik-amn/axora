import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import EducatorMobileNavigation from './EducatorMobileNavigation';

const EducatorAppShell = () => {
  // const location = useLocation(); // Unused variable
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Unused variables

  // const isActive = (path) => { // Unused function
  //   return location.pathname === path;
  // };

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
