import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

const NavigationModal = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});
  
  if (!isOpen) return null;

  const menuItems = [
    { label: 'HOME', path: '/app' },
    { 
      label: 'EDUCATION', 
      path: '/app/study',
      subItems: [
        { label: 'STUDY', path: '/app/study' },
        { label: 'CONCEPTS', path: '/app/concepts' },
        { label: 'CHALLENGES', path: '/app/challenges' },
        { label: 'COMMUNITY', path: '/app/community' },
        { label: 'PIN UP', path: '/app/pinup' }
      ]
    },
    { 
      label: 'NETWORK', 
      path: '/app/network',
      subItems: [
        { label: 'JOB SEARCH', path: 'https://www.linkedin.com/jobs/?mcid=7366195609269186561&src=go-pa&trk=sem-ga_campid.22947263275_asid._crid._kw._d.c_tid._n.x_mt._geo.9031951&cid=&gclsrc=aw.ds&gad_source=1&gad_campaignid=22943532677&gbraid=0AAAAADK8eFhM-x5U4Xcl2fSEx3ZjUbnF_&gclid=CjwKCAjw89jGBhB0EiwA2o1On56gcn9Ewe6DOie97V4w54gxVYrKCCvEh40qBnABLwwC08l8UAG5pBoCVTUQAvD_BwE', isExternal: true },
        { label: 'STAY CONNECTED', path: 'https://www.eventbrite.com/d/bahrain/events/', isExternal: true }
      ]
    },
    { label: 'MESSAGES', path: '/app/messages' },
    { label: 'SUPPORT', path: '/app/support' },
    { label: 'PROFILE', path: '/app/profile' },
    { label: 'LOG OUT', path: '/login', isLogout: true }
  ];

  const toggleExpanded = (itemLabel) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userSession');
    localStorage.removeItem('onboardingComplete');
    onClose();
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex animate-in fade-in duration-[4000ms] ease-in-out">
      {/* Left side menu */}
      <div className="bg-white w-64 h-full transform transition-transform duration-[6000ms] ease-in-out animate-in slide-in-from-left">
        {/* Header */}
        <div className="bg-[#AC5757] text-white p-6 flex justify-between items-center">
          <span className="font-oswald font-medium text-[45px]">AXORA</span>
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
                ) : item.subItems ? (
                  <div
                    onMouseEnter={() => setExpandedItems(prev => ({ ...prev, [item.label]: true }))}
                    onMouseLeave={() => setExpandedItems(prev => ({ ...prev, [item.label]: false }))}
                  >
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="flex items-center justify-between w-full px-4 py-3 font-semibold text-gray-900 hover:bg-[#AC5757]/10 hover:text-[#AC5757] rounded-lg transition-colors text-xl"
                    >
                      {item.label}
                      {expandedItems[item.label] ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </button>
                    {expandedItems[item.label] && (
                      <div className="ml-4 mt-2 space-y-1 transition-all duration-500 ease-in-out">
                        {item.subItems.map((subItem, subIdx) => (
                          subItem.isExternal ? (
                            <a
                              key={subIdx}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="block px-4 py-2 font-medium text-gray-700 hover:bg-[#AC5757]/5 hover:text-[#AC5757] rounded-lg transition-colors text-lg"
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <Link
                              key={subIdx}
                              to={subItem.path}
                              onClick={onClose}
                              className="block px-4 py-2 font-medium text-gray-700 hover:bg-[#AC5757]/5 hover:text-[#AC5757] rounded-lg transition-colors text-lg"
                            >
                              {subItem.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
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