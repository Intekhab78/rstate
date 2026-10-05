import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/adminApi';
import defaultProjectData from '../../pages/projectData.jsx';
import { Save, ArrowLeft, Check, LayoutDashboard, Image as ImageIcon, List, Plus, Trash2, GripVertical, Building2, Home, Hammer, MapPin } from 'lucide-react';

function SectionToggle({ checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-950 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-colors group">
      <span className={`text-xs font-semibold ${checked ? 'text-amber-400' : 'text-slate-500'}`}>
        {checked ? 'Section Enabled' : 'Section Disabled'}
      </span>
      <div className="relative inline-flex items-center">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-8 h-4 bg-slate-800 border border-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-500 peer-checked:border-amber-500"></div>
      </div>
    </label>
  );
}

function AdminProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  
  // State for parsed JSON data
  const [data, setData] = useState({
    title: '',
    category: '',
    location: '',
    status: '',
    startingPrice: '₹XX Lakh',
    heroImage: '',
    overview: '',
    stats: [],
    features: [],
    units: [],
    floorPlans: [],
    specifications: [],
    gallery: [],
    construction: {
      started: 'Month Year',
      expectedCompletion: 'Month Year',
      progress: 68,
      stages: []
    },
    locationDetails: {
      title: 'Connected to the city. Designed for modern living.',
      description: '',
      highlights: []
    },
    faqs: []
  });

  const [toggles, setToggles] = useState({
    showHero: true,
    showOverview: true,
    showStats: true,
    showFeatures: true,
    showFloorPlans: true,
    showUnits: true,
    showSpecifications: true,
    showConstruction: true,
    showLocation: true,
    showGallery: true,
    showFaq: true
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      let projectRecord = null;
      let res = await apiFetch(`/projects/${id}`);
      if (res.ok && res.data.success) {
        projectRecord = res.data.data;
      } else {
        res = await apiFetch(`/projects/slug/${id}`);
        if (res.ok && res.data.success) {
          projectRecord = res.data.data;
        }
      }

      if (!projectRecord && (id === 'saffpoll-residences' || !id)) {
        projectRecord = {
          id: 'saffpoll-residences',
          slug: 'saffpoll-residences',
          title: defaultProjectData.name || 'SaffPoll Residences',
          category: defaultProjectData.category || 'Premium Residential',
          location: defaultProjectData.location || 'New Delhi, India',
          description: defaultProjectData.overview || '',
          image_url: defaultProjectData.heroImage || '',
          status: defaultProjectData.status || 'Under Construction',
          details_json: JSON.stringify(defaultProjectData)
        };
      }

      if (projectRecord) {
        setProject(projectRecord);
        let details = {};
        if (projectRecord.details_json) {
          try {
            details = JSON.parse(projectRecord.details_json);
          } catch (e) {}
        }
        
        // Normalize floorPlans
        let rawFp = details.floorPlans || defaultProjectData.floorPlans || {};
        let fpArray = [];
        if (Array.isArray(rawFp)) {
          fpArray = rawFp.map(fp => ({ type: fp.type || fp.name || 'Layout', image: fp.image || fp.image_url || '' }));
        } else if (typeof rawFp === 'object') {
          fpArray = Object.keys(rawFp).map(k => ({ type: k, image: rawFp[k] }));
        }

        // Normalize gallery
        let rawGallery = details.gallery || defaultProjectData.gallery || [];
        let galleryArray = [];
        if (Array.isArray(rawGallery)) {
          galleryArray = rawGallery.map((g, i) => {
            if (typeof g === 'string') return { image: g, title: `Gallery Photo ${i + 1}` };
            return { image: g.image || g.image_url || '', title: g.title || `Gallery Photo ${i + 1}` };
          });
        }

        setData({
          title: projectRecord.title !== undefined ? projectRecord.title : (defaultProjectData.name || ''),
          category: projectRecord.category !== undefined ? projectRecord.category : (defaultProjectData.category || ''),
          location: projectRecord.location !== undefined ? projectRecord.location : (defaultProjectData.location || ''),
          status: projectRecord.status !== undefined ? projectRecord.status : (defaultProjectData.status || ''),
          startingPrice: details.startingPrice !== undefined ? details.startingPrice : (defaultProjectData.startingPrice || ''),
          heroImage: projectRecord.image_url !== undefined ? projectRecord.image_url : (details.heroImage || defaultProjectData.heroImage || ''),
          overview: projectRecord.description !== undefined ? projectRecord.description : (details.overview || defaultProjectData.overview || ''),
          stats: details.stats !== undefined ? details.stats : (defaultProjectData.stats || []),
          features: ((details.features !== undefined ? details.features : defaultProjectData.features) || []).map(f => ({
            title: f.title || '',
            description: f.description || '',
            icon: typeof f.icon === 'string' ? f.icon : (f.icon?.name || 'Check')
          })),
          gallery: galleryArray,
          faqs: details.faqs !== undefined ? details.faqs : (defaultProjectData.faqs || []),
          floorPlans: fpArray,
          units: details.units !== undefined ? details.units : (defaultProjectData.units || []),
          specifications: details.specifications !== undefined ? details.specifications : (defaultProjectData.specifications || []),
          construction: details.construction !== undefined ? details.construction : (defaultProjectData.construction || {
            started: 'Month Year',
            expectedCompletion: 'Month Year',
            progress: 68,
            stages: []
          }),
          locationDetails: details.locationDetails !== undefined ? details.locationDetails : (defaultProjectData.locationDetails || {
            title: 'Connected to the city. Designed for modern living.',
            description: '',
            highlights: []
          })
        });

        if (details.toggles) {
          setToggles(prev => ({ ...prev, ...details.toggles }));
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const fpObj = {};
      (data.floorPlans || []).forEach(fp => {
        if (fp.type) fpObj[fp.type] = fp.image;
      });

      const finalDetails = {
        ...data,
        floorPlans: fpObj,
        toggles
      };
      
      const finalJsonString = JSON.stringify(finalDetails);
      const payload = {
        title: data.title !== undefined ? data.title : '',
        slug: project?.slug || id || 'saffpoll-residences',
        category: data.category !== undefined ? data.category : '',
        location: data.location !== undefined ? data.location : '',
        description: data.overview !== undefined ? data.overview : '',
        image_url: data.heroImage !== undefined ? data.heroImage : '',
        status: data.status !== undefined ? data.status : '',
        details_json: finalJsonString
      };

      const targetId = project?._id || project?.id || id || payload.slug;
      const res = await apiFetch(`/projects/${targetId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      
      if (res.ok && res.data?.success) {
        if (res.data?.data) {
          setProject(res.data.data);
        }
        setMessage('Project content saved successfully! Live page updated.');
      } else {
        setMessage(res.data?.message || 'Saved successfully.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while saving.');
    }
    
    setSaving(false);
  };

  const handleToggleChange = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDataChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Helper functions for array fields
  const addItem = (field, defaultItem) => {
    setData(prev => ({ ...prev, [field]: [...(prev[field] || []), defaultItem] }));
  };

  const updateItem = (field, index, key, value) => {
    setData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const removeItem = (field, index) => {
    setData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  if (loading) return <div className="text-slate-400 p-8 flex justify-center items-center h-full">Loading project data...</div>;
  if (!project) return <div className="text-red-400 p-8">Project not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
        <button 
          onClick={() => navigate('/admin/projects')}
          className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Content Editor: {project.title}</h1>
          <p className="text-sm text-slate-400">User-friendly visual editor for project details</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-amber-500/20"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'content' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <List className="w-4 h-4" /> Main Content
        </button>
        <button
          onClick={() => setActiveTab('toggles')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'toggles' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Enable/Disable Sections
        </button>
      </div>

      {/* Content Editor Tab */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          
          {/* Hero Banner & Basic Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-500" /> Hero Banner & Basic Details
              </h2>
              <SectionToggle 
                checked={toggles.showHero !== false} 
                onChange={() => handleToggleChange('showHero')} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Project Name / Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => handleDataChange('title', e.target.value)}
                  placeholder="e.g. SaffPoll Residences"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={data.category}
                  onChange={(e) => handleDataChange('category', e.target.value)}
                  placeholder="e.g. Premium Residential"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => handleDataChange('location', e.target.value)}
                  placeholder="e.g. New Delhi, India"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Project Status</label>
                <input
                  type="text"
                  value={data.status}
                  onChange={(e) => handleDataChange('status', e.target.value)}
                  placeholder="e.g. Under Construction"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Starting Price Placeholder</label>
                <input
                  type="text"
                  value={data.startingPrice}
                  onChange={(e) => handleDataChange('startingPrice', e.target.value)}
                  placeholder="e.g. ₹XX Lakh"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={data.heroImage}
                  onChange={(e) => handleDataChange('heroImage', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Project Overview Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <List className="w-5 h-5 text-amber-500" /> Project Overview Section
              </h2>
              <SectionToggle 
                checked={toggles.showOverview !== false} 
                onChange={() => handleToggleChange('showOverview')} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Project Overview Description</label>
              <textarea
                value={data.overview}
                onChange={(e) => handleDataChange('overview', e.target.value)}
                placeholder="Describe the project..."
                rows="4"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 resize-y"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white">Project Stats / Highlights</h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showStats !== false} 
                  onChange={() => handleToggleChange('showStats')} 
                />
                <button 
                  onClick={() => addItem('stats', { label: '', value: '' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Stat
                </button>
              </div>
            </div>
            
            {data.stats && data.stats.length === 0 && (
              <p className="text-slate-500 text-sm py-4 text-center">No stats added yet. Click "Add Stat" to create one.</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.stats && data.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3 group relative">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Label (e.g. Total Units)</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateItem('stats', idx, 'label', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Value (e.g. 120+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateItem('stats', idx, 'value', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('stats', idx)}
                    className="text-slate-600 hover:text-red-500 self-start p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white">Features & Amenities</h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showFeatures !== false} 
                  onChange={() => handleToggleChange('showFeatures')} 
                />
                <button 
                  onClick={() => addItem('features', { title: '', description: '', icon: 'Check' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Feature
                </button>
              </div>
            </div>
            
            {data.features && data.features.length === 0 && (
              <p className="text-slate-500 text-sm py-4 text-center">No features added yet.</p>
            )}
            
            <div className="space-y-3">
              {data.features && data.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3 relative">
                  <div className="mt-6 text-slate-600 cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateItem('features', idx, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Description</label>
                      <input
                        type="text"
                        value={feature.description}
                        onChange={(e) => updateItem('features', idx, 'description', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) => updateItem('features', idx, 'icon', e.target.value)}
                        placeholder="e.g. Waves, Dumbbell"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('features', idx)}
                    className="text-slate-600 hover:text-red-500 self-start p-1 transition-colors mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Floor Plans Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white">Floor Plans</h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showFloorPlans !== false} 
                  onChange={() => handleToggleChange('showFloorPlans')} 
                />
                <button 
                  onClick={() => addItem('floorPlans', { type: '2 BHK', name: '', size: '', carpetArea: '', balconyArea: '', totalArea: '', image: '' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Floor Plan
                </button>
              </div>
            </div>
            
            {(!data.floorPlans || data.floorPlans.length === 0) && (
              <p className="text-slate-500 text-sm py-4 text-center">No floor plans added yet.</p>
            )}
            
            <div className="space-y-4">
              {data.floorPlans && data.floorPlans.map((plan, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Type (e.g. 2 BHK)</label>
                        <input
                          type="text"
                          value={plan.type}
                          onChange={(e) => updateItem('floorPlans', idx, 'type', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => updateItem('floorPlans', idx, 'name', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Size Highlight</label>
                        <input
                          type="text"
                          value={plan.size}
                          onChange={(e) => updateItem('floorPlans', idx, 'size', e.target.value)}
                          placeholder="e.g. 1200 Sq.Ft."
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={plan.image}
                          onChange={(e) => updateItem('floorPlans', idx, 'image', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Carpet Area</label>
                        <input
                          type="text"
                          value={plan.carpetArea}
                          onChange={(e) => updateItem('floorPlans', idx, 'carpetArea', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Balcony Area</label>
                        <input
                          type="text"
                          value={plan.balconyArea}
                          onChange={(e) => updateItem('floorPlans', idx, 'balconyArea', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Total Area</label>
                        <input
                          type="text"
                          value={plan.totalArea}
                          onChange={(e) => updateItem('floorPlans', idx, 'totalArea', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('floorPlans', idx)}
                    className="text-slate-600 hover:text-red-500 self-start p-1 transition-colors mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Units Configuration Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-500" /> Unit Configurations (2/3/4 BHK)
              </h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showUnits !== false} 
                  onChange={() => handleToggleChange('showUnits')} 
                />
                <button 
                  onClick={() => addItem('units', { type: '2 BHK', area: '1,100 sq.ft.', price: '₹XX Lakh', description: 'Practical modern layout.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Unit
                </button>
              </div>
            </div>
            
            {(!data.units || data.units.length === 0) && (
              <p className="text-slate-500 text-sm py-4 text-center">No units configured yet.</p>
            )}
            
            <div className="space-y-4">
              {data.units && data.units.map((unit, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Type (e.g. 2 BHK)</label>
                        <input
                          type="text"
                          value={unit.type}
                          onChange={(e) => updateItem('units', idx, 'type', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Approx. Area</label>
                        <input
                          type="text"
                          value={unit.area}
                          onChange={(e) => updateItem('units', idx, 'area', e.target.value)}
                          placeholder="e.g. 1,100 sq.ft."
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Starting Price</label>
                        <input
                          type="text"
                          value={unit.price}
                          onChange={(e) => updateItem('units', idx, 'price', e.target.value)}
                          placeholder="e.g. ₹XX Lakh"
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={unit.image}
                          onChange={(e) => updateItem('units', idx, 'image', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Description</label>
                        <input
                          type="text"
                          value={unit.description}
                          onChange={(e) => updateItem('units', idx, 'description', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('units', idx)}
                    className="text-slate-600 hover:text-red-500 self-start p-1 transition-colors mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" /> Specifications
              </h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showSpecifications !== false} 
                  onChange={() => handleToggleChange('showSpecifications')} 
                />
                <button 
                  onClick={() => addItem('specifications', { label: '', value: '' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Specification
                </button>
              </div>
            </div>
            
            {(!data.specifications || data.specifications.length === 0) && (
              <p className="text-slate-500 text-sm py-4 text-center">No specifications added yet.</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.specifications && data.specifications.map((spec, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex gap-2 items-center">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => updateItem('specifications', idx, 'label', e.target.value)}
                    placeholder="Label (e.g. Structure)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-300 focus:border-amber-500 outline-none"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateItem('specifications', idx, 'value', e.target.value)}
                    placeholder="Value (e.g. RCC Framed Structure)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:border-amber-500 outline-none font-semibold"
                  />
                  <button 
                    onClick={() => removeItem('specifications', idx)}
                    className="text-slate-600 hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Construction Progress Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Hammer className="w-5 h-5 text-amber-500" /> Construction Progress & Timeline
              </h2>
              <SectionToggle 
                checked={toggles.showConstruction !== false} 
                onChange={() => handleToggleChange('showConstruction')} 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Progress Percentage (0 - 100)</label>
                <input
                  type="number"
                  value={data.construction?.progress || 0}
                  onChange={(e) => handleDataChange('construction', { ...data.construction, progress: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Construction Started</label>
                <input
                  type="text"
                  value={data.construction?.started || ''}
                  onChange={(e) => handleDataChange('construction', { ...data.construction, started: e.target.value })}
                  placeholder="e.g. Jan 2024"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Expected Completion</label>
                <input
                  type="text"
                  value={data.construction?.expectedCompletion || ''}
                  onChange={(e) => handleDataChange('construction', { ...data.construction, expectedCompletion: e.target.value })}
                  placeholder="e.g. Q4 2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-300">Construction Stages</span>
                <button 
                  onClick={() => {
                    const newStages = [...(data.construction?.stages || []), { title: 'New Stage', status: 'Upcoming' }];
                    handleDataChange('construction', { ...data.construction, stages: newStages });
                  }}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1 rounded flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Stage
                </button>
              </div>

              <div className="space-y-2">
                {data.construction?.stages?.map((stage, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex items-center gap-3">
                    <input
                      type="text"
                      value={stage.title}
                      onChange={(e) => {
                        const newStages = [...data.construction.stages];
                        newStages[sIdx].title = e.target.value;
                        handleDataChange('construction', { ...data.construction, stages: newStages });
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1 text-sm text-white focus:border-amber-500 outline-none"
                    />
                    <select
                      value={stage.status}
                      onChange={(e) => {
                        const newStages = [...data.construction.stages];
                        newStages[sIdx].status = e.target.value;
                        handleDataChange('construction', { ...data.construction, stages: newStages });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xs text-amber-400 focus:border-amber-500 outline-none"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                    <button 
                      onClick={() => {
                        const newStages = [...data.construction.stages];
                        newStages.splice(sIdx, 1);
                        handleDataChange('construction', { ...data.construction, stages: newStages });
                      }}
                      className="text-slate-600 hover:text-red-500 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Details Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" /> Location Details & Highlights
              </h2>
              <SectionToggle 
                checked={toggles.showLocation !== false} 
                onChange={() => handleToggleChange('showLocation')} 
              />
            </div>
            
            <div>
              <label className="block text-xs text-slate-400 mb-1">Location Section Headline</label>
              <input
                type="text"
                value={data.locationDetails?.title || ''}
                onChange={(e) => handleDataChange('locationDetails', { ...data.locationDetails, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Location Section Description</label>
              <textarea
                value={data.locationDetails?.description || ''}
                onChange={(e) => handleDataChange('locationDetails', { ...data.locationDetails, description: e.target.value })}
                rows="3"
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none resize-y"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Key Connectivity / Location Highlights</span>
                <button 
                  onClick={() => {
                    const newHl = [...(data.locationDetails?.highlights || []), ''];
                    handleDataChange('locationDetails', { ...data.locationDetails, highlights: newHl });
                  }}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1 rounded flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Highlight
                </button>
              </div>

              <div className="space-y-2">
                {data.locationDetails?.highlights?.map((hl, hIdx) => (
                  <div key={hIdx} className="flex gap-2">
                    <input
                      type="text"
                      value={hl}
                      onChange={(e) => {
                        const newHl = [...data.locationDetails.highlights];
                        newHl[hIdx] = e.target.value;
                        handleDataChange('locationDetails', { ...data.locationDetails, highlights: newHl });
                      }}
                      placeholder="e.g. Major Road Connectivity"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                    <button 
                      onClick={() => {
                        const newHl = [...data.locationDetails.highlights];
                        newHl.splice(hIdx, 1);
                        handleDataChange('locationDetails', { ...data.locationDetails, highlights: newHl });
                      }}
                      className="bg-red-500/10 text-red-500 px-3 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white">Project Gallery (Images)</h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showGallery !== false} 
                  onChange={() => handleToggleChange('showGallery')} 
                />
                <button 
                  onClick={() => addItem('gallery', '')}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add Image URL
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.gallery && data.gallery.map((imgUrl, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={typeof imgUrl === 'string' ? imgUrl : (imgUrl?.image || '')}
                    onChange={(e) => {
                      const newArr = [...data.gallery];
                      newArr[idx] = e.target.value;
                      handleDataChange('gallery', newArr);
                    }}
                    placeholder="https://..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                  />
                  <button onClick={() => {
                    const newArr = [...data.gallery];
                    newArr.splice(idx, 1);
                    handleDataChange('gallery', newArr);
                  }} className="bg-red-500/10 text-red-500 px-3 rounded hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white">FAQs</h2>
              <div className="flex items-center gap-3">
                <SectionToggle 
                  checked={toggles.showFaq !== false} 
                  onChange={() => handleToggleChange('showFaq')} 
                />
                <button 
                  onClick={() => addItem('faqs', { question: '', answer: '' })}
                  className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-semibold"
                >
                  <Plus className="w-3 h-3" /> Add FAQ
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {data.faqs && data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3 relative">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateItem('faqs', idx, 'question', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateItem('faqs', idx, 'answer', e.target.value)}
                        rows="3"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none resize-y"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('faqs', idx)}
                    className="text-slate-600 hover:text-red-500 self-start p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}

      {/* Toggles Tab */}
      {activeTab === 'toggles' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Enable / Disable Page Sections</h2>
              <p className="text-sm text-slate-400 mb-6">
                Use these toggles to hide or show entire sections on the live public website for this specific project.
                You can also toggle sections directly inside each section header in the Main Content tab.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'showHero', label: 'Hero Banner & Basic Details' },
                { key: 'showOverview', label: 'Project Overview Section' },
                { key: 'showStats', label: 'Stats & Highlights' },
                { key: 'showFeatures', label: 'Features & Amenities' },
                { key: 'showFloorPlans', label: 'Floor Plans' },
                { key: 'showUnits', label: 'Unit Configurations (2/3/4 BHK)' },
                { key: 'showSpecifications', label: 'Specifications' },
                { key: 'showConstruction', label: 'Construction Progress' },
                { key: 'showLocation', label: 'Location & Highlights' },
                { key: 'showGallery', label: 'Project Gallery' },
                { key: 'showFaq', label: 'FAQs' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg shadow-sm">
                  <span className="text-sm font-medium text-slate-200">
                    {label}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={toggles[key] !== false}
                      onChange={() => handleToggleChange(key)}
                    />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-amber-500/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjectEditor;
