import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

function AdminGenericManager({ title, endpoint, fields, icon: Icon }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const initFormData = () => {
    const obj = {};
    fields.forEach((f) => (obj[f.name] = f.defaultValue || ''));
    return obj;
  };

  const fetchItems = async () => {
    setLoading(true);
    const res = await apiFetch(endpoint);
    if (res.ok && res.data.success) {
      setItems(res.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initFormData());
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    const obj = {};
    fields.forEach((f) => (obj[f.name] = item[f.name] || ''));
    setFormData(obj);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const targetUrl = editingId ? `${endpoint}/${editingId}` : endpoint;
    const method = editingId ? 'PUT' : 'POST';

    const res = await apiFetch(targetUrl, {
      method,
      body: JSON.stringify(formData)
    });

    if (res.ok && res.data.success) {
      setMessage(`Item ${editingId ? 'updated' : 'created'} successfully!`);
      setShowModal(false);
      fetchItems();
    } else {
      setMessage(res.data.message || 'Operation failed.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    const res = await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' });
    if (res.ok && res.data.success) {
      fetchItems();
    } else {
      alert(res.data.message || 'Failed to delete item.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            {Icon && <Icon className="w-6 h-6 text-amber-400" />}
            <span>{title} Management</span>
          </h1>
          <p className="text-sm text-slate-400">Manage CMS records for {title.toLowerCase()}</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-md shadow-amber-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-dashed border-slate-800 rounded-xl space-y-3">
          {Icon && <Icon className="w-10 h-10 text-slate-600 mx-auto" />}
          <div className="text-slate-300 font-semibold">No {title} Found</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Add New Record" above to populate {title.toLowerCase()} data.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4"># ID</th>
                  {fields.slice(0, 3).map((f) => (
                    <th key={f.name} className="p-4">
                      {f.label}
                    </th>
                  ))}
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-slate-500 font-mono">#{item.id}</td>
                    {fields.slice(0, 3).map((f) => (
                      <td key={f.name} className="p-4 text-slate-200">
                        <span className="line-clamp-1">{item[f.name] || '-'}</span>
                      </td>
                    ))}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-slate-400 hover:text-amber-400 p-1.5 rounded hover:bg-slate-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-red-400 p-1.5 rounded hover:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dynamic Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingId ? `Edit ${title}` : `Create New ${title}`}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      rows="3"
                      value={formData[f.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                      placeholder={f.placeholder || ''}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      value={formData[f.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                      placeholder={f.placeholder || ''}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  {submitting ? 'Saving...' : editingId ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminGenericManager;
