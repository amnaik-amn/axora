import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import Footer from './Footer';
import { NAV_ITEMS } from '../constants/navigation';

const AppShell = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Top Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={18} />
            </div>
            <span className="font-serif text-2xl font-bold text-brand">
              AXORA
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="bg-white w-72 h-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <span className="font-serif text-2xl font-bold text-ink">AXORA</span>
              </div>
            </div>
            <nav className="space-y-2">
              {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(path)
                      ? 'bg-brand text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-16 lg:pb-0">
        <Outlet />
      </main>

      {/* Footer - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden z-20 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive(path) 
                  ? 'text-brand scale-110' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={22} className={isActive(path) ? 'drop-shadow-lg' : ''} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;