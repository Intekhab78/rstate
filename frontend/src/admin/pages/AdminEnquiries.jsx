import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import { Inbox, FileText, CheckCircle2, Clock, Trash2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await apiFetch('/enquiries');
    if (res.ok && res.data.success) {
      setEnquiries(res.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await apiFetch(`/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    if (res.ok && res.data.success) {
      fetchEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    const res = await apiFetch(`/enquiries/${id}`, { method: 'DELETE' });
    if (res.ok && res.data.success) {
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      fetchEnquiries();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Inbox className="w-6 h-6 text-amber-400" />
          <span>Client Enquiries</span>
        </h1>
        <p className="text-sm text-slate-400">View and respond to project quote requests</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-dashed border-slate-800 rounded-xl space-y-3">
          <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="text-slate-300 font-semibold">No Enquiries Received Yet</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When users submit enquiry forms on the website, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enquiries List Column */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col max-h-[700px]">
            <div className="p-4 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Enquiry Feed ({enquiries.length})
            </div>
            <div className="divide-y divide-slate-800 overflow-y-auto flex-1">
              {enquiries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedEnquiry(item)}
                  className={`w-full p-4 text-left transition-colors flex flex-col gap-1.5 cursor-pointer ${
                    selectedEnquiry?.id === item.id
                      ? 'bg-amber-500/10 border-l-4 border-amber-500'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">{item.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        item.status === 'New'
                          ? 'bg-amber-500/20 text-amber-400'
                          : item.status === 'In Progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {item.status || 'New'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">{item.company || item.email}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Enquiry Detail View */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            {selectedEnquiry ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEnquiry.name}</h2>
                    <p className="text-sm text-amber-400 font-medium">{selectedEnquiry.company || 'Private Client'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedEnquiry.status || 'New'}
                      onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
                    >
                      <option value="New">Status: New</option>
                      <option value="In Progress">Status: In Progress</option>
                      <option value="Completed">Status: Completed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(selectedEnquiry.id)}
                      className="text-slate-400 hover:text-red-400 p-1.5 rounded hover:bg-slate-800"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <a href={`tel:${selectedEnquiry.mobile}`} className="hover:underline">
                      {selectedEnquiry.mobile || 'Not provided'}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{selectedEnquiry.location || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Project Type: {selectedEnquiry.project_type || 'N/A'}</span>
                  </div>
                </div>

                {selectedEnquiry.estimated_budget && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Estimated Budget / Size: </span>
                    <span className="font-semibold text-white">{selectedEnquiry.estimated_budget}</span>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Requirement & Specifications
                  </h4>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.requirement || 'No detailed text provided.'}
                  </div>
                </div>

                {selectedEnquiry.file_url && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Attached Drawing / BOQ Document
                    </h4>
                    <a
                      href={`http://localhost:5000${selectedEnquiry.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-sm font-medium px-4 py-2 rounded-lg border border-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Uploaded File</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500">
                Select an enquiry from the left list to view complete details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEnquiries;
