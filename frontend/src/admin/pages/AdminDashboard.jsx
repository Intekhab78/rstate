import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../utils/adminApi';
import { getServerRoot } from '../../utils/api.js';
import {
  FolderKanban,
  Wrench,
  Inbox,
  Users,
  Database,
  ArrowRight,
  Plus,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    enquiries: 0,
    team: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiHost, setApiHost] = useState('Detecting...');

  useEffect(() => {
    getServerRoot().then(root => setApiHost(root));
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [projRes, servRes, enqRes, teamRes] = await Promise.all([
          apiFetch('/projects'),
          apiFetch('/services'),
          apiFetch('/enquiries'),
          apiFetch('/team')
        ]);

        setStats({
          projects: projRes.data?.data?.length || 0,
          services: servRes.data?.data?.length || 0,
          enquiries: enqRes.data?.data?.length || 0,
          team: teamRes.data?.data?.length || 0
        });

        if (enqRes.data?.data) {
          setRecentEnquiries(enqRes.data.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Projects', count: stats.projects, path: '/admin/projects', icon: FolderKanban, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Services', count: stats.services, path: '/admin/services', icon: Wrench, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Enquiries', count: stats.enquiries, path: '/admin/enquiries', icon: Inbox, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Team Members', count: stats.team, path: '/admin/team', icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>CMS Overview & Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome to SaffPol Control Center
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Manage your public projects, services, team members, client enquiries, and content in real-time from a single secure hub.
          </p>
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.path}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all hover:translate-y-[-2px] group block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
                <div className={`p-2.5 rounded-lg border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">
                  {loading ? '...' : card.count}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                  Manage <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Recent Enquiries</h2>
              <p className="text-xs text-slate-400">Latest client submissions from the public website</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-slate-500">Loading enquiries...</div>
          ) : recentEnquiries.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 border border-dashed border-slate-800 rounded-lg">
              No client enquiries submitted yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200 text-sm">{enq.name}</span>
                      {enq.company && (
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {enq.company}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{enq.email}</span>
                      <span>•</span>
                      <span>{enq.mobile || 'No phone'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        enq.status === 'New'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {enq.status || 'New'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(enq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & System Health */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                to="/admin/about-page"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span>Manage About Us Page</span>
                <Plus className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                to="/admin/projects"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span>Add New Project</span>
                <Plus className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                to="/admin/services"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span>Add New Service</span>
                <Plus className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                to="/admin/team"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span>Add Team Member</span>
                <Plus className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Backend & Database</span>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Database Status</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SQLite Active
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>API Host</span>
                <span className="text-slate-200 font-mono text-xs truncate max-w-[180px]" id="api-host-display">{apiHost}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Auth Protocol</span>
                <span className="text-slate-200 font-mono">JWT (Bearer)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
