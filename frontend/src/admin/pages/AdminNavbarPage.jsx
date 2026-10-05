import React, { useState, useEffect } from 'react';
import { apiFetch } from '../utils/adminApi';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Settings } from 'lucide-react';

function AdminNavbarPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/navbar');
      if (data && data.items && data.items.length > 0) {
        setItems(data.items);
      } else {
        // Apply defaults if database is empty
        setItems([
          { name: "Home", href: "/", type: "link" },
          { name: "About", href: "/about", type: "link" },
          { name: "Projects", href: "/project", type: "dynamic_projects" },
          { name: "Services", href: "/services", type: "link" },
          { name: "Contact", href: "/contactUs", type: "link" }
        ]);
      }
    } catch (error) {
      console.error('Error fetching navbar settings:', error);
      // Fallback
      setItems([
        { name: "Home", href: "/", type: "link" },
        { name: "About", href: "/about", type: "link" },
        { name: "Projects", href: "/project", type: "dynamic_projects" },
        { name: "Services", href: "/services", type: "link" },
        { name: "Contact", href: "/contactUs", type: "link" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiFetch('/navbar', {
        method: 'PUT',
        body: JSON.stringify({ items })
      });
      alert('Navbar settings saved successfully!');
    } catch (error) {
      alert('Failed to save navbar settings.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    setItems([...items, { name: 'New Link', href: '/', type: 'link', dropdown: [] }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addDropdownItem = (itemIndex) => {
    const newItems = [...items];
    if (!newItems[itemIndex].dropdown) newItems[itemIndex].dropdown = [];
    newItems[itemIndex].dropdown.push({ name: 'New Sublink', href: '/' });
    setItems(newItems);
  };

  const removeDropdownItem = (itemIndex, dropIndex) => {
    const newItems = [...items];
    newItems[itemIndex].dropdown.splice(dropIndex, 1);
    setItems(newItems);
  };

  const updateDropdownItem = (itemIndex, dropIndex, field, value) => {
    const newItems = [...items];
    newItems[itemIndex].dropdown[dropIndex][field] = value;
    setItems(newItems);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            Navbar Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your main navigation links and dropdown menus.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Menu Items</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Menu Link
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-slate-700 bg-slate-800/50 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">URL / Path</label>
                    <input
                      type="text"
                      value={item.href || ''}
                      onChange={(e) => updateItem(index, 'href', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Menu Type</label>
                    <select
                      value={item.type || 'link'}
                      onChange={(e) => updateItem(index, 'type', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 outline-none appearance-none"
                    >
                      <option value="link">Standard Link</option>
                      <option value="dropdown">Custom Dropdown</option>
                      <option value="dynamic_projects">Dynamic Projects List</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-5"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Render Dropdown Manager if type is 'dropdown' */}
              {item.type === 'dropdown' && (
                <div className="mt-4 pl-4 border-l-2 border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Dropdown Sub-links</h3>
                    <button
                      onClick={() => addDropdownItem(index)}
                      className="text-xs text-amber-400 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Sub-link
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {(item.dropdown || []).map((dropItem, dIndex) => (
                      <div key={dIndex} className="flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Sub-link Name"
                            value={dropItem.name}
                            onChange={(e) => updateDropdownItem(index, dIndex, 'name', e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
                          />
                          <input
                            type="text"
                            placeholder="URL Path"
                            value={dropItem.href}
                            onChange={(e) => updateDropdownItem(index, dIndex, 'href', e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
                          />
                        </div>
                        <button
                          onClick={() => removeDropdownItem(index, dIndex)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(!item.dropdown || item.dropdown.length === 0) && (
                      <p className="text-xs text-slate-500">No sub-links added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {item.type === 'dynamic_projects' && (
                <div className="mt-3 text-xs text-amber-500/80 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                  <span className="font-semibold text-amber-400">Note:</span> This dropdown will automatically populate with active projects from your database on the live site.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNavbarPage;
