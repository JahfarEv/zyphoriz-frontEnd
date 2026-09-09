import React from 'react';

export const Select = ({
  label,
  options = [],
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
        <label htmlFor={id} className="font-label-md text-sm text-on-surface font-semibold">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-outline pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          id={id}
          className={`w-full bg-surface-container-lowest border ${
            error ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary/20'
          } rounded-xl py-3 ${Icon ? 'pl-11' : 'px-4'} pr-8 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 transition-all appearance-none ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 pointer-events-none text-outline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="font-sans text-xs text-error mt-0.5">{error}</span>}
    </div>
  );
};
