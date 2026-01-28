import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Heart, MapPin, Phone, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Donation = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      const { data } = await api.get('/donations/centers');
      setCenters(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-page">
      <header className="page-header">
        <div>
          <h1>Donation Network</h1>
          <p>Connect with local centers to redirect surplus food</p>
        </div>
        <button className="btn btn-primary">
          <Share2 size={18} /> Register as Center
        </button>
      </header>

      <div className="centers-grid">
        {centers.length === 0 && !loading && <p>No centers found in your area.</p>}
        {centers.map((center, idx) => (
          <motion.div 
            key={center.id}
            whileHover={{ scale: 1.02 }}
            className="glass-card center-card"
          >
            <div className="center-header">
              <div className="center-avatar">
                <Heart size={24} />
              </div>
              <div className="center-status">Active</div>
            </div>
            <h3>{center.name}</h3>
            <div className="center-info">
              <div className="info-item">
                <MapPin size={16} />
                <span>{center.address}</span>
              </div>
              <div className="info-item">
                <Phone size={16} />
                <span>{center.contactNumber}</span>
              </div>
            </div>
            <button className="btn btn-outline w-full">
              Donate Surpus <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .centers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .center-card {
          padding: 2rem;
        }

        .center-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .center-avatar {
          background: rgba(236, 72, 153, 0.1);
          color: var(--secondary);
          padding: 1rem;
          border-radius: 50%;
        }

        .center-status {
          font-size: 0.75rem;
          color: var(--success);
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-weight: 700;
        }

        .center-card h3 { margin-bottom: 1rem; font-size: 1.25rem; }

        .center-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          justify-content: center;
        }

        .btn-outline:hover {
          background: var(--primary);
          color: white;
        }

        .w-full { width: 100%; }
      `}</style>
    </div>
  );
};

export default Donation;
