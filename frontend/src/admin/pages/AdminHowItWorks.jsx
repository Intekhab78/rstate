import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/adminApi';
import {
  ListOrdered,
  Save,
  Plus,
  Trash2,
  Check,
  Edit3,
  Search,
  ClipboardList,
  Wrench,
  CircleCheck,
  HardHat,
  Building2,
  Ruler,
  Shield,
  Layers,
  CheckCircle2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const availableIcons = [
  { name: 'Search', label: 'Search / Assessment' },
  { name: 'ClipboardList', label: 'Clipboard / Planning' },
  { name: 'Wrench', label: 'Wrench / Construction' },
  { name: 'CircleCheck', label: 'Circle Check / Approval' },
  { name: 'HardHat', label: 'Hard Hat / Safety' },
  { name: 'Building2', label: 'Building' },
  { name: 'Ruler', label: 'Ruler / Architecture' },
  { name: 'Shield', label: 'Shield / Security' },
  { name: 'Layers', label: 'Layers / Development' },
  { name: 'CheckCircle2', label: 'Check Circle' }
];

function AdminHowItWorks() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Section level fields
  const [title, setTitle] = useState('How Saffpoll Works');
  const [subtitle, setSubtitle] = useState(
    "From initial assessment to final handover, here's exactly how we plan, develop, and deliver every project."
  );
  const [bottomText, setBottomText] = useState(
    'We understand land development, follow approvals, deliver quality roads & infrastructure, and remain reliable throughout the process.'
  );
  const [bottomSubtext, setBottomSubtext] = useState(
    "We're with you at every step, ensuring transparency and quality."
  );

  // Steps list
  const [steps, setSteps] = useState([]);

  // New Step form state
  const [newStepNumber, setNewStepNumber] = useState('');
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepIcon, setNewStepIcon] = useState('Search');
  const [newStepDesc, setNewStepDesc] = useState('');
  const [newStepPointsText, setNewStepPointsText] = useState('');

  const fetchHowItWorksData = async () => {
    setLoading(true);
    const res = await apiFetch('/how-it-works');
    if (res.ok && res.data.success && res.data.data) {
      const d = res.data.data;
      setTitle(d.title || 'How Saffpoll Works');
      setSubtitle(d.subtitle || '');
      setBottomText(d.bottom_text || '');
      setBottomSubtext(d.bottom_subtext || '');
      setSteps(d.steps || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHowItWorksData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const res = await apiFetch('/how-it-works', {
      method: 'PUT',
      body: JSON.stringify({
        title,
        subtitle,
        bottom_text: bottomText,
        bottom_subtext: bottomSubtext,
        steps
      })
    });

    if (res.ok && res.data.success) {
      setMessage('"How It Works" section updated successfully! Changes are live on the website.');
    } else {
      setMessage(res.data.message || 'Failed to update section.');
    }
    setSaving(false);
  };

  const addStep = () => {
    if (!newStepTitle.trim()) return;
    const computedNumber =
      newStepNumber.trim() || String(steps.length + 1).padStart(2, '0');

    const pointsArray = newStepPointsText
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    setSteps([
      ...steps,
      {
        number: computedNumber,
        title: newStepTitle.trim(),
        icon: newStepIcon,
        description: newStepDesc.trim(),
        points: pointsArray
      }
    ]);

    setNewStepNumber('');
    setNewStepTitle('');
    setNewStepDesc('');
    setNewStepPointsText('');
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index, field, val) => {
    const copy = [...steps];
    copy[index] = { ...copy[index], [field]: val };
    setSteps(copy);
  };

  const updateStepPointsText = (index, rawText) => {
    const pointsArray = rawText
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    updateStep(index, 'points', pointsArray);
  };

  const moveStep = (index, direction) => {
    if (
      (direction === -1 && index === 0) ||
      (direction === 1 && index === steps.length - 1)
    ) {
      return;
    }
    const copy = [...steps];
    const temp = copy[index];
    copy[index] = copy[index + direction];
    copy[index + direction] = temp;
    setSteps(copy);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ListOrdered className="w-6 h-6 text-amber-400" />
            <span>"How It Works" Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Manage section titles, step cards, icons, descriptions, bullet points, and bottom statements.
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
          {/* SECTION 1: HEADER & STATEMENT */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Edit3 className="w-5 h-5 text-amber-400" />
              <span>1. Section Text & Bottom Statement</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Main Section Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How Saffpoll Works"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subtitle / Intro Paragraph
                </label>
                <textarea
                  rows="2"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Intro description..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Bottom Statement (Bold Text)
                </label>
                <textarea
                  rows="2"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Bottom summary statement..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Bottom Subtext
                </label>
                <textarea
                  rows="2"
                  value={bottomSubtext}
                  onChange={(e) => setBottomSubtext(e.target.value)}
                  placeholder="Bottom subtext..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: STEPS LIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-amber-400" />
                <span>2. Process Steps ({steps.length})</span>
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 relative group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Step #{idx + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveStep(idx, -1)}
                        disabled={idx === 0}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveStep(idx, 1)}
                        disabled={idx === steps.length - 1}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeStep(idx)}
                        className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors ml-1"
                        title="Delete Step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Step Badge (e.g. 01)
                        </label>
                        <input
                          type="text"
                          value={step.number || ''}
                          onChange={(e) => updateStep(idx, 'number', e.target.value)}
                          placeholder="01"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Step Title
                        </label>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => updateStep(idx, 'title', e.target.value)}
                          placeholder="Step Title"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Icon
                      </label>
                      <select
                        value={step.icon || 'Search'}
                        onChange={(e) => updateStep(idx, 'icon', e.target.value)}
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
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        value={step.description || ''}
                        onChange={(e) => updateStep(idx, 'description', e.target.value)}
                        placeholder="Detailed step description..."
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Bullet Points (One item per line)
                      </label>
                      <textarea
                        rows="4"
                        value={Array.isArray(step.points) ? step.points.join('\n') : ''}
                        onChange={(e) => updateStepPointsText(idx, e.target.value)}
                        placeholder="Bullet point 1&#10;Bullet point 2&#10;Bullet point 3"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Step Form */}
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add New Process Step
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newStepNumber}
                  onChange={(e) => setNewStepNumber(e.target.value)}
                  placeholder="Step Number (e.g. 05)"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <input
                  type="text"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  placeholder="Step Title (e.g. Environmental Clearance)"
                  className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <select
                  value={newStepIcon}
                  onChange={(e) => setNewStepIcon(e.target.value)}
                  className="sm:col-span-3 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic.name} value={ic.name}>
                      Icon: {ic.label}
                    </option>
                  ))}
                </select>
                <textarea
                  rows="2"
                  value={newStepDesc}
                  onChange={(e) => setNewStepDesc(e.target.value)}
                  placeholder="Step description..."
                  className="sm:col-span-3 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <textarea
                  rows="3"
                  value={newStepPointsText}
                  onChange={(e) => setNewStepPointsText(e.target.value)}
                  placeholder="Bullet points (one per line)..."
                  className="sm:col-span-3 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="button"
                onClick={addStep}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHowItWorks;
