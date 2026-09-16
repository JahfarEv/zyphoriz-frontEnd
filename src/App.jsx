import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileNavigation } from './components/common/MobileNavigation';
import { RegistrationProvider } from './context/RegistrationContext';

import { Home } from './pages/Home/Home';
import { CreateBusiness } from './pages/Create/CreateBusiness';
import { BusinessProfile } from './pages/BusinessProfile/BusinessProfile';
import { PaymentCheckout } from './pages/Payment/PaymentCheckout';
import { PaymentSuccess } from './pages/Payment/PaymentSuccess';
import { NotFound } from './pages/NotFound/NotFound';
import { SearchResults } from './pages/SearchResults/SearchResults';
import { Auth } from './pages/Auth/Auth';
import { UserDashboard } from './pages/UserDashboard/UserDashboard';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { Terms } from './pages/Terms/Terms';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrivacyPolicy } from './pages/Privacy/Privacy';

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Checking your session...</div>;
  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return children;
};

const AppLayout = () => {
  const location = useLocation();
  const isBusinessProfile = /^\/[^/]+$/.test(location.pathname)
    && !['/auth', '/create', '/dashboard', '/search'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(90deg,#16292c_30%,#2f756d_100%,#b94630_140%)] text-on-background selection:bg-primary-container selection:text-on-primary">
      {!isBusinessProfile && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<RequireAuth><CreateBusiness /></RequireAuth>} />
          <Route path="/payment/checkout" element={<RequireAuth><PaymentCheckout /></RequireAuth>} />
          <Route path="/payment/success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Individual business page at /{slug} */}
          <Route path="/:slug" element={<BusinessProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isBusinessProfile && <Footer />}
      {!isBusinessProfile && <MobileNavigation />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <Router>
          <AppLayout />
        </Router>
      </RegistrationProvider>
    </AuthProvider>
  );
}
