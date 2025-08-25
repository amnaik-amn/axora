import React from 'react';

/**
 * Progress bar component with customizable styling
 * 
 * @param {number} value - Current progress value (default: 0)
 * @param {number} max - Maximum progress value (default: 100)
 * @param {string} className - Additional CSS classes
 * @param {boolean} showValue - Whether to show percentage value (default: true)
 * @param {string} color - Progress bar color class (default: 'bg-brand')
 * @param {string} height - Progress bar height class (default: 'h-3')
 * @param {Object} props - Additional props passed to component
 */
const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className = '', 
  showValue = true,
  color = 'bg-brand',
  height = 'h-3',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`w-full ${className}`} {...props}>
      <div className={`w-full bg-gray-100 rounded-full ${height}`}>
        <div 
          className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="text-sm font-medium text-brand mt-1">
          {Math.round(percentage)}% complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar;