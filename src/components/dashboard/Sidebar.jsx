import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, Users, Star, BarChart3, Settings, ExternalLink, ArrowLeft } from 'lucide-react';

export const Sidebar = ({ className = '' }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Business Profile', path: '/business/celltech-mobiles', icon: Store, external: true },
    { label: 'Leads & Inquiries', path: '/dashboard?tab=leads', icon: Users },
    { label: 'Reviews', path: '/dashboard?tab=reviews', icon: Star },
    { label: 'Analytics', path: '/dashboard?tab=analytics', icon: BarChart3 },
    { label: 'Settings', path: '/dashboard?tab=settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 flex-shrink-0 bg-surface-container-lowest border-r border-outline-variant/30 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between ${className}`}>
      <div className="space-y-6">
        <div className="px-3 py-2">
          <span className="text-xs font-semibold text-outline uppercase tracking-wider">Business Admin</span>
          <h2 className="font-headline text-lg font-bold text-on-surface truncate mt-1">CellTech Mobiles</h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full mt-1">
            Verified Partner
          </span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            if (item.external) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-outline" />
                    <span>{item.label}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-outline" />
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans font-semibold transition-colors ${
                  active
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-on-primary' : 'text-outline'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-outline-variant/30 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-outline hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Site
        </Link>
      </div>
    </aside>
  );
};
