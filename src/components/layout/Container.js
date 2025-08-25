import React from 'react';

/**
 * Container component for consistent content width and padding
 * 
 * @param {React.ReactNode} children - Container content
 * @param {'sm' | 'default' | 'lg' | 'full'} size - Container max width size
 * @param {string} className - Additional CSS classes
 * @param {string} padding - Padding classes (default: responsive padding)
 * @param {Object} props - Additional props passed to component
 */
const Container = ({ 
  children, 
  size = 'default', 
  className = '', 
  padding = 'px-4 sm:px-6 lg:px-8',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };
  
  return (
    <div 
      className={`${sizes[size]} mx-auto ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;