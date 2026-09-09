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
import { BusinessDashboard } from './pages/BusinessDashboard/BusinessDashboard';
import { SearchResults } from './pages/SearchResults/SearchResults';
import { Auth } from './pages/Auth/Auth';
import { UserDashboard } from './pages/UserDashboard/UserDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return children;
};

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary-container selection:text-on-primary">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<RequireAuth><CreateBusiness /></RequireAuth>} />
          <Route path="/payment/checkout" element={<RequireAuth><PaymentCheckout /></RequireAuth>} />
          <Route path="/payment/success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
          <Route path="/search" element={<SearchResults />} />
          {/* Individual business page at /{slug} */}
          <Route path="/:slug" element={<BusinessProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <MobileNavigation />
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
