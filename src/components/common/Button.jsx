import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-label-md font-semibold transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20';

  const variants = {
    primary: 'bg-primary-container text-on-primary hover:bg-primary hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)]',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary-teal hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.08)]',
    outline: 'border border-outline-variant text-on-surface hover:bg-surface-container hover:border-primary/50',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
    danger: 'bg-error text-on-error hover:bg-error/90',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />}
      {children}
    </button>
  );
};
