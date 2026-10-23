// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboard, LogIn, PlusCircle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// export const Navbar = () => {
//   const location = useLocation();
//   const { user } = useAuth();

//   const isActive = (path) => {
//     if (path === '/' && location.pathname === '/') return true;
//     if (path !== '/' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm border-b border-outline-variant/30">
//       <div className="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-16">
//         {/* Brand */}
//         <Link to="/" className="font-headline text-xl md:text-2xl font-extrabold text-primary tracking-tight">
//           ZYPHORIZ
//         </Link>

//         {/* Nav Links — desktop only */}
//         <nav className="hidden md:flex gap-7 items-center">
//           <Link
//             to="/"
//             className={`font-sans text-sm font-semibold transition-all py-1 ${
//               isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
//             }`}
//           >
//             Browse
//           </Link>
//           <Link
//             to="/?category=food"
//             className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
//           >
//             Categories
//           </Link>
//         </nav>

//         {/* CTA */}
//         <div className="flex items-center gap-2">
//           {user && (
//             <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-primary font-sans font-bold px-3 py-2 rounded-xl hover:bg-primary/10 text-sm">
//               <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
//             </Link>
//           )}
//           <Link to={user ? '/create' : '/auth?redirect=/create'} className="inline-flex items-center gap-1.5 bg-primary text-on-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-sm shadow-sm">
//             {user ? <PlusCircle className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
//             <span className="hidden sm:inline">{user ? 'List Your Business' : 'Log in to List'}</span>
//             <span className="sm:hidden">{user ? 'List' : 'Login'}</span>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };


import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LayoutDashboard, LogIn, Plus, PlusCircle, UserRound, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setProfileMenuOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('touchstart', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('touchstart', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] sticky top-0 z-50 w-full shadow-lg border-b border-white/15">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-16">
        {/* Brand — stays on ink (primary): the structural/identity color */}
        <Link to="/" aria-label="Zyphoriz home" className="inline-flex items-center flex-shrink-0">
          <img
            src="/image/zypho.png"
            alt="Zyphoriz"
            className="h-10 md:h-16 w-auto max-w-[180px] object-contain"
          />
        </Link>

        {/* Nav Links — desktop only. Active state now uses marigold (secondary) as the accent */}
        {/* <nav className="hidden md:flex gap-7 items-center">
          <Link
            to="/"
            className={`font-sans text-sm font-semibold transition-all py-1 ${
              isActive('/') ? 'text-[#FBF6EC] border-b-2 border-[#E8A23D]' : 'text-[#FBF6EC]/70 hover:text-[#E8A23D]'
            }`}
          >
            Browse
          </Link>
          <Link
            to="/?category=food"
            className="font-sans text-sm font-semibold text-[#FBF6EC]/70 hover:text-[#E8A23D] transition-colors"
          >
            Categories
          </Link>
        </nav> */}

        {/* CTA — marigold (secondary), matching the Home page action color */}
        <div className="flex items-center gap-2">
          {user && (
            <Link to="/dashboard" className={`${isDashboard ? 'hidden sm:inline-flex' : 'inline-flex'} items-center gap-1.5 text-[#FBF6EC] font-sans font-bold px-3 py-2 rounded-xl hover:bg-white/10 text-sm`}>
              <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          <Link to={user ? '/create' : '/auth?redirect=/create'} className={`${isDashboard ? 'hidden sm:inline-flex' : 'inline-flex'} items-center gap-1.5 bg-[linear-gradient(135deg,#16292c_0%,#2f756d_98%,#b94630_100%)] text-on-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-sm shadow-sm`}>
            {user ? <PlusCircle className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span className="hidden sm:inline">{user ? 'Create Your Page' : 'Log in to Page'}</span>
            <span className="sm:hidden">{user ? 'Create' : 'Login'}</span>
          </Link>
          {user && isDashboard && (
            <div className="relative sm:hidden" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-label="Open account menu"
                aria-expanded={profileMenuOpen}
                aria-controls="dashboard-profile-menu"
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-xl border border-white/20 bg-white/[0.06] px-2 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#5eead4]"
              >
                <UserRound className="h-5 w-5" />
                <ChevronDown className={`h-4 w-4 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileMenuOpen && (
                <div
                  id="dashboard-profile-menu"
                  className="absolute right-0 top-full z-[60] mt-2 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/15 bg-[#1d373a] shadow-2xl"
                >
                  <div className="border-b border-white/10 p-4">
                    <p className="truncate font-sans text-sm font-bold text-white">
                      {user.name || 'Account'}
                    </p>
                    <p className="mt-2 truncate text-xs text-white/65">
                      {user.mobile || 'Mobile not available'}
                    </p>
                    <p className="mt-2 text-xs capitalize text-white/65">
                      Account type: {user.role || 'User'}
                    </p>
                  </div>
                  <div className="space-y-1 p-2">
                    <Link
                      to="/create"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4 text-[#5eead4]" />
                      Create new page
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};