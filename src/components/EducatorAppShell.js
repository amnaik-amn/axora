import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';

const EducatorAppShell = () => {
  // const location = useLocation(); // Unused variable
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Unused variables

  // const isActive = (path) => { // Unused function
  //   return location.pathname === path;
  // };

  return (
    <div className="min-h-screen bg-white">{/* Removed headers - each page now has its own */}


      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EducatorAppShell;
