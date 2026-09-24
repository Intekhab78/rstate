import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getAuthToken, getStoredUser, adminLogout } from './utils/adminApi';
import {
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  ListOrdered,
  Award,
  Megaphone,
  FolderKanban,
  Wrench,
  Users,
  FileText,
  Newspaper,
  Quote,
  Briefcase,
  Inbox,
  Phone,
  Info,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/admin/login');
    } else {
      setUser(getStoredUser());
    }
  }, [navigate]);

  if (!getAuthToken()) {
    return null;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'About Us CMS', path: '/admin/about-page', icon: Info },
    { label: 'Hero Banner', path: '/admin/hero', icon: Sparkles },
    { label: 'Core Values', path: '/admin/core-values', icon: ShieldCheck },
    { label: 'How It Works', path: '/admin/how-it-works', icon: ListOrdered },
    { label: 'Why Choose Us', path: '/admin/why-choose', icon: Award },
    { label: 'Contact CTA Banner', path: '/admin/contact-cta', icon: Megaphone },
    { label: 'Contact Page CMS', path: '/admin/contact-page', icon: Phone },

    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Services', path: '/admin/services', icon: Wrench },
    { label: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { label: 'Team', path: '/admin/team', icon: Users },
    { label: 'Insights / Blog', path: '/admin/insights', icon: FileText },
    { label: 'News & Updates', path: '/admin/news', icon: Newspaper },
    { label: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { label: 'Careers', path: '/admin/careers', icon: Briefcase },
    { label: 'Contact Info', path: '/admin/contact', icon: Phone }
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-400 hover:text-slate-200 p-1"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-lg shadow-md shadow-amber-500/20">
              S
            </div>
            <div>
              <span className="font-bold text-slate-100 text-lg tracking-tight">SaffPol</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded ml-2 border border-amber-500/30">
                CMS Admin
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-slate-200">{user?.name || 'Administrator'}</div>
              <div className="text-xs text-slate-400">{user?.email || 'admin@saffpol.com'}</div>
            </div>

            <button
              onClick={adminLogout}
              title="Sign Out"
              className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex">
            <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-200">CMS Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
