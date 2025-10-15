import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  GraduationCap, 
  BarChart3, 
  MessageSquare, 
  HelpCircle, 
  User, 
  LogOut 
} from 'lucide-react';

const NavigationCarousel = ({ menuItems, onItemClick, isCollapsed = false }) => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Function to get appropriate icon for each menu item
  const getIconForItem = (label) => {
    switch (label.toUpperCase()) {
      case 'HOME':
        return Home;
      case 'COURSES':
        return BookOpen;
      case 'STUDENTS':
        return Users;
      case 'FACULTY':
        return GraduationCap;
      case 'ANALYTICS':
        return BarChart3;
      case 'MESSAGES':
        return MessageSquare;
      case 'SUPPORT':
        return HelpCircle;
      case 'PROFILE':
        return User;
      case 'LOG OUT':
        return LogOut;
      default:
        return Home;
    }
  };

  // Auto-play functionality - scroll vertically
  useEffect(() => {
    let rafId, last = 0;
    
    const step = (t) => {
      if (!last) last = t;
      const dt = Math.min(32, t - last); // clamp
      last = t;
      
      if (trackRef.current && isPlaying && !isExpanded) {
        trackRef.current.scrollTop += 0.05 * dt; // speed (px/ms) - slower for vertical
        
        // loop when reaching the end
        if (trackRef.current.scrollTop + trackRef.current.clientHeight >= trackRef.current.scrollHeight - 2) {
          trackRef.current.scrollTop = 0;
        }
      }
      
      rafId = requestAnimationFrame(step);
    };

    if (isPlaying) {
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPlaying, isExpanded]);

  // Cursor-following glow effect
  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = carousel?.querySelectorAll('.nav-card');
    
    if (!carousel || !cards) return;

    const handleMouseMove = (e) => {
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    };

    const handleMouseEnter = () => {
      setIsPlaying(false);
      setIsExpanded(true);
      cards.forEach(card => {
        const borderElement = card.querySelector('.nav-card__border');
        if (borderElement) {
          borderElement.style.opacity = '1';
        }
      });
    };

    const handleMouseLeave = () => {
      setIsPlaying(true);
      setIsExpanded(false);
      cards.forEach(card => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
        const borderElement = card.querySelector('.nav-card__border');
        if (borderElement) {
          borderElement.style.opacity = '0';
        }
      });
    };

    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      carousel.removeEventListener('mousemove', handleMouseMove);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);



  // Drag to scroll - vertical
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startY = 0;
    let startTop = 0;

    const handlePointerDown = (e) => {
      isDown = true;
      startY = e.clientY;
      startTop = track.scrollTop;
      track.setPointerCapture(e.pointerId);
      setIsPlaying(false);
    };

    const handlePointerMove = (e) => {
      if (!isDown) return;
      track.scrollTop = startTop - (e.clientY - startY);
    };

    const handlePointerUp = () => {
      isDown = false;
      setIsPlaying(true);
    };

    const handlePointerCancel = () => {
      isDown = false;
      setIsPlaying(true);
    };

    track.addEventListener('pointerdown', handlePointerDown);
    track.addEventListener('pointermove', handlePointerMove);
    track.addEventListener('pointerup', handlePointerUp);
    track.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      track.removeEventListener('pointerdown', handlePointerDown);
      track.removeEventListener('pointermove', handlePointerMove);
      track.removeEventListener('pointerup', handlePointerUp);
      track.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, []);

  return (
    <div className={`navigation-sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isCollapsed ? 'text-collapsed' : ''}`}>
      <style jsx>{`
        .navigation-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          background: #AC5757;
          border-radius: 0 18px 18px 0;
          padding: 16px 8px;
          box-shadow: none;
          overflow: hidden;
          transition: width 0.3s ease, transform 0.3s ease;
          height: 100vh;
          z-index: 50;
        }

        .navigation-sidebar.collapsed {
          width: 14vw;
          transform: translateX(0);
        }

        .navigation-sidebar.expanded {
          width: 14vw;
          transform: translateX(0);
        }

        .navigation-sidebar.text-collapsed {
          width: 80px;
          transform: translateX(0);
        }

        .nav-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: stretch;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          padding: 2px;
          height: 100%;
          padding-top: 20vh;
        }

        .nav-track::-webkit-scrollbar {
          display: none;
        }

        .nav-card {
          position: relative;
          flex: 0 0 auto;
          height: 64px;
          border-radius: 16px;
          background: transparent;
          scroll-snap-align: start;
          overflow: hidden;
          cursor: pointer;
          box-shadow: none;
          transform: translateZ(0);
          transition: transform 0.2s ease, height 0.3s ease;
        }

        .navigation-sidebar.expanded .nav-card {
          height: 72px;
        }

        .nav-card:hover {
          transform: translateX(4px);
        }

        .nav-card__inner {
          position: relative;
          z-index: 2;
          height: calc(100% - 2px);
          width: calc(100% - 2px);
          margin: 1px;
          border-radius: 14px;
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.15)),
                      #AC5757;
          gap: 12px;
        }

        /* Desktop: Show icon + text */
        @media (min-width: 768px) {
          .nav-card__inner {
            justify-content: flex-start;
          }
        }

        /* Mobile: Center icon only */
        @media (max-width: 767px) {
          .nav-card__inner {
            justify-content: center;
            gap: 0;
          }
        }

        .nav-card__border {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity .25s ease;
          background: radial-gradient(150px circle at var(--mx, 50%) var(--my, 50%),
            rgba(172, 87, 87, .8) 0%,
            rgba(172, 87, 87, .35) 24%,
            rgba(172, 87, 87, 0) 42%);
        }

        .nav-card__icon {
          color: #e8e9ee;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .navigation-sidebar.expanded .nav-card__icon {
          width: 28px;
          height: 28px;
        }

        .nav-card__text {
          color: #e8e9ee;
          font-size: 12px;
          font-weight: 600;
          text-align: left;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          transition: opacity 0.3s ease;
        }

        .navigation-sidebar.expanded .nav-card__text {
          font-size: 14px;
        }

        .navigation-sidebar.text-collapsed .nav-card__text {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }

        /* Mobile: Hide text labels */
        @media (max-width: 767px) {
          .nav-card__text {
            display: none;
          }
        }

        /* Desktop: Show text labels */
        @media (min-width: 768px) {
          .nav-card__text {
            display: block;
          }
        }


      `}</style>
      

      <div 
        ref={carouselRef}
        style={{
          '--mx': '0px',
          '--my': '0px',
          height: '100%'
        }}
      >
        <div ref={trackRef} className="nav-track">
          {menuItems.map((item, index) => {
            const IconComponent = getIconForItem(item.label);
            return (
              <div
                key={index}
                className="nav-card"
                onClick={() => onItemClick(item)}
                style={{
                  '--mx': '0px',
                  '--my': '0px'
                }}
              >
                <div className="nav-card__inner">
                  <IconComponent className="nav-card__icon" />
                  <div className="nav-card__text">{item.label}</div>
                </div>
                <div className="nav-card__border"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationCarousel;
