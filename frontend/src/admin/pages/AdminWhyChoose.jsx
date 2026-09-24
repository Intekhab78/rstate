import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  Award,
  Clock3,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
  Save,
  Plus,
  Trash2,
  Check,
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Layers,
  BarChart2,
  Sparkles
} from 'lucide-react';

const availableIcons = [
  { name: 'Award', label: 'Award / Excellence' },
  { name: 'ShieldCheck', label: 'Shield Check / Quality' },
  { name: 'Handshake', label: 'Handshake / Relationships' },
  { name: 'Users', label: 'Users / Teamwork' },
  { name: 'Clock3', label: 'Clock / Timely Delivery' },
  { name: 'Leaf', label: 'Leaf / Sustainability' },
  { name: 'MapPin', label: 'Map Pin / Location' }
];

function AdminWhyChoose() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Section Header
  const [tag, setTag] = useState('Why Saffpoll');
  const [title, setTitle] = useState('Why Choose Saffpoll');
  const [description, setDescription] = useState(
    'Experience, quality, transparency and a commitment to delivering construction projects that create lasting value.'
  );

  // Arrays
  const [cards, setCards] = useState([]);
  const [stats, setStats] = useState([]);
  const [bottomValues, setBottomValues] = useState([]);

  // New Card Form State
  const [newCardTag, setNewCardTag] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [newCardImg, setNewCardImg] = useState('');
  const [newCardIcon, setNewCardIcon] = useState('ShieldCheck');

  // New Bottom Value Form State
  const [newValueTitle, setNewValueTitle] = useState('');
  const [newValueDesc, setNewValueDesc] = useState('');
  const [newValueIcon, setNewValueIcon] = useState('Award');

  const fetchData = async () => {
    setLoading(true);
    const res = await apiFetch('/why-choose');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      setTag(d.tag || 'Why Saffpoll');
      setTitle(d.title || 'Why Choose Saffpoll');
      setDescription(d.description || '');
      setCards(d.cards || []);
      setStats(d.stats || []);
      setBottomValues(d.bottom_values || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/why-choose', {
      method: 'PUT',
      body: JSON.stringify({
        tag,
        title,
        description,
        cards,
        stats,
        bottom_values: bottomValues
      })
    });

    if (res.ok && res.data.success) {
      setMessage('"Why Choose Saffpoll" section updated successfully! Changes are live on the website.');
    } else {
      setMessage(res.data.message || 'Failed to update section.');
    }
    setSaving(false);
  };

  // Card Handlers
  const toggleCardEnabled = (index) => {
    const copy = [...cards];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setCards(copy);
  };

  const updateCard = (index, field, val) => {
    const copy = [...cards];
    copy[index] = { ...copy[index], [field]: val };
    setCards(copy);
  };

  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const addCard = () => {
    if (!newCardTitle.trim()) return;
    setCards([
      ...cards,
      {
        id: `card_${Date.now()}`,
        enabled: true,
        tag: newCardTag.trim() || 'Feature',
        title: newCardTitle.trim(),
        description: newCardDesc.trim(),
        image_url: newCardImg.trim(),
        icon: newCardIcon
      }
    ]);
    setNewCardTag('');
    setNewCardTitle('');
    setNewCardDesc('');
    setNewCardImg('');
  };

  // Stat Handlers
  const toggleStatEnabled = (index) => {
    const copy = [...stats];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setStats(copy);
  };

  const updateStat = (index, field, val) => {
    const copy = [...stats];
    copy[index] = { ...copy[index], [field]: val };
    setStats(copy);
  };

  const updateStatBulletsText = (index, rawText) => {
    const bullets = rawText
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    updateStat(index, 'bullets', bullets);
  };

  // Bottom Value Handlers
  const toggleBottomValueEnabled = (index) => {
    const copy = [...bottomValues];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setBottomValues(copy);
  };

  const updateBottomValue = (index, field, val) => {
    const copy = [...bottomValues];
    copy[index] = { ...copy[index], [field]: val };
    setBottomValues(copy);
  };

  const removeBottomValue = (index) => {
    setBottomValues(bottomValues.filter((_, i) => i !== index));
  };

  const addBottomValue = () => {
    if (!newValueTitle.trim()) return;
    setBottomValues([
      ...bottomValues,
      {
        id: `val_${Date.now()}`,
        enabled: true,
        icon: newValueIcon,
        title: newValueTitle.trim(),
        description: newValueDesc.trim()
      }
    ]);
    setNewValueTitle('');
    setNewValueDesc('');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span>"Why Choose Saffpoll" Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Edit text, add/delete items, and toggle <strong>Enable/Disable</strong> visibility for cards, stats, and values.
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

          {/* SECTION 1: HEADER TEXT */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Edit3 className="w-5 h-5 text-amber-400" />
              <span>1. Section Main Heading Text</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Top Small Tag / Badge
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Why Saffpoll"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Main Section Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Why Choose Saffpoll"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Section Intro Description
                </label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Intro description..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: FEATURE CARDS MANAGER */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>2. Feature & Image Cards ({cards.length})</span>
              </h2>
              <span className="text-xs text-slate-400">
                Use the toggle switch to <strong>Enable/Disable (Show/Hide)</strong> any card
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, idx) => {
                const isEnabled = card.enabled !== false;
                return (
                  <div
                    key={card.id || idx}
                    className={`border rounded-xl p-5 space-y-4 relative transition-all ${
                      isEnabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Card #{idx + 1}
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          ({card.type || 'Standard Card'})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Enable / Disable Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => toggleCardEnabled(idx)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                          title={isEnabled ? 'Click to Disable (Hide)' : 'Click to Enable (Show)'}
                        >
                          {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeCard(idx)}
                          className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Delete Card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Card Tag / Category
                          </label>
                          <input
                            type="text"
                            value={card.tag || ''}
                            onChange={(e) => updateCard(idx, 'tag', e.target.value)}
                            placeholder="Tag"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Icon (Optional)
                          </label>
                          <select
                            value={card.icon || ''}
                            onChange={(e) => updateCard(idx, 'icon', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="">No Icon</option>
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
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateCard(idx, 'title', e.target.value)}
                          placeholder="Title"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {card.description !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Description
                          </label>
                          <textarea
                            rows="3"
                            value={card.description || ''}
                            onChange={(e) => updateCard(idx, 'description', e.target.value)}
                            placeholder="Description..."
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      )}

                      {card.image_url !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={card.image_url || ''}
                            onChange={(e) => updateCard(idx, 'image_url', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Card */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Feature Card
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newCardTag}
                  onChange={(e) => setNewCardTag(e.target.value)}
                  placeholder="Card Tag (e.g. Safety)"
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
                <input
                  type="text"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  placeholder="Card Title (e.g. Rigorous Safety Protocols)"
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <textarea
                  rows="2"
                  value={newCardDesc}
                  onChange={(e) => setNewCardDesc(e.target.value)}
                  placeholder="Card description..."
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  value={newCardImg}
                  onChange={(e) => setNewCardImg(e.target.value)}
                  placeholder="Image URL (optional)"
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
              <button
                type="button"
                onClick={addCard}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature Card</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: STAT CARDS MANAGER */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-400" />
                <span>3. Stat Counter Cards ({stats.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, idx) => {
                const isEnabled = stat.enabled !== false;
                return (
                  <div
                    key={stat.id || idx}
                    className={`border rounded-xl p-5 space-y-4 transition-all ${
                      isEnabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Stat #{idx + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleStatEnabled(idx)}
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
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Number / Stat
                          </label>
                          <input
                            type="text"
                            value={stat.stat || ''}
                            onChange={(e) => updateStat(idx, 'stat', e.target.value)}
                            placeholder="e.g. 20+"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Unit / Label
                          </label>
                          <input
                            type="text"
                            value={stat.unit || ''}
                            onChange={(e) => updateStat(idx, 'unit', e.target.value)}
                            placeholder="e.g. Years"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {stat.subtext !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Subtext
                          </label>
                          <input
                            type="text"
                            value={stat.subtext || ''}
                            onChange={(e) => updateStat(idx, 'subtext', e.target.value)}
                            placeholder="e.g. Building since 1998"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      )}

                      {stat.bullets !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Bullets (One per line)
                          </label>
                          <textarea
                            rows="3"
                            value={Array.isArray(stat.bullets) ? stat.bullets.join('\n') : ''}
                            onChange={(e) => updateStatBulletsText(idx, e.target.value)}
                            placeholder="Bullet 1&#10;Bullet 2"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: BOTTOM VALUES (GRID OF 4) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>4. Bottom Feature Values ({bottomValues.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bottomValues.map((val, idx) => {
                const isEnabled = val.enabled !== false;
                return (
                  <div
                    key={val.id || idx}
                    className={`border rounded-xl p-4 space-y-3 transition-all ${
                      isEnabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">Value #{idx + 1}</span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleBottomValueEnabled(idx)}
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
                          onClick={() => removeBottomValue(idx)}
                          className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Delete Value"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={val.title || ''}
                            onChange={(e) => updateBottomValue(idx, 'title', e.target.value)}
                            placeholder="Title"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Icon</label>
                          <select
                            value={val.icon || 'Award'}
                            onChange={(e) => updateBottomValue(idx, 'icon', e.target.value)}
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
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={val.description || ''}
                          onChange={(e) => updateBottomValue(idx, 'description', e.target.value)}
                          placeholder="Description"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Bottom Value */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Bottom Feature Value
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newValueTitle}
                  onChange={(e) => setNewValueTitle(e.target.value)}
                  placeholder="Value Title (e.g. Transparent Pricing)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <select
                  value={newValueIcon}
                  onChange={(e) => setNewValueIcon(e.target.value)}
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
                  value={newValueDesc}
                  onChange={(e) => setNewValueDesc(e.target.value)}
                  placeholder="Short value description..."
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="button"
                onClick={addBottomValue}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bottom Value Record</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default AdminWhyChoose;
