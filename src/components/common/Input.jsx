import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  required,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="font-label-md text-sm text-on-surface font-semibold flex items-center justify-between">
          <span>{label} {required && <span className="text-error">*</span>}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-outline pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={id}
          className={`w-full bg-surface-container-lowest border ${
            error ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary/20'
          } rounded-xl py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <span className="font-sans text-xs text-error mt-0.5">{error}</span>}
    </div>
  );
};
