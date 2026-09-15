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


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogIn, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-[linear-gradient(135deg,#16292c_0%,#2f756d_58%,#b94630_100%)] sticky top-0 z-50 w-full shadow-lg border-b border-white/15">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-16">
        {/* Brand — stays on ink (primary): the structural/identity color */}
        <Link to="/" className="font-headline text-xl md:text-2xl font-extrabold text-[#FBF6EC] tracking-tight">
          ZYPHORIZ
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
            <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-[#FBF6EC] font-sans font-bold px-3 py-2 rounded-xl hover:bg-white/10 text-sm ">
              <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          <Link to={user ? '/create' : '/auth?redirect=/create'} className="inline-flex items-center gap-1.5 bg-[linear-gradient(135deg,#16292c_0%,#2f756d_98%,#b94630_100%)] text-on-primary font-sans font-bold px-4 py-2 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all text-sm shadow-sm">
            {user ? <PlusCircle className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span className="hidden sm:inline">{user ? 'List Your Business' : 'Log in to List'}</span>
            <span className="sm:hidden">{user ? 'List' : 'Login'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};