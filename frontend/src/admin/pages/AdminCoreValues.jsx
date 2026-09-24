import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  Handshake,
  Users,
  MessageSquare,
  HardHat,
  Lightbulb,
  Building2,
  Wrench,
  Ruler,
  Shield,
  CheckCircle2,
  Layers,
  Edit3,
  Link as LinkIcon
} from 'lucide-react';

const availableIcons = [
  { name: 'Handshake', label: 'Handshake / Partnership' },
  { name: 'ShieldCheck', label: 'Shield Check / Ethics' },
  { name: 'Users', label: 'Users / Teamwork' },
  { name: 'MessageSquare', label: 'Message / Communication' },
  { name: 'HardHat', label: 'Hard Hat / Safety' },
  { name: 'Lightbulb', label: 'Lightbulb / Innovation' },
  { name: 'Building2', label: 'Building' },
  { name: 'Wrench', label: 'Wrench / Quality' },
  { name: 'Ruler', label: 'Ruler / Precision' },
  { name: 'Shield', label: 'Shield' }
];

function AdminCoreValues() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [label, setLabel] = useState('What Drives Us');
  const [title, setTitle] = useState('OUR CORE VALUES');
  const [description, setDescription] = useState(
    'We build every project on clear principles that guide how we plan, communicate, and deliver.'
  );
  const [bgImage, setBgImage] = useState(
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85'
  );
  const [btnText, setBtnText] = useState('Learn more about our approach');
  const [btnLink, setBtnLink] = useState('#about');
  const [items, setItems] = useState([]);

  // New Item State
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemIcon, setNewItemIcon] = useState('Handshake');

  const fetchCoreValuesData = async () => {
    setLoading(true);
    const res = await apiFetch('/core-values');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      setLabel(d.label || 'What Drives Us');
      setTitle(d.title || 'OUR CORE VALUES');
      setDescription(d.description || '');
      setBgImage(d.bg_image || '');
      setBtnText(d.btn_text || 'Learn more about our approach');
      setBtnLink(d.btn_link || '#about');
      setItems(d.items || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoreValuesData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/core-values', {
      method: 'PUT',
      body: JSON.stringify({
        label,
        title,
        description,
        bg_image: bgImage,
        btn_text: btnText,
        btn_link: btnLink,
        items
      })
    });

    if (res.ok && res.data.success) {
      setMessage('Core Values section updated successfully! Changes are live on the public site.');
    } else {
      setMessage(res.data.message || 'Failed to update Core Values section.');
    }
    setSaving(false);
  };

  const addItem = () => {
    if (!newItemTitle.trim()) return;
    setItems([
      ...items,
      {
        title: newItemTitle.trim(),
        description: newItemDesc.trim(),
        icon: newItemIcon
      }
    ]);
    setNewItemTitle('');
    setNewItemDesc('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, val) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [field]: val };
    setItems(copy);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>Core Values Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Manage Core Values titles, description, background image, CTA button, and principle cards
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-lg shadow-amber-500/10 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save & Publish to Site'}</span>
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center gap-3">
          <Check className="w-5 h-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading Core Values Settings...</div>
      ) : (
        <div className="space-y-8">
          {/* SECTION 1: SECTION HEADINGS & BACKGROUND IMAGE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Edit3 className="w-5 h-5 text-amber-400" />
              <span>1. Section Text & Background Image</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Section Small Label
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. What Drives Us"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. OUR CORE VALUES"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Section Description
                </label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Principles paragraph text..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Background Image URL
                </label>
                <div className="flex items-center gap-4">
                  {bgImage && (
                    <img
                      src={bgImage}
                      alt="Background Preview"
                      className="w-24 h-16 rounded-lg object-cover bg-slate-950 border border-slate-700 shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CTA BUTTON CONFIGURATION */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <LinkIcon className="w-5 h-5 text-amber-400" />
              <span>2. Bottom CTA Button Settings</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Button Text (Leave empty to hide button)
                </label>
                <input
                  type="text"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                  placeholder="e.g. Learn more about our approach"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Button Target Link / Anchor
                </label>
                <input
                  type="text"
                  value={btnLink}
                  onChange={(e) => setBtnLink(e.target.value)}
                  placeholder="e.g. #about or /about"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: CORE VALUE CARDS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>3. Core Value Cards ({items.length})</span>
              </h2>
            </div>

            {/* Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400">Card #{idx + 1}</span>
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                      title="Delete Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(idx, 'title', e.target.value)}
                        placeholder="Title"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Icon</label>
                      <select
                        value={item.icon || 'Handshake'}
                        onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {availableIcons.map((ic) => (
                          <option key={ic.name} value={ic.name}>
                            Icon: {ic.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows="3"
                        value={item.description}
                        onChange={(e) => updateItem(idx, 'description', e.target.value)}
                        placeholder="Card description text..."
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Card Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Core Value Card
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Card Title (e.g. Sustainable Engineering)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <select
                  value={newItemIcon}
                  onChange={(e) => setNewItemIcon(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic.name} value={ic.name}>
                      Icon: {ic.label}
                    </option>
                  ))}
                </select>
                <textarea
                  rows="2"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Card description paragraph..."
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="button"
                onClick={addItem}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCoreValues;
