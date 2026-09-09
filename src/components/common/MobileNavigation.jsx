import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, PlusCircle } from 'lucide-react';

export const MobileNavigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/#categories', icon: Grid3X3 },
    { label: 'List Business', path: '/create', icon: PlusCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-surface border-t border-outline-variant/30 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        const isListBtn = item.path === '/create';
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 ${
              isListBtn
                ? 'bg-primary text-on-primary px-4 shadow-md'
                : active
                ? 'bg-primary-container text-on-primary font-semibold px-3'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 font-sans font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
