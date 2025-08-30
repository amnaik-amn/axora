import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MessageCircle, Bell, Home } from 'lucide-react';
import { checkAuth } from '../auth/config';

const PageHeader = ({ 
  title, 
  onMenuClick, 
  showSearch = false, 
  searchComponent = null,
  showHomeIcon = false,
  hideMessageIcon = false,
  hideNotificationIcon = false 
}) => {
  const user = checkAuth();

  return (
    <header className="bg-[#AC5757] sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 h-24">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-white" />
          </button>
          
          {showHomeIcon && (
            <Link 
              to="/app"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Home size={24} className="text-white" />
            </Link>
          )}
        </div>
        
        <h1 className="font-oswald font-medium text-white text-[38px] absolute left-1/2 transform -translate-x-1/2">
          {title}
        </h1>
        
        <div className="flex items-center gap-3">
          {/* Message Icon */}
          {!hideMessageIcon && (
            <Link 
              to="/app/messages" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MessageCircle size={24} className="text-white" />
            </Link>
          )}
          
          {/* Notification Icon */}
          {!hideNotificationIcon && (
            <Link 
              to="/app/notifications" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Bell size={24} className="text-white" />
            </Link>
          )}
          
          {/* Profile */}
          <Link 
            to="/app/profile" 
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="text-white font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
      </div>
      
      {/* Search Bar Section */}
      {showSearch && searchComponent && (
        <div className="px-6 pb-4">
          {searchComponent}
        </div>
      )}
    </header>
  );
};

export default PageHeader;