import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  Phone,
  Save,
  Plus,
  Trash2,
  Check,
  Edit3,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Clock3,
  HelpCircle,
  Building2,
  CalendarDays,
  Send,
  ArrowUpRight,
  Layers,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const availableIcons = [
  { name: 'Phone', label: 'Phone' },
  { name: 'Mail', label: 'Mail' },
  { name: 'MapPin', label: 'Map Pin / Address' },
  { name: 'Clock3', label: 'Clock / Hours' },
  { name: 'CalendarDays', label: 'Calendar' },
  { name: 'Building2', label: 'Building' },
  { name: 'ArrowUpRight', label: 'Arrow Up Right' },
  { name: 'Send', label: 'Send' },
  { name: 'MessageSquare', label: 'Message / Chat' }
];

function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  // State objects
  const [hero, setHero] = useState({
    enabled: true,
    tag: 'Get In Touch',
    title: "Let's Build Something Together",
    subtitle: '',
    bg_image: '',
    buttons: []
  });

  const [contactCards, setContactCards] = useState([]);

  const [formSettings, setFormSettings] = useState({
    enabled: true,
    tag: 'Contact Saffpoll',
    title: 'Send Us a Message',
    description: '',
    service_options: []
  });

  const [officeInfo, setOfficeInfo] = useState({
    enabled: true,
    tag: 'Our Office',
    title: 'Visit or Connect With Us',
    description: '',
    badge: 'Saffpoll',
    heading: 'Jasola Vihar, New Delhi',
    image_url: '',
    address_lines: [],
    phones: [],
    email: ''
  });

  const [quickActions, setQuickActions] = useState([]);
  const [map, setMap] = useState({
    enabled: true,
    tag: 'Find Us',
    title: 'Our Location',
    maps_url: '',
    embed_url: ''
  });

  const [faqs, setFaqs] = useState([]);
  const [finalCTA, setFinalCTA] = useState({
    enabled: true,
    tag: "Let's Build Together",
    title: 'Ready to Start Your Project?',
    subtitle: '',
    buttons: []
  });

  // Forms state for adding items
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const [newServiceLabel, setNewServiceLabel] = useState('');

  const [newCardLabel, setNewCardLabel] = useState('');
  const [newCardIcon, setNewCardIcon] = useState('Phone');
  const [newCardLinesText, setNewCardLinesText] = useState('');

  const [newQaTitle, setNewQaTitle] = useState('');
  const [newQaSubtitle, setNewQaSubtitle] = useState('');
  const [newQaLink, setNewQaLink] = useState('');
  const [newQaIcon, setNewQaIcon] = useState('Phone');

  const fetchData = async () => {
    setLoading(true);
    const res = await apiFetch('/contact-page');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      if (d.hero) setHero(d.hero);
      if (Array.isArray(d.contact_cards)) setContactCards(d.contact_cards);
      if (d.form_settings) setFormSettings(d.form_settings);
      if (d.office_info) setOfficeInfo(d.office_info);
      if (Array.isArray(d.quick_actions)) setQuickActions(d.quick_actions);
      if (d.map) setMap(d.map);
      if (Array.isArray(d.faqs)) setFaqs(d.faqs);
      if (d.final_cta) setFinalCTA(d.final_cta);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/contact-page', {
      method: 'PUT',
      body: JSON.stringify({
        hero,
        contact_cards: contactCards,
        form_settings: formSettings,
        office_info: officeInfo,
        quick_actions: quickActions,
        map,
        faqs,
        final_cta: finalCTA
      })
    });

    if (res.ok && res.data.success) {
      setMessage('Contact Us Page updated successfully! Changes are live on the website.');
    } else {
      setMessage(res.data.message || 'Failed to update page.');
    }
    setSaving(false);
  };

  // Helper toggle item enabled state
  const toggleItemEnabled = (setter, list, idx) => {
    const copy = [...list];
    copy[idx] = { ...copy[idx], enabled: copy[idx].enabled === false ? true : false };
    setter(copy);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Phone className="w-6 h-6 text-amber-400" />
            <span>"Contact Us" Page Complete Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Zero hardcoded elements. Add, edit, delete, or toggle <strong>Enable/Disable (Show/Hide)</strong> for every section, card, FAQ, and action.
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

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'hero', label: '1. Hero Banner' },
          { id: 'cards', label: '2. Contact Cards' },
          { id: 'form', label: '3. Form & Services' },
          { id: 'office', label: '4. Office & Quick Actions' },
          { id: 'map', label: '5. Location Map' },
          { id: 'faqs', label: '6. FAQs Manager' },
          { id: 'cta', label: '7. Bottom CTA' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading Contact Page Settings...</div>
      ) : (
        <div className="space-y-6">

          {/* TAB 1: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>1. Contact Hero Banner</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, enabled: hero.enabled === false ? true : false })}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors border ${
                    hero.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {hero.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{hero.enabled !== false ? 'Section Enabled' : 'Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Top Small Tag Line
                  </label>
                  <input
                    type="text"
                    value={hero.tag || ''}
                    onChange={(e) => setHero({ ...hero, tag: e.target.value })}
                    placeholder="e.g. Get In Touch"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={hero.title || ''}
                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                    placeholder="e.g. Let's Build Something Together"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Subtitle Description
                  </label>
                  <textarea
                    rows="3"
                    value={hero.subtitle || ''}
                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                    placeholder="Hero description paragraph..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Background Image URL
                  </label>
                  <input
                    type="text"
                    value={hero.bg_image || ''}
                    onChange={(e) => setHero({ ...hero, bg_image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT CARDS */}
          {activeTab === 'cards' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>2. Contact Info Cards ({contactCards.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactCards.map((card, idx) => {
                  const isEnabled = card.enabled !== false;
                  return (
                    <div
                      key={card.id || idx}
                      className={`border rounded-xl p-5 space-y-4 transition-all ${
                        isEnabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-amber-400">Card #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleItemEnabled(setContactCards, contactCards, idx)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                              isEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactCards(contactCards.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Label</label>
                            <input
                              type="text"
                              value={card.label || ''}
                              onChange={(e) => {
                                const copy = [...contactCards];
                                copy[idx].label = e.target.value;
                                setContactCards(copy);
                              }}
                              placeholder="e.g. Phone"
                              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Icon</label>
                            <select
                              value={card.icon || 'Phone'}
                              onChange={(e) => {
                                const copy = [...contactCards];
                                copy[idx].icon = e.target.value;
                                setContactCards(copy);
                              }}
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

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Text Content Lines (One per line)
                          </label>
                          <textarea
                            rows="3"
                            value={Array.isArray(card.lines) ? card.lines.join('\n') : card.lines || ''}
                            onChange={(e) => {
                              const copy = [...contactCards];
                              copy[idx].lines = e.target.value.split('\n');
                              setContactCards(copy);
                            }}
                            placeholder="Line 1&#10;Line 2"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Href (Optional)</label>
                          <input
                            type="text"
                            value={card.href || ''}
                            onChange={(e) => {
                              const copy = [...contactCards];
                              copy[idx].href = e.target.value;
                              setContactCards(copy);
                            }}
                            placeholder="tel:+91... or mailto:..."
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Contact Card */}
              <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Contact Card
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newCardLabel}
                    onChange={(e) => setNewCardLabel(e.target.value)}
                    placeholder="Card Label (e.g. WhatsApp Support)"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <select
                    value={newCardIcon}
                    onChange={(e) => setNewCardIcon(e.target.value)}
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
                    value={newCardLinesText}
                    onChange={(e) => setNewCardLinesText(e.target.value)}
                    placeholder="Content text lines (one per line)..."
                    className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newCardLabel.trim()) return;
                    setContactCards([
                      ...contactCards,
                      {
                        id: `card_${Date.now()}`,
                        enabled: true,
                        label: newCardLabel.trim(),
                        icon: newCardIcon,
                        lines: newCardLinesText.split('\n').filter((l) => l.trim().length > 0)
                      }
                    ]);
                    setNewCardLabel('');
                    setNewCardLinesText('');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Card Record
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: FORM & SERVICES */}
          {activeTab === 'form' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-400" />
                  <span>3. Message Form & Service Options</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setFormSettings({ ...formSettings, enabled: formSettings.enabled === false ? true : false })}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border ${
                    formSettings.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {formSettings.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{formSettings.enabled !== false ? 'Form Enabled' : 'Form Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Form Tag Line
                  </label>
                  <input
                    type="text"
                    value={formSettings.tag || ''}
                    onChange={(e) => setFormSettings({ ...formSettings, tag: e.target.value })}
                    placeholder="e.g. Contact Saffpoll"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Form Main Heading
                  </label>
                  <input
                    type="text"
                    value={formSettings.title || ''}
                    onChange={(e) => setFormSettings({ ...formSettings, title: e.target.value })}
                    placeholder="e.g. Send Us a Message"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Form Description Paragraph
                  </label>
                  <textarea
                    rows="2"
                    value={formSettings.description || ''}
                    onChange={(e) => setFormSettings({ ...formSettings, description: e.target.value })}
                    placeholder="Form description..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Service Options List */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Service Select Options ({formSettings.service_options?.length || 0})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formSettings.service_options || []).map((srv, idx) => {
                    const isEnabled = srv.enabled !== false;
                    return (
                      <div
                        key={srv.id || idx}
                        className={`flex items-center justify-between border rounded-lg p-3 gap-3 ${
                          isEnabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                        }`}
                      >
                        <input
                          type="text"
                          value={srv.label || ''}
                          onChange={(e) => {
                            const copy = [...formSettings.service_options];
                            copy[idx].label = e.target.value;
                            copy[idx].value = e.target.value;
                            setFormSettings({ ...formSettings, service_options: copy });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xs text-white flex-1"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...formSettings.service_options];
                            copy[idx].enabled = !isEnabled;
                            setFormSettings({ ...formSettings, service_options: copy });
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            isEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {isEnabled ? 'Enabled' : 'Disabled'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const copy = formSettings.service_options.filter((_, i) => i !== idx);
                            setFormSettings({ ...formSettings, service_options: copy });
                          }}
                          className="text-slate-400 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Add Service Option */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="text"
                    value={newServiceLabel}
                    onChange={(e) => setNewServiceLabel(e.target.value)}
                    placeholder="New Service Option (e.g. Interior Design)"
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newServiceLabel.trim()) return;
                      const copy = [
                        ...(formSettings.service_options || []),
                        { id: `srv_${Date.now()}`, enabled: true, label: newServiceLabel.trim(), value: newServiceLabel.trim() }
                      ];
                      setFormSettings({ ...formSettings, service_options: copy });
                      setNewServiceLabel('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Option
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICE & QUICK ACTIONS */}
          {activeTab === 'office' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>4. Office Card & Quick Actions</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setOfficeInfo({ ...officeInfo, enabled: officeInfo.enabled === false ? true : false })}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border ${
                    officeInfo.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {officeInfo.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{officeInfo.enabled !== false ? 'Office Card Enabled' : 'Office Card Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Office Section Tag</label>
                  <input
                    type="text"
                    value={officeInfo.tag || ''}
                    onChange={(e) => setOfficeInfo({ ...officeInfo, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Office Section Title</label>
                  <input
                    type="text"
                    value={officeInfo.title || ''}
                    onChange={(e) => setOfficeInfo({ ...officeInfo, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Office Image URL</label>
                  <input
                    type="text"
                    value={officeInfo.image_url || ''}
                    onChange={(e) => setOfficeInfo({ ...officeInfo, image_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Action Buttons ({quickActions.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((qa, idx) => {
                    const isEnabled = qa.enabled !== false;
                    return (
                      <div key={qa.id || idx} className={`border rounded-xl p-4 space-y-3 ${isEnabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-800/50 opacity-60'}`}>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-mono font-bold text-amber-400">Action #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => toggleItemEnabled(setQuickActions, quickActions, idx)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${isEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                          >
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={qa.title || ''}
                          onChange={(e) => {
                            const copy = [...quickActions];
                            copy[idx].title = e.target.value;
                            setQuickActions(copy);
                          }}
                          placeholder="Title"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={qa.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...quickActions];
                            copy[idx].subtitle = e.target.value;
                            setQuickActions(copy);
                          }}
                          placeholder="Subtitle"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOCATION & MAP */}
          {activeTab === 'map' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>5. Location & Map Settings</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setMap({ ...map, enabled: map.enabled === false ? true : false })}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border ${
                    map.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {map.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{map.enabled !== false ? 'Map Section Enabled' : 'Map Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tag Line</label>
                  <input
                    type="text"
                    value={map.tag || ''}
                    onChange={(e) => setMap({ ...map, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Main Title</label>
                  <input
                    type="text"
                    value={map.title || ''}
                    onChange={(e) => setMap({ ...map, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Google Maps Embed iframe URL</label>
                  <input
                    type="text"
                    value={map.embed_url || ''}
                    onChange={(e) => setMap({ ...map, embed_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FAQS MANAGER */}
          {activeTab === 'faqs' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>6. Frequently Asked Questions ({faqs.length})</span>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isEnabled = faq.enabled !== false;
                  return (
                    <div
                      key={faq.id || idx}
                      className={`border rounded-xl p-4 space-y-3 ${
                        isEnabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-amber-400">FAQ #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleItemEnabled(setFaqs, faqs, idx)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${
                              isEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Question</label>
                        <input
                          type="text"
                          value={faq.question || ''}
                          onChange={(e) => {
                            const copy = [...faqs];
                            copy[idx].question = e.target.value;
                            setFaqs(copy);
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Answer</label>
                        <textarea
                          rows="3"
                          value={faq.answer || ''}
                          onChange={(e) => {
                            const copy = [...faqs];
                            copy[idx].answer = e.target.value;
                            setFaqs(copy);
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New FAQ */}
              <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New FAQ
                </h3>
                <input
                  type="text"
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  placeholder="Question (e.g. Do you handle interior design?)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white"
                />
                <textarea
                  rows="3"
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  placeholder="Detailed answer text..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newFaqQuestion.trim()) return;
                    setFaqs([
                      ...faqs,
                      { id: `faq_${Date.now()}`, enabled: true, question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }
                    ]);
                    setNewFaqQuestion('');
                    setNewFaqAnswer('');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add FAQ Record
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: BOTTOM FINAL CTA */}
          {activeTab === 'cta' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>7. Bottom Final CTA Banner</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setFinalCTA({ ...finalCTA, enabled: finalCTA.enabled === false ? true : false })}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border ${
                    finalCTA.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {finalCTA.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{finalCTA.enabled !== false ? 'CTA Enabled' : 'CTA Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tag Line</label>
                  <input
                    type="text"
                    value={finalCTA.tag || ''}
                    onChange={(e) => setFinalCTA({ ...finalCTA, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Title</label>
                  <input
                    type="text"
                    value={finalCTA.title || ''}
                    onChange={(e) => setFinalCTA({ ...finalCTA, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subtitle</label>
                  <textarea
                    rows="3"
                    value={finalCTA.subtitle || ''}
                    onChange={(e) => setFinalCTA({ ...finalCTA, subtitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default AdminContactPage;
