import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  Info,
  Save,
  Plus,
  Trash2,
  Check,
  Edit3,
  Sparkles,
  History,
  Target,
  Users,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Building2,
  Wrench,
  Ruler,
  HardHat,
  ShieldCheck,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const availableIcons = [
  { name: 'Building2', label: 'Building' },
  { name: 'Wrench', label: 'Wrench / Tools' },
  { name: 'Ruler', label: 'Ruler / Architecture' },
  { name: 'HardHat', label: 'Hard Hat / Safety' },
  { name: 'ShieldCheck', label: 'Shield / Security' },
  { name: 'Users', label: 'Users / Team' },
  { name: 'Handshake', label: 'Handshake' },
  { name: 'MessageSquare', label: 'Message' }
];

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 01 - Hero State
  const [hero, setHero] = useState({
    enabled: true,
    badge1: 'About Saffpoll',
    badge2: '20+ Years Experience',
    title_line1: 'Building with',
    title_highlight1: 'experience.',
    title_line2: 'Delivering with',
    title_highlight2: 'purpose.',
    description: 'Saffpoll is a trusted building contractor with more than 20 years of experience delivering residential, commercial, renovation and construction solutions.',
    btn1_text: 'Our Story',
    btn1_link: '#our-story',
    btn2_text: 'Why Saffpoll',
    btn2_link: '#why-saffpoll',
    hero_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85',
    exp_card_label: 'Experience',
    exp_card_value: '20+',
    exp_card_subtext: 'Years of Experience',
    pills: []
  });

  // 02 - Story State
  const [story, setStory] = useState({
    enabled: true,
    section_label: 'Our Story',
    section_title: 'Our Journey Since 1998',
    section_description: 'From a small beginning to a trusted building contractor, Saffpoll has grown through experience, quality workmanship and long-term client relationships.',
    timeline: []
  });

  // 03 - Mission State
  const [mission, setMission] = useState({
    enabled: true,
    tag: 'Our Mission',
    title: 'Quality Work.\nClear Communication.\nReliable Delivery.',
    description: "Our goal is to understand every client's vision, execute with care, maintain quality throughout the project and deliver work that meets expectations.",
    bg_image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=2200&q=85'
  });

  // 04 - People State
  const [people, setPeople] = useState({
    enabled: true,
    section_label: 'Our People',
    section_title: 'The People Behind Saffpoll',
    section_description: 'Experienced professionals working together to plan, coordinate and deliver construction projects with care.',
    image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=85',
    highlight_title: 'Experienced people.\nOne shared standard.',
    highlight_description: 'Saffpoll works with a team of architects, designers, builders and project managers who bring practical experience to every stage of construction.',
    cards: []
  });

  // New item states
  const [newPillLabel, setNewPillLabel] = useState('');
  const [newPillIcon, setNewPillIcon] = useState('Building2');

  const [newTimelineYear, setNewTimelineYear] = useState('');
  const [newTimelineTitle, setNewTimelineTitle] = useState('');
  const [newTimelineDesc, setNewTimelineDesc] = useState('');
  const [newTimelineImg, setNewTimelineImg] = useState('');

  const [newPeopleCardTitle, setNewPeopleCardTitle] = useState('');
  const [newPeopleCardDesc, setNewPeopleCardDesc] = useState('');
  const [newPeopleCardIcon, setNewPeopleCardIcon] = useState('Users');

  // Fetch initial content
  const fetchAboutData = async () => {
    setLoading(true);
    setErrorMessage('');
    const res = await apiFetch('/about-page');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      if (d.hero) setHero((prev) => ({ ...prev, ...d.hero }));
      if (d.story) setStory((prev) => ({ ...prev, ...d.story }));
      if (d.mission) setMission((prev) => ({ ...prev, ...d.mission }));
      if (d.people) setPeople((prev) => ({ ...prev, ...d.people }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    setErrorMessage('');

    const res = await apiFetch('/about-page', {
      method: 'PUT',
      body: JSON.stringify({ hero, story, mission, people })
    });

    if (res.ok && res.data.success) {
      setMessage('About Us Page updated successfully! Changes are live on the website.');
    } else {
      setErrorMessage(res.data.message || 'Failed to update About Us Page.');
    }
    setSaving(false);
  };

  // Upload image helper
  const handleImageUpload = async (file, callback) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('saffpol_admin_token');
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (data.success && data.file_url) {
        callback(`http://localhost:5000${data.file_url}`);
      } else {
        alert(data.message || 'Image upload failed.');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image.');
    }
  };

  // Helper actions for Hero Pills
  const addPill = () => {
    if (!newPillLabel.trim()) return;
    const newP = {
      id: 'pill_' + Date.now(),
      enabled: true,
      label: newPillLabel.trim(),
      icon: newPillIcon
    };
    setHero({ ...hero, pills: [...(hero.pills || []), newP] });
    setNewPillLabel('');
  };

  const removePill = (idx) => {
    const updated = hero.pills.filter((_, i) => i !== idx);
    setHero({ ...hero, pills: updated });
  };

  const togglePill = (idx) => {
    const updated = [...hero.pills];
    updated[idx].enabled = !updated[idx].enabled;
    setHero({ ...hero, pills: updated });
  };

  // Helper actions for Timeline
  const addTimelineItem = () => {
    if (!newTimelineTitle.trim()) return;
    const newT = {
      id: 'timeline_' + Date.now(),
      enabled: true,
      year_tag: newTimelineYear.trim() || '2026',
      title: newTimelineTitle.trim(),
      description: newTimelineDesc.trim(),
      image_url: newTimelineImg.trim() || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85'
    };
    setStory({ ...story, timeline: [...(story.timeline || []), newT] });
    setNewTimelineYear('');
    setNewTimelineTitle('');
    setNewTimelineDesc('');
    setNewTimelineImg('');
  };

  const removeTimelineItem = (idx) => {
    const updated = story.timeline.filter((_, i) => i !== idx);
    setStory({ ...story, timeline: updated });
  };

  const toggleTimelineItem = (idx) => {
    const updated = [...story.timeline];
    updated[idx].enabled = !updated[idx].enabled;
    setStory({ ...story, timeline: updated });
  };

  const moveTimelineItem = (idx, direction) => {
    if ((direction === -1 && idx === 0) || (direction === 1 && idx === story.timeline.length - 1)) return;
    const copy = [...story.timeline];
    const temp = copy[idx];
    copy[idx] = copy[idx + direction];
    copy[idx + direction] = temp;
    setStory({ ...story, timeline: copy });
  };

  const updateTimelineItem = (idx, field, val) => {
    const copy = [...story.timeline];
    copy[idx] = { ...copy[idx], [field]: val };
    setStory({ ...story, timeline: copy });
  };

  // Helper actions for People Cards
  const addPeopleCard = () => {
    if (!newPeopleCardTitle.trim()) return;
    const newC = {
      id: 'card_' + Date.now(),
      enabled: true,
      title: newPeopleCardTitle.trim(),
      description: newPeopleCardDesc.trim(),
      icon: newPeopleCardIcon
    };
    setPeople({ ...people, cards: [...(people.cards || []), newC] });
    setNewPeopleCardTitle('');
    setNewPeopleCardDesc('');
  };

  const removePeopleCard = (idx) => {
    const updated = people.cards.filter((_, i) => i !== idx);
    setPeople({ ...people, cards: updated });
  };

  const togglePeopleCard = (idx) => {
    const updated = [...people.cards];
    updated[idx].enabled = !updated[idx].enabled;
    setPeople({ ...people, cards: updated });
  };

  const updatePeopleCard = (idx, field, val) => {
    const copy = [...people.cards];
    copy[idx] = { ...copy[idx], [field]: val };
    setPeople({ ...people, cards: copy });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Info className="w-6 h-6 text-amber-400" />
            <span>"About Us" Page Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Dynamically edit text, hero banner, story timeline milestones, mission statement, people cards, and toggle enable/disable controls.
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

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'hero', label: '01. Hero Banner', icon: Sparkles },
          { id: 'story', label: '02. Our Story Timeline', icon: History },
          { id: 'mission', label: '03. Mission Statement', icon: Target },
          { id: 'people', label: '04. Our People & Team', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCurrent = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                isCurrent
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading About Us CMS Settings...</div>
      ) : (
        <div className="space-y-8">
          {/* TAB 1: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>01. Hero Section Settings</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, enabled: !hero.enabled })}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    hero.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {hero.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{hero.enabled ? 'Section Enabled' : 'Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Header Badge Tag 1
                  </label>
                  <input
                    type="text"
                    value={hero.badge1 || ''}
                    onChange={(e) => setHero({ ...hero, badge1: e.target.value })}
                    placeholder="About Saffpoll"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Header Badge Tag 2
                  </label>
                  <input
                    type="text"
                    value={hero.badge2 || ''}
                    onChange={(e) => setHero({ ...hero, badge2: e.target.value })}
                    placeholder="20+ Years Experience"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Title Line 1 & Highlight
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={hero.title_line1 || ''}
                      onChange={(e) => setHero({ ...hero, title_line1: e.target.value })}
                      placeholder="Building with"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={hero.title_highlight1 || ''}
                      onChange={(e) => setHero({ ...hero, title_highlight1: e.target.value })}
                      placeholder="experience."
                      className="bg-slate-950 border border-amber-500/50 rounded-lg px-3 py-2 text-xs text-amber-400 font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Title Line 2 & Highlight
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={hero.title_line2 || ''}
                      onChange={(e) => setHero({ ...hero, title_line2: e.target.value })}
                      placeholder="Delivering with"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={hero.title_highlight2 || ''}
                      onChange={(e) => setHero({ ...hero, title_highlight2: e.target.value })}
                      placeholder="purpose."
                      className="bg-slate-950 border border-amber-500/50 rounded-lg px-3 py-2 text-xs text-amber-400 font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Description Text
                  </label>
                  <textarea
                    rows="3"
                    value={hero.description || ''}
                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                    placeholder="Saffpoll is a trusted building contractor..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Button 1 Text & Anchor Link
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={hero.btn1_text || ''}
                      onChange={(e) => setHero({ ...hero, btn1_text: e.target.value })}
                      placeholder="Our Story"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={hero.btn1_link || ''}
                      onChange={(e) => setHero({ ...hero, btn1_link: e.target.value })}
                      placeholder="#our-story"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Button 2 Text & Anchor Link
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={hero.btn2_text || ''}
                      onChange={(e) => setHero({ ...hero, btn2_text: e.target.value })}
                      placeholder="Why Saffpoll"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={hero.btn2_link || ''}
                      onChange={(e) => setHero({ ...hero, btn2_link: e.target.value })}
                      placeholder="#why-saffpoll"
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Hero Main Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={hero.hero_image || ''}
                      onChange={(e) => setHero({ ...hero, hero_image: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], (url) => setHero({ ...hero, hero_image: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {hero.hero_image && (
                    <div className="mt-2 h-24 w-40 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={hero.hero_image} alt="Hero Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Experience Floating Badge Card */}
                <div className="md:col-span-2 border-t border-slate-800 pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Hero Image Overlay Card (Experience Badge)
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge Label</label>
                      <input
                        type="text"
                        value={hero.exp_card_label || ''}
                        onChange={(e) => setHero({ ...hero, exp_card_label: e.target.value })}
                        placeholder="Experience"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Value (e.g. 20+)</label>
                      <input
                        type="text"
                        value={hero.exp_card_value || ''}
                        onChange={(e) => setHero({ ...hero, exp_card_value: e.target.value })}
                        placeholder="20+"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Subtext</label>
                      <input
                        type="text"
                        value={hero.exp_card_subtext || ''}
                        onChange={(e) => setHero({ ...hero, exp_card_subtext: e.target.value })}
                        placeholder="Years of Experience"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="md:col-span-2 border-t border-slate-800 pt-4 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Feature Pills ({hero.pills?.length || 0})
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {hero.pills?.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                          p.enabled !== false
                            ? 'bg-slate-950 text-white border-slate-700'
                            : 'bg-slate-950/40 text-slate-500 border-slate-800 line-through'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => togglePill(idx)}
                          className="hover:text-amber-400"
                          title={p.enabled !== false ? 'Disable Pill' : 'Enable Pill'}
                        >
                          {p.enabled !== false ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                        </button>
                        <span>{p.label} ({p.icon})</span>
                        <button
                          type="button"
                          onClick={() => removePill(idx)}
                          className="text-slate-400 hover:text-red-400 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-lg p-3 flex flex-wrap gap-2 items-center">
                    <input
                      type="text"
                      value={newPillLabel}
                      onChange={(e) => setNewPillLabel(e.target.value)}
                      placeholder="New Pill Label (e.g. Renovation)"
                      className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <select
                      value={newPillIcon}
                      onChange={(e) => setNewPillIcon(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {availableIcons.map((ic) => (
                        <option key={ic.name} value={ic.name}>{ic.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={addPill}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Pill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORY / TIMELINE SECTION */}
          {activeTab === 'story' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-amber-400" />
                  <span>02. Our Story / Timeline Section</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setStory({ ...story, enabled: !story.enabled })}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    story.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {story.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{story.enabled ? 'Section Enabled' : 'Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Section Label
                  </label>
                  <input
                    type="text"
                    value={story.section_label || ''}
                    onChange={(e) => setStory({ ...story, section_label: e.target.value })}
                    placeholder="Our Story"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Main Section Title
                  </label>
                  <input
                    type="text"
                    value={story.section_title || ''}
                    onChange={(e) => setStory({ ...story, section_title: e.target.value })}
                    placeholder="Our Journey Since 1998"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Section Subtitle / Description
                  </label>
                  <textarea
                    rows="2"
                    value={story.section_description || ''}
                    onChange={(e) => setStory({ ...story, section_description: e.target.value })}
                    placeholder="From a small beginning..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Timeline Items Grid */}
              <div className="space-y-4 border-t border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Timeline Milestones ({story.timeline?.length || 0})</span>
                </h3>

                <div className="space-y-4">
                  {story.timeline?.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className={`bg-slate-950 border rounded-xl p-5 space-y-4 transition-all ${
                        item.enabled !== false ? 'border-slate-800' : 'border-slate-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-200">{item.title || 'Milestone Item'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleTimelineItem(idx)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${
                              item.enabled !== false
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}
                          >
                            {item.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{item.enabled !== false ? 'Enabled' : 'Disabled'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => moveTimelineItem(idx, -1)}
                            disabled={idx === 0}
                            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveTimelineItem(idx, 1)}
                            disabled={idx === story.timeline.length - 1}
                            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeTimelineItem(idx)}
                            className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Year / Badge Tag (e.g. 1998, TODAY)
                          </label>
                          <input
                            type="text"
                            value={item.year_tag || ''}
                            onChange={(e) => updateTimelineItem(idx, 'year_tag', e.target.value)}
                            placeholder="1998"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => updateTimelineItem(idx, 'title', e.target.value)}
                            placeholder="The Beginning"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Description
                          </label>
                          <textarea
                            rows="2"
                            value={item.description || ''}
                            onChange={(e) => updateTimelineItem(idx, 'description', e.target.value)}
                            placeholder="Milestone description..."
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Image URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={item.image_url || ''}
                              onChange={(e) => updateTimelineItem(idx, 'image_url', e.target.value)}
                              placeholder="https://..."
                              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                            />
                            <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleImageUpload(e.target.files[0], (url) => updateTimelineItem(idx, 'image_url', url));
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {item.image_url && (
                            <img src={item.image_url} alt="Preview" className="mt-2 h-16 w-28 rounded object-cover border border-slate-800" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Timeline Item Form */}
                <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add New Timeline Milestone
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={newTimelineYear}
                      onChange={(e) => setNewTimelineYear(e.target.value)}
                      placeholder="Year / Tag (e.g. 2024)"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={newTimelineTitle}
                      onChange={(e) => setNewTimelineTitle(e.target.value)}
                      placeholder="Title (e.g. Major Project Expansion)"
                      className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <textarea
                      rows="2"
                      value={newTimelineDesc}
                      onChange={(e) => setNewTimelineDesc(e.target.value)}
                      placeholder="Milestone description..."
                      className="sm:col-span-3 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <div className="sm:col-span-3 flex gap-2">
                      <input
                        type="text"
                        value={newTimelineImg}
                        onChange={(e) => setNewTimelineImg(e.target.value)}
                        placeholder="Image URL (https://...)"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                      <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0], (url) => setNewTimelineImg(url));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addTimelineItem}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Milestone Record</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MISSION SECTION */}
          {activeTab === 'mission' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  <span>03. Mission Section Banner</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setMission({ ...mission, enabled: !mission.enabled })}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    mission.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {mission.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{mission.enabled ? 'Section Enabled' : 'Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Mission Tag / Small Label
                  </label>
                  <input
                    type="text"
                    value={mission.tag || ''}
                    onChange={(e) => setMission({ ...mission, tag: e.target.value })}
                    placeholder="Our Mission"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Main Mission Heading (Supports line breaks)
                  </label>
                  <textarea
                    rows="3"
                    value={mission.title || ''}
                    onChange={(e) => setMission({ ...mission, title: e.target.value })}
                    placeholder="Quality Work.&#10;Clear Communication.&#10;Reliable Delivery."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Mission Detailed Paragraph
                  </label>
                  <textarea
                    rows="3"
                    value={mission.description || ''}
                    onChange={(e) => setMission({ ...mission, description: e.target.value })}
                    placeholder="Our goal is to understand every client's vision..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Background Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mission.bg_image || ''}
                      onChange={(e) => setMission({ ...mission, bg_image: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], (url) => setMission({ ...mission, bg_image: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {mission.bg_image && (
                    <div className="mt-2 h-28 w-56 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={mission.bg_image} alt="Mission BG Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PEOPLE / TEAM SECTION */}
          {activeTab === 'people' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>04. Our People Section Settings</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setPeople({ ...people, enabled: !people.enabled })}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    people.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {people.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{people.enabled ? 'Section Enabled' : 'Section Disabled'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Section Small Label
                  </label>
                  <input
                    type="text"
                    value={people.section_label || ''}
                    onChange={(e) => setPeople({ ...people, section_label: e.target.value })}
                    placeholder="Our People"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={people.section_title || ''}
                    onChange={(e) => setPeople({ ...people, section_title: e.target.value })}
                    placeholder="The People Behind Saffpoll"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Section Subtitle / Description
                  </label>
                  <textarea
                    rows="2"
                    value={people.section_description || ''}
                    onChange={(e) => setPeople({ ...people, section_description: e.target.value })}
                    placeholder="Experienced professionals working together..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Team Main Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={people.image_url || ''}
                      onChange={(e) => setPeople({ ...people, image_url: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], (url) => setPeople({ ...people, image_url: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {people.image_url && (
                    <div className="mt-2 h-24 w-40 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={people.image_url} alt="Team Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4 border-t border-slate-800 pt-4">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Highlight Box Content
                  </h3>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Highlight Heading</label>
                    <textarea
                      rows="2"
                      value={people.highlight_title || ''}
                      onChange={(e) => setPeople({ ...people, highlight_title: e.target.value })}
                      placeholder="Experienced people.&#10;One shared standard."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Highlight Description</label>
                    <textarea
                      rows="2"
                      value={people.highlight_description || ''}
                      onChange={(e) => setPeople({ ...people, highlight_description: e.target.value })}
                      placeholder="Saffpoll works with a team of architects..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="md:col-span-2 border-t border-slate-800 pt-4 space-y-4">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Feature Cards ({people.cards?.length || 0})
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {people.cards?.map((card, idx) => (
                      <div
                        key={card.id || idx}
                        className={`bg-slate-950 border rounded-xl p-4 space-y-3 ${
                          card.enabled !== false ? 'border-slate-800' : 'border-slate-800/50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-slate-200">Card #{idx + 1}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => togglePeopleCard(idx)}
                              className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border ${
                                card.enabled !== false
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}
                            >
                              {card.enabled !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{card.enabled !== false ? 'Enabled' : 'Disabled'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => removePeopleCard(idx)}
                              className="text-slate-400 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Title</label>
                            <input
                              type="text"
                              value={card.title || ''}
                              onChange={(e) => updatePeopleCard(idx, 'title', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Icon</label>
                            <select
                              value={card.icon || 'Users'}
                              onChange={(e) => updatePeopleCard(idx, 'icon', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                            >
                              {availableIcons.map((ic) => (
                                <option key={ic.name} value={ic.name}>{ic.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Description</label>
                            <textarea
                              rows="2"
                              value={card.description || ''}
                              onChange={(e) => updatePeopleCard(idx, 'description', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Feature Card */}
                  <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-4 h-4" /> Add Feature Card
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newPeopleCardTitle}
                        onChange={(e) => setNewPeopleCardTitle(e.target.value)}
                        placeholder="Card Title (e.g. Safety First)"
                        className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <select
                        value={newPeopleCardIcon}
                        onChange={(e) => setNewPeopleCardIcon(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {availableIcons.map((ic) => (
                          <option key={ic.name} value={ic.name}>{ic.label}</option>
                        ))}
                      </select>
                      <textarea
                        rows="2"
                        value={newPeopleCardDesc}
                        onChange={(e) => setNewPeopleCardDesc(e.target.value)}
                        placeholder="Description..."
                        className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addPeopleCard}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Card Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
