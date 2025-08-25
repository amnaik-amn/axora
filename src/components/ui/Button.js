import React from 'react';

/**
 * Button component with multiple variants and sizes
 * 
 * @param {React.ReactNode} children - Button content
 * @param {React.ElementType} as - Component to render as (default: 'button')
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} size - Button size
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether button is disabled
 * @param {Function} onClick - Click handler
 * @param {'button' | 'submit' | 'reset'} type - Button type (for button elements only)
 * @param {Object} props - Additional props passed to component
 */
const Button = ({ 
  children, 
  as: Component = 'button',
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium transition-all duration-200 rounded-full inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand/90 hover:shadow-lg hover:scale-105 disabled:bg-gray-300',
    secondary: 'bg-white border-2 border-gray-200 text-gray-700 hover:border-brand hover:text-brand disabled:bg-gray-100',
    outline: 'border border-brand text-brand hover:bg-brand hover:text-white disabled:border-gray-300 disabled:text-gray-300',
    ghost: 'text-brand hover:bg-brand/10 disabled:text-gray-300'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const combinedProps = {
    className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`,
    disabled,
    onClick,
    ...props
  };

  // Only add type prop for actual button elements
  if (Component === 'button') {
    combinedProps.type = type;
  }
  
  return (
    <Component {...combinedProps}>
      {children}
    </Component>
  );
};

export default Button;