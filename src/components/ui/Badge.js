import React from 'react';

/**
 * Badge component for status indicators and labels
 * 
 * @param {React.ReactNode} children - Badge content
 * @param {'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'ai' | 'special'} variant - Badge style variant
 * @param {'xs' | 'sm' | 'md' | 'lg'} size - Badge size
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props passed to component
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center gap-1 rounded-full font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-brand/10 text-brand',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    ai: 'bg-purple-100 text-purple-700',
    special: 'bg-purple-100 text-purple-700',
    secondary: 'bg-white/20 text-white'
  };
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;