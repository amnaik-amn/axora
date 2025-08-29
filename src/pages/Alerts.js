import React, { useState } from 'react';
import { Menu, Bell, Clock, CheckCircle, AlertTriangle, Info, X, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Alerts = () => {
  const user = checkAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'all', label: 'ALL' },
    { id: 'urgent', label: 'URGENT' },
    { id: 'academic', label: 'ACADEMIC' },
  ];

  const alerts = {
    all: [
      {
        id: 1,
        type: 'urgent',
        title: 'Assignment Due Tomorrow',
        message: 'Your Architecture Design Portfolio is due tomorrow at 11:59 PM',
        time: '2 hours ago',
        read: false,
        category: 'Academic',
        icon: 'alert',
        isCommunity: false
      },
      {
        id: 2,
        type: 'community',
        title: 'Sarah Chen liked your post',
        message: '"Great insights on sustainable design!"',
        time: '30 minutes ago',
        read: false,
        category: 'Community',
        icon: 'like',
        isCommunity: true
      },
      {
        id: 3,
        type: 'success',
        title: 'Quiz Score Available',
        message: 'Your Structural Engineering quiz score: 94/100',
        time: '4 hours ago',
        read: false,
        category: 'Academic',
        icon: 'success',
        isCommunity: false
      },
      {
        id: 4,
        type: 'community',
        title: 'Mike Rodriguez commented',
        message: '"I agree with your approach to green tech"',
        time: '1 hour ago',
        read: false,
        category: 'Community',
        icon: 'comment',
        isCommunity: true
      },
      {
        id: 5,
        type: 'community',
        title: 'Emily Johnson started following you',
        message: '',
        time: '3 hours ago',
        read: false,
        category: 'Community',
        icon: 'follow',
        isCommunity: true
      },
      {
        id: 6,
        type: 'info',
        title: 'New Course Available',
        message: 'Advanced BIM Modeling course is now available in your dashboard',
        time: '1 day ago',
        read: true,
        category: 'Course',
        icon: 'info',
        isCommunity: false
      },
      {
        id: 7,
        type: 'urgent',
        title: 'Challenge Deadline',
        message: 'Green Tech Park Design challenge ends in 3 days',
        time: '1 day ago',
        read: true,
        category: 'Challenge',
        icon: 'alert',
        isCommunity: false
      },
      {
        id: 8,
        type: 'community',
        title: 'David Park and 3 others liked your comment',
        message: '',
        time: '2 days ago',
        read: true,
        category: 'Community',
        icon: 'like',
        isCommunity: true
      }
    ],
    urgent: [
      {
        id: 1,
        type: 'urgent',
        title: 'Assignment Due Tomorrow',
        message: 'Your Architecture Design Portfolio is due tomorrow at 11:59 PM',
        time: '2 hours ago',
        read: false,
        category: 'Academic',
        icon: 'alert'
      },
      {
        id: 4,
        type: 'urgent',
        title: 'Challenge Deadline',
        message: 'Green Tech Park Design challenge ends in 3 days',
        time: '1 day ago',
        read: true,
        category: 'Challenge',
        icon: 'alert'
      }
    ],
    academic: [
      {
        id: 1,
        type: 'urgent',
        title: 'Assignment Due Tomorrow',
        message: 'Your Architecture Design Portfolio is due tomorrow at 11:59 PM',
        time: '2 hours ago',
        read: false,
        category: 'Academic',
        icon: 'alert'
      },
      {
        id: 2,
        type: 'success',
        title: 'Quiz Score Available',
        message: 'Your Structural Engineering quiz score: 94/100',
        time: '4 hours ago',
        read: false,
        category: 'Academic',
        icon: 'success'
      }
    ]
  };

  const getAlertIcon = (alert) => {
    if (alert.isCommunity) {
      switch (alert.icon) {
        case 'like':
          return <Heart size={12} className="text-pink-500" />;
        case 'comment':
          return <MessageCircle size={12} className="text-blue-500" />;
        case 'follow':
          return <UserPlus size={12} className="text-purple-500" />;
        default:
          return <Bell size={12} className="text-gray-500" />;
      }
    }
    
    switch (alert.type) {
      case 'urgent':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic':
        return 'bg-[#4CAF50] text-white';
      case 'Challenge':
        return 'bg-[#2196F3] text-white';
      case 'Course':
        return 'bg-[#FF9800] text-white';
      case 'Community':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          
          <h1 className="font-oswald font-medium text-white text-[38px]">ALERTS</h1>
          
          <Link to="/app/profile" className="w-10 h-10 bg-[#AC5757]/10 rounded-full flex items-center justify-center hover:bg-[#AC5757]/20 transition-colors">
            <span className="text-[#AC5757] font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </Link>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center bg-[#AC5757]">
          <div className="flex w-full max-w-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-[#AC5757] text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Sections */}
        <div className="space-y-8">
          {/* RECENT Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">RECENT</h2>
            <div className="space-y-2">
              {alerts[activeTab].filter(alert => !alert.read).map((alert) => (
                alert.isCommunity ? (
                  // Smaller community notifications (25% size)
                  <div key={alert.id} className="bg-white rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                        {getAlertIcon(alert)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-700">{alert.title}</span>
                        {alert.message && <span className="text-xs text-gray-500 ml-1">{alert.message}</span>}
                      </div>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                      <button className="p-0.5 hover:bg-gray-100 rounded">
                        <X size={10} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Regular full-size notifications
                  <div key={alert.id} className={`bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border ${getAlertBgColor(alert.type)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 flex-shrink-0 mt-0.5">
                          {getAlertIcon(alert)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{alert.title}</h3>
                          <p className="text-gray-600 text-xs mb-2 leading-relaxed">{alert.message}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(alert.category)}`}>
                            {alert.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">{alert.time}</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <X size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-xs ml-11">
                      <div>
                        <span className="text-gray-500 block">TYPE</span>
                        <span className="font-medium text-gray-900 capitalize">{alert.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">STATUS</span>
                        <span className="font-medium text-gray-900">Unread</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">PRIORITY</span>
                        <span className="font-medium text-gray-900">{alert.type === 'urgent' ? 'High' : 'Normal'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">TIME</span>
                        <span className="font-medium text-gray-900">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

          {/* EARLIER Section */}
          {alerts[activeTab].filter(alert => alert.read).length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">COMPLETE</h2>
              <div className="space-y-2">
                {alerts[activeTab].filter(alert => alert.read).map((alert) => (
                  alert.isCommunity ? (
                    // Smaller community notifications (25% size) - read state
                    <div key={alert.id} className="bg-white rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 opacity-60">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                          {getAlertIcon(alert)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-gray-600">{alert.title}</span>
                          {alert.message && <span className="text-xs text-gray-400 ml-1">{alert.message}</span>}
                        </div>
                        <span className="text-xs text-gray-300">{alert.time}</span>
                        <button className="p-0.5 hover:bg-gray-100 rounded">
                          <X size={10} className="text-gray-300" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Regular full-size notifications - read state
                    <div key={alert.id} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 opacity-75">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {getAlertIcon(alert)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-700 text-sm mb-1">{alert.title}</h3>
                            <p className="text-gray-500 text-xs mb-2 leading-relaxed">{alert.message}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(alert.category)} opacity-75`}>
                              {alert.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">{alert.time}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <X size={14} className="text-gray-300" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-xs ml-11">
                        <div>
                          <span className="text-gray-400 block">TYPE</span>
                          <span className="font-medium text-gray-600 capitalize">{alert.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">STATUS</span>
                          <span className="font-medium text-gray-600">Read</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">PRIORITY</span>
                          <span className="font-medium text-gray-600">{alert.type === 'urgent' ? 'High' : 'Normal'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">TIME</span>
                          <span className="font-medium text-gray-600">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {alerts[activeTab].length === 0 && (
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No alerts found</h3>
              <p className="text-gray-400">You're all caught up! New alerts will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Alerts;