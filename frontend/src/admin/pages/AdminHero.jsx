import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  Building2,
  HardHat,
  Factory,
  MapPin,
  Flag,
  Wrench,
  Ruler,
  Shield,
  Tag
} from 'lucide-react';

const availableIcons = [
  { name: 'Building2', label: 'Building' },
  { name: 'HardHat', label: 'Hard Hat' },
  { name: 'Factory', label: 'Factory / Industrial' },
  { name: 'MapPin', label: 'Map Pin / Location' },
  { name: 'Flag', label: 'Flag / Region' },
  { name: 'Wrench', label: 'Wrench / Renovation' },
  { name: 'Ruler', label: 'Ruler / Design' },
  { name: 'Shield', label: 'Shield / Quality' }
];

function AdminHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [welcomeTitle, setWelcomeTitle] = useState('Welcome to');
  const [companyName, setCompanyName] = useState('Saffpoll');
  const [subtitle, setSubtitle] = useState('EXPERT BUILDING CONTRACTOR SERVICES');
  const [slides, setSlides] = useState([]);
  const [pills, setPills] = useState([]);
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [newPillTitle, setNewPillTitle] = useState('');
  const [newPillIcon, setNewPillIcon] = useState('Building2');

  const fetchHeroData = async () => {
    setLoading(true);
    const res = await apiFetch('/hero');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      setWelcomeTitle(d.welcome_title || 'Welcome to');
      setCompanyName(d.company_name || 'Saffpoll');
      setSubtitle(d.subtitle || 'EXPERT BUILDING CONTRACTOR SERVICES');
      setSlides(d.slides || []);
      setPills(d.pills || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/hero', {
      method: 'PUT',
      body: JSON.stringify({
        welcome_title: welcomeTitle,
        company_name: companyName,
        subtitle: subtitle,
        slides,
        pills
      })
    });

    if (res.ok && res.data.success) {
      setMessage('Hero section successfully updated! Changes are live on the public site.');
    } else {
      setMessage(res.data.message || 'Failed to update hero section.');
    }
    setSaving(false);
  };

  // Add Slide
  const addSlide = () => {
    if (!newSlideUrl.trim()) return;
    setSlides([...slides, newSlideUrl.trim()]);
    setNewSlideUrl('');
  };

  // Remove Slide
  const removeSlide = (index) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  // Update Slide URL
  const updateSlide = (index, val) => {
    const copy = [...slides];
    copy[index] = val;
    setSlides(copy);
  };

  // Add Pill Item
  const addPill = () => {
    if (!newPillTitle.trim()) return;
    setPills([...pills, { title: newPillTitle.trim(), icon: newPillIcon }]);
    setNewPillTitle('');
  };

  // Remove Pill Item
  const removePill = (index) => {
    setPills(pills.filter((_, i) => i !== index));
  };

  // Update Pill Item
  const updatePill = (index, field, val) => {
    const copy = [...pills];
    copy[index] = { ...copy[index], [field]: val };
    setPills(copy);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Hero Section Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Control the main homepage banner text, background slider images, and service pills
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
        <div className="text-center py-12 text-slate-500">Loading Hero Section Settings...</div>
      ) : (
        <div className="space-y-8">
          {/* SECTION 1: MAIN HERO TEXT */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Tag className="w-5 h-5 text-amber-400" />
              <span>1. Main Hero Titles & Subtitle</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Welcome Title Prefix
                </label>
                <input
                  type="text"
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                  placeholder="e.g. Welcome to"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Highlighted Brand Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Saffpoll"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subtitle / Tagline (Gold Uppercase Text)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. EXPERT BUILDING CONTRACTOR SERVICES"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SLIDESHOW IMAGES */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                <span>2. Background Slideshow Images ({slides.length})</span>
              </h2>
            </div>

            {/* Slide List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slides.map((slideUrl, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3 relative group"
                >
                  <img
                    src={slideUrl}
                    alt={`Slide ${idx + 1}`}
                    className="w-20 h-16 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Slide #{idx + 1} Image URL
                    </label>
                    <input
                      type="text"
                      value={slideUrl}
                      onChange={(e) => updateSlide(idx, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    onClick={() => removeSlide(idx)}
                    className="text-slate-400 hover:text-red-400 p-2 rounded hover:bg-slate-800 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Slide Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={newSlideUrl}
                onChange={(e) => setNewSlideUrl(e.target.value)}
                placeholder="Paste new image URL (e.g. https://images.unsplash.com/...)"
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={addSlide}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Image Slide</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: SERVICE PILLS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                <span>3. Hero Service Pills List ({pills.length})</span>
              </h2>
            </div>

            {/* Pills List */}
            <div className="space-y-3">
              {pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-6">#{idx + 1}</span>
                    <input
                      type="text"
                      value={pill.title}
                      onChange={(e) => updatePill(idx, 'title', e.target.value)}
                      placeholder="Pill Title / Text"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={pill.icon || 'Building2'}
                      onChange={(e) => updatePill(idx, 'icon', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      {availableIcons.map((ic) => (
                        <option key={ic.name} value={ic.name}>
                          Icon: {ic.label}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removePill(idx)}
                      className="text-slate-400 hover:text-red-400 p-2 rounded hover:bg-slate-800 transition-colors"
                      title="Delete Pill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Pill Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={newPillTitle}
                onChange={(e) => setNewPillTitle(e.target.value)}
                placeholder="e.g. Industrial Epoxy Flooring"
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <select
                value={newPillIcon}
                onChange={(e) => setNewPillIcon(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {availableIcons.map((ic) => (
                  <option key={ic.name} value={ic.name}>
                    Icon: {ic.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addPill}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Pill Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHero;
