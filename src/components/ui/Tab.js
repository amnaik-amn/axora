import React, { createContext, useContext } from 'react';

/**
 * Tab context for managing tab state
 */
const TabContext = createContext();

/**
 * Tab Group component for managing multiple tabs
 * 
 * @param {React.ReactNode} children - Tab components
 * @param {string} activeTab - Currently active tab value
 * @param {Function} onChange - Function to handle tab changes
 * @param {string} className - Additional CSS classes
 */
const TabGroup = ({ children, activeTab, onChange, className = '' }) => {
  return (
    <TabContext.Provider value={{ activeTab, onChange }}>
      <div className={className}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

/**
 * Tab List component for rendering tab buttons
 * 
 * @param {React.ReactNode} children - Tab components
 * @param {string} className - Additional CSS classes
 */
const TabList = ({ children, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <div className="flex gap-2">
        {children}
      </div>
    </div>
  );
};

/**
 * Individual Tab component
 * 
 * @param {React.ReactNode} children - Tab label content
 * @param {string} value - Tab identifier value
 * @param {string} className - Additional CSS classes
 */
const Tab = ({ children, value, className = '' }) => {
  const { activeTab, onChange } = useContext(TabContext);
  
  return (
    <button
      onClick={() => onChange(value)}
      className={`px-4 py-2 font-medium transition-colors ${
        activeTab === value
          ? 'text-brand border-b-2 border-brand'
          : 'text-gray-600 hover:text-gray-900'
      } ${className}`}
    >
      {children}
    </button>
  );
};

/**
 * Tab Content component for tab panels
 * 
 * @param {React.ReactNode} children - Panel content
 * @param {string} value - Tab identifier value
 * @param {string} className - Additional CSS classes
 */
const TabContent = ({ children, value, className = '' }) => {
  const { activeTab } = useContext(TabContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Attach sub-components to main Tab object
Tab.Group = TabGroup;
Tab.List = TabList;
Tab.Content = TabContent;

export default Tab;