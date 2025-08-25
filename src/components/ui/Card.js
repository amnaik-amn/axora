import React from 'react';

/**
 * Card component with customizable styling and hover effects
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effects (default: true)
 * @param {string} padding - Padding class (default: 'p-6')
 * @param {string} shadow - Shadow class (default: 'shadow-lg')
 * @param {Object} props - Additional props passed to component
 */
const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  shadow = 'shadow-lg',
  ...props 
}) => {
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div 
      className={`bg-white rounded-2xl ${shadow} ${padding} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header component
 * @param {React.ReactNode} children - Header content
 * @param {string} className - Additional CSS classes
 */
const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

/**
 * Card Content component
 * @param {React.ReactNode} children - Content
 * @param {string} className - Additional CSS classes
 */
const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

/**
 * Card Footer component
 * @param {React.ReactNode} children - Footer content
 * @param {string} className - Additional CSS classes
 */
const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;