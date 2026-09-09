import React from 'react';
import { CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

export const Badge = ({ variant = 'verified', children, className = '' }) => {
  const styles = {
    verified: 'bg-secondary/90 text-on-secondary backdrop-blur-sm',
    trending: 'bg-tertiary-amber text-white backdrop-blur-sm',
    success: 'bg-green-100 text-green-800 border border-green-200',
    info: 'bg-primary/10 text-primary border border-primary/20',
    neutral: 'bg-surface-container text-on-surface-variant border border-outline-variant/40',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]} ${className}`}>
      {variant === 'verified' && <ShieldCheck className="w-3.5 h-3.5 fill-current" />}
      {variant === 'trending' && <TrendingUp className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};
