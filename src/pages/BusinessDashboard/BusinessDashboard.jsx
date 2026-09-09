import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Search,
  PhoneCall,
  Star,
  Plus,
  Edit,
  ExternalLink,
  Users,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  Menu,
  X,
} from 'lucide-react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useRegistration } from '../../context/RegistrationContext';

const mockBusiness = {
  name: 'CellTech Mobiles',
  categoryName: 'Electronics & Mobile Repair',
  city: 'Kottakkal',
};

const mockStats = [
  { title: 'Profile Views', value: '1,240', change: '+18%', icon: Eye },
  { title: 'Search Appearances', value: '450', change: '+12%', icon: Search },
  { title: 'Customer Leads', value: '89', change: '+24%', icon: PhoneCall },
  { title: 'Average Rating', value: '4.9', change: '128 Reviews', icon: Star },
];

export const BusinessDashboard = () => {
  const { formData } = useRegistration();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const business = {
    ...mockBusiness,
    ...formData,
    name: formData.name || mockBusiness.name,
    categoryName: formData.categoryName || mockBusiness.categoryName,
    city: formData.city || mockBusiness.city,
  };

  const inquiries = [
    { id: 'inq-1', name: 'Rahul Menon', phone: '+91 98470 99887', service: 'iPhone Screen Replacement', time: '2 hours ago', status: 'New' },
    { id: 'inq-2', name: 'Fathima Sahla', phone: '+91 98471 88776', service: 'Smartphone Exchange Offer', time: '5 hours ago', status: 'Contacted' },
    { id: 'inq-3', name: 'Anand Kumar', phone: '+91 98472 77665', service: 'Genuine Battery Service', time: '1 day ago', status: 'Resolved' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)}></div>
          <div className="relative z-10 w-72 bg-surface">
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/30">
              <span className="font-headline font-bold text-primary">NEXORA Admin</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-on-surface-variant">
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="bg-surface border-b border-outline-variant/30 px-margin-mobile md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                Business Dashboard
              </h1>
              <p className="font-sans text-xs text-on-surface-variant">
                Welcome back, {business.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/business/celltech-mobiles" target="_blank">
              <Button variant="outline" size="sm" icon={ExternalLink}>
                Public Page
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="w-full p-margin-mobile md:p-8 space-y-8">
          {/* Top Banner Card */}
          <div className="bg-primary-container rounded-3xl p-6 md:p-8 text-on-primary relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold mb-3">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" /> Active Verified Partner Listing
              </div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold mb-2">
                {business.name}
              </h2>
              <p className="font-sans text-sm text-on-primary/80">
                {business.categoryName} • {business.city}, Malappuram
              </p>
            </div>

            <div className="relative z-10 flex gap-3">
              <Link to="/business/list">
                <Button variant="primary" size="md" icon={Edit} className="bg-white text-primary-container hover:bg-surface-bright font-bold">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat) => (
              <DashboardCard key={stat.title} {...stat} changeType="positive" />
            ))}
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-headline text-base font-bold text-on-surface">
                Profile Completion Status
              </h3>
              <span className="font-sans text-xs font-bold text-primary">85% Complete</span>
            </div>
            <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden mb-3">
              <div className="h-full bg-secondary w-[85%] rounded-full"></div>
            </div>
            <p className="font-sans text-xs text-on-surface-variant flex items-center justify-between">
              <span>Add 2 more high-resolution photos of your storefront to reach 100% completion.</span>
              <button className="text-primary font-semibold hover:underline">Upload Photos</button>
            </p>
          </div>

          {/* Recent Inquiries Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Recent Inquiries</h3>
                <p className="font-sans text-xs text-on-surface-variant">Customer leads generated from your listing</p>
              </div>
              <Button variant="ghost" size="sm">
                View All Inquiries
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-xs font-semibold text-outline uppercase tracking-wider">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">Service Inquired</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-surface-container/40 transition-colors">
                      <td className="py-3.5 font-bold text-on-surface">{inq.name}</td>
                      <td className="py-3.5 text-on-surface-variant">{inq.phone}</td>
                      <td className="py-3.5 text-on-surface">{inq.service}</td>
                      <td className="py-3.5 text-outline text-xs">{inq.time}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            inq.status === 'New'
                              ? 'bg-blue-100 text-blue-800'
                              : inq.status === 'Contacted'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <a href={`tel:${inq.phone}`}>
                          <Button variant="outline" size="sm" icon={PhoneCall}>
                            Call
                          </Button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
