import React from 'react';
import Container from './Container';

/**
 * Section component for page sections with consistent spacing and containers
 * 
 * @param {React.ReactNode} children - Section content
 * @param {string} background - Background color class (default: 'bg-white')
 * @param {string} padding - Padding class (default: 'py-20')
 * @param {'sm' | 'default' | 'lg' | 'full'} containerSize - Container size for content
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props passed to component
 */
const Section = ({ 
  children, 
  background = 'bg-white', 
  padding = 'py-20', 
  containerSize = 'default',
  className = '',
  ...props 
}) => {
  return (
    <section className={`${background} ${padding} ${className}`} {...props}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

/**
 * Section Header component for section titles and subtitles
 * 
 * @param {string} title - Section title
 * @param {string} subtitle - Optional section subtitle
 * @param {boolean} centered - Whether to center the header text (default: true)
 * @param {string} className - Additional CSS classes
 */
const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true, 
  className = '' 
}) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
    <h2 className="font-judson text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

Section.Header = SectionHeader;

export default Section;