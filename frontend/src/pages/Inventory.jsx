import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Search, Trash2, Edit2, PackageOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '', category: '', expiryDate: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/food-items');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentItem.id) {
        await api.put(`/food-items/${currentItem.id}`, currentItem);
      } else {
        await api.post('/food-items', currentItem);
      }
      setShowModal(false);
      fetchItems();
      setCurrentItem({ name: '', quantity: '', category: '', expiryDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/food-items/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="inventory-page">
      <header className="page-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Track and manage your food stock efficiently</p>
        </div>
        <button onClick={() => { setCurrentItem({ name: '', quantity: '', category: '', expiryDate: '' }); setShowModal(true); }} className="btn btn-primary">
          <Plus size={18} /> Add New Item
        </button>
      </header>

      <div className="search-bar glass-card">
        <Search size={20} className="search-icon" />
        <input type="text" placeholder="Search inventory..." className="search-input" />
      </div>

      <div className="inventory-grid">
        {loading ? (
          <p>Loading inventory...</p>
        ) : (
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card item-card"
              >
                <div className="item-header">
                  <PackageOpen className="item-icon" />
                  <span className="item-category">{item.category}</span>
                </div>
                <h3 className="item-name">{item.name}</h3>
                <div className="item-details">
                  <div className="detail">
                    <span className="label">Quantity</span>
                    <span className="value">{item.quantity} units</span>
                  </div>
                  <div className="detail">
                    <span className="label">Expiry</span>
                    <span className="value">{new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => { setCurrentItem(item); setShowModal(true); }} className="action-btn edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content glass-card"
          >
            <h2>{currentItem.id ? 'Edit Item' : 'New Food Item'}</h2>
            <form onSubmit={handleSave} className="modal-form">
              <input
                type="text"
                placeholder="Item Name"
                className="input-field"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input-field"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="input-field"
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                  required
                />
              </div>
              <input
                type="date"
                className="input-field"
                value={currentItem.expiryDate}
                onChange={(e) => setCurrentItem({ ...currentItem, expiryDate: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Item</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 { font-size: 2rem; }
        .page-header p { color: var(--text-muted); }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem !important;
          margin-bottom: 2rem;
        }

        .search-input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
        }

        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .item-card {
          padding: 1.25rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .item-icon { color: var(--primary); }
        .item-category { 
          font-size: 0.75rem; 
          background: rgba(99, 102, 241, 0.1); 
          color: var(--primary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .item-name { margin-bottom: 1rem; }

        .item-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .detail {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .detail .label { color: var(--text-muted); }

        .item-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.edit:hover { background: var(--primary); color: white; border-color: var(--primary); }
        .action-btn.delete:hover { background: var(--error); color: white; border-color: var(--error); }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 2.5rem;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Inventory;
