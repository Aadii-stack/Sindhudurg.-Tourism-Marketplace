import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export type ScrollAnimation = 'fade-up' | 'fade-down' | 'fade' | 'scale-up' | 'slide-right';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: ScrollAnimation;
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.12
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7 pointer-events-none';
      case 'fade-down':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-7 pointer-events-none';
      case 'scale-up':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-7 pointer-events-none';
      case 'fade':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
