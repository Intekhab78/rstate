import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  Megaphone,
  Save,
  Plus,
  Trash2,
  Check,
  Edit3,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react';

const availableIcons = [
  { name: 'Phone', label: 'Phone' },
  { name: 'ArrowRight', label: 'Arrow Right' },
  { name: 'Mail', label: 'Mail' },
  { name: 'MessageSquare', label: 'Chat / Message' },
  { name: 'Send', label: 'Send' },
  { name: 'Calendar', label: 'Calendar' }
];

function AdminContactCTA() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Master Section Enable Switch
  const [enabled, setEnabled] = useState(true);

  // Main Section Text & Image
  const [tag, setTag] = useState("Let's Build Together");
  const [title, setTitle] = useState('Plan your next project with Saffpoll');
  const [description, setDescription] = useState(
    "Have a residential, commercial, renovation, or construction requirement? Talk directly with our team and let's discuss how we can bring your vision to life."
  );
  const [bgImage, setBgImage] = useState(
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80'
  );

  // Arrays
  const [buttons, setButtons] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);

  // New Button Form State
  const [newBtnText, setNewBtnText] = useState('');
  const [newBtnLink, setNewBtnLink] = useState('');
  const [newBtnStyle, setNewBtnStyle] = useState('filled');
  const [newBtnIcon, setNewBtnIcon] = useState('ArrowRight');

  // New Contact Detail Pill Form State
  const [newDetailText, setNewDetailText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const res = await apiFetch('/contact-cta');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      setEnabled(d.enabled !== false);
      setTag(d.tag || "Let's Build Together");
      setTitle(d.title || 'Plan your next project with Saffpoll');
      setDescription(d.description || '');
      setBgImage(d.bg_image || '');
      setButtons(d.buttons || []);
      setContactDetails(d.contact_details || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/contact-cta', {
      method: 'PUT',
      body: JSON.stringify({
        enabled,
        tag,
        title,
        description,
        bg_image: bgImage,
        buttons,
        contact_details: contactDetails
      })
    });

    if (res.ok && res.data.success) {
      setMessage('"Contact CTA" section updated successfully! Changes are live on the website.');
    } else {
      setMessage(res.data.message || 'Failed to update section.');
    }
    setSaving(false);
  };

  // Button Handlers
  const toggleButtonEnabled = (index) => {
    const copy = [...buttons];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setButtons(copy);
  };

  const updateButton = (index, field, val) => {
    const copy = [...buttons];
    copy[index] = { ...copy[index], [field]: val };
    setButtons(copy);
  };

  const removeButton = (index) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const addButton = () => {
    if (!newBtnText.trim()) return;
    setButtons([
      ...buttons,
      {
        id: `btn_${Date.now()}`,
        enabled: true,
        text: newBtnText.trim(),
        link: newBtnLink.trim() || '#',
        style: newBtnStyle,
        icon: newBtnIcon
      }
    ]);
    setNewBtnText('');
    setNewBtnLink('');
  };

  // Contact Detail Pill Handlers
  const toggleDetailEnabled = (index) => {
    const copy = [...contactDetails];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setContactDetails(copy);
  };

  const updateDetailText = (index, val) => {
    const copy = [...contactDetails];
    copy[index] = { ...copy[index], text: val };
    setContactDetails(copy);
  };

  const removeDetail = (index) => {
    setContactDetails(contactDetails.filter((_, i) => i !== index));
  };

  const addDetail = () => {
    if (!newDetailText.trim()) return;
    setContactDetails([
      ...contactDetails,
      {
        id: `detail_${Date.now()}`,
        enabled: true,
        text: newDetailText.trim()
      }
    ]);
    setNewDetailText('');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-400" />
            <span>"Contact CTA Banner" Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Manage section visibility, heading text, background image, call/callback buttons, and contact detail pills.
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
        <div className="text-center py-12 text-slate-500">Loading Section Settings...</div>
      ) : (
        <div className="space-y-8">

          {/* MASTER SECTION ENABLE TOGGLE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Section Master Visibility</span>
              </h2>
              <p className="text-xs text-slate-400">
                Turn this section <strong>ON (Enabled)</strong> or <strong>OFF (Disabled)</strong> on the public website.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer border ${
                enabled
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{enabled ? 'Section Enabled (Visible)' : 'Section Disabled (Hidden)'}</span>
            </button>
          </div>

          {/* SECTION 1: HEADER TEXT & MEDIA */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Edit3 className="w-5 h-5 text-amber-400" />
              <span>1. Banner Headings & Background Image</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Small Top Tag Line
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Let's Build Together"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Plan your next project with Saffpoll"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Description Paragraph
                </label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="CTA description..."
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
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ACTION BUTTONS MANAGER */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>2. Action Buttons ({buttons.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buttons.map((btn, idx) => {
                const isEnabled = btn.enabled !== false;
                return (
                  <div
                    key={btn.id || idx}
                    className={`border rounded-xl p-5 space-y-4 transition-all ${
                      isEnabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Button #{idx + 1}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleButtonEnabled(idx)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                          title={isEnabled ? 'Click to Disable' : 'Click to Enable'}
                        >
                          {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeButton(idx)}
                          className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Delete Button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={btn.text || ''}
                          onChange={(e) => updateButton(idx, 'text', e.target.value)}
                          placeholder="Button Text"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Target Link / Action (e.g. tel:+91..., mailto:..., #contact)
                        </label>
                        <input
                          type="text"
                          value={btn.link || ''}
                          onChange={(e) => updateButton(idx, 'link', e.target.value)}
                          placeholder="tel:+91..."
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Style Format
                          </label>
                          <select
                            value={btn.style || 'filled'}
                            onChange={(e) => updateButton(idx, 'style', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="filled">Filled (Gold)</option>
                            <option value="outline">Outline (Border)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Icon
                          </label>
                          <select
                            value={btn.icon || 'ArrowRight'}
                            onChange={(e) => updateButton(idx, 'icon', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            {availableIcons.map((ic) => (
                              <option key={ic.name} value={ic.name}>
                                Icon: {ic.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Button Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Action Button
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newBtnText}
                  onChange={(e) => setNewBtnText(e.target.value)}
                  placeholder="Button Text (e.g. Schedule Consultation)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  value={newBtnLink}
                  onChange={(e) => setNewBtnLink(e.target.value)}
                  placeholder="Link Action (e.g. tel:+91... or mailto:...)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <select
                  value={newBtnStyle}
                  onChange={(e) => setNewBtnStyle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="filled">Filled (Gold)</option>
                  <option value="outline">Outline (Border)</option>
                </select>
                <select
                  value={newBtnIcon}
                  onChange={(e) => setNewBtnIcon(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic.name} value={ic.name}>
                      Icon: {ic.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={addButton}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Button Record</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: CONTACT INFO PILLS (BOTTOM LINE) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>3. Bottom Contact Detail Pills ({contactDetails.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {contactDetails.map((detail, idx) => {
                const isEnabled = detail.enabled !== false;
                return (
                  <div
                    key={detail.id || idx}
                    className={`border rounded-xl p-4 space-y-3 transition-all ${
                      isEnabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">Pill #{idx + 1}</span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleDetailEnabled(idx)}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeDetail(idx)}
                          className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Delete Pill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Text Content
                      </label>
                      <input
                        type="text"
                        value={detail.text || ''}
                        onChange={(e) => updateDetailText(idx, e.target.value)}
                        placeholder="e.g. +91 98104 64083"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Contact Detail Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Detail Pill
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newDetailText}
                  onChange={(e) => setNewDetailText(e.target.value)}
                  placeholder="Detail text (e.g. +91 98104 64083 or info@saffpol.com)"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={addDetail}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Pill</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default AdminContactCTA;
