import React from 'react';

export const DashboardCard = ({ title, value, change, changeType = 'positive', icon: Icon, description }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <span className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div>
        <div className="font-headline text-2xl font-extrabold text-on-surface mb-1">
          {value}
        </div>
        {change && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`font-semibold ${
                changeType === 'positive' ? 'text-success' : 'text-error'
              }`}
            >
              {change}
            </span>
            <span className="text-outline">{description || 'vs last month'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
