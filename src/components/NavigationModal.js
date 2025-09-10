import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const NavigationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: 'HOME', path: '/app' },
    { label: 'STUDY', path: '/app/study' },
    { label: 'CONCEPTS', path: '/app/concepts' },
    { label: 'CHALLENGES', path: '/app/challenges' },
    { label: 'COMMUNITY', path: '/app/community' },
    { label: 'MESSAGES', path: '/app/messages' },
    { label: 'SUPPORT', path: '/app/support' },
    { label: 'PROFILE', path: '/app/profile' },
    { label: 'LOG OUT', path: '/login', isLogout: true }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userSession');
    localStorage.removeItem('onboardingComplete');
    onClose();
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Left side menu */}
      <div className="bg-white w-64 h-full">
        {/* Header */}
        <div className="bg-[#AC5757] text-white p-6 flex justify-between items-center">
          <span className="font-oswald font-medium text-[35px]">AXORA</span>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors text-xl"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="block px-4 py-3 font-semibold text-gray-900 hover:bg-[#AC5757]/10 hover:text-[#AC5757] rounded-lg transition-colors text-xl"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

      </div>

      {/* Right side overlay - close on click */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};

export default NavigationModal;