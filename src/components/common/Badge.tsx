import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ocean' | 'teal' | 'mango' | 'kokum' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'ocean',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    ocean: 'bg-ocean-100 text-ocean-900 border-ocean-200',
    teal: 'bg-teal-50 text-teal-800 border-teal-200',
    mango: 'bg-mango-100 text-mango-700 border-mango-200 font-semibold',
    kokum: 'bg-kokum-50 text-kokum-800 border-kokum-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-transparent text-slate-700 border-sand-300'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-sm px-3 py-1 rounded-full'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border font-medium ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
