import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { AlertCircle, Zap, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AIAlerts = () => {
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [surplusAlerts, setSurplusAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const [expiryRes, surplusRes] = await Promise.all([
        api.get('/ai/expiry-alerts'),
        api.get('/ai/surplus')
      ]);
      setExpiryAlerts(expiryRes.data);
      setSurplusAlerts(surplusRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alerts-page">
      <header className="page-header">
        <div>
          <h1>AI Insights & Alerts</h1>
          <p>Predictive analysis to minimize food waste</p>
        </div>
        <div className="ai-badge">
          <Sparkles size={16} />
          <span>AI Engine Active</span>
        </div>
      </header>

      <div className="alerts-grid">
        <section className="alert-section">
          <div className="section-title">
            <Clock className="text-warning" />
            <h2>Expiring Soon</h2>
          </div>
          <div className="alerts-container">
            {expiryAlerts.length === 0 && !loading && <p className="empty-state">No immediate expiry threats detected.</p>}
            {expiryAlerts.map((alert, idx) => (
              <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="alert-card warning glass-card"
              >
                <div className="alert-info">
                  <h3>{alert.itemName}</h3>
                  <p>{alert.message}</p>
                </div>
                <div className="priority-badge high">High Priority</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="alert-section">
          <div className="section-title">
            <Zap className="text-primary" />
            <h2>Surplus Detected</h2>
          </div>
          <div className="alerts-container">
            {surplusAlerts.length === 0 && !loading && <p className="empty-state">Inventory levels are optimal.</p>}
            {surplusAlerts.map((alert, idx) => (
              <motion.div 
                key={idx}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="alert-card surplus glass-card"
              >
                <div className="alert-info">
                  <h3>{alert.itemName}</h3>
                  <p>{alert.message}</p>
                </div>
                <div className="priority-badge info">Surplus</div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <section className="prediction-insights glass-card">
        <div className="insight-header">
          <TrendingUp />
          <h2>Demand Prediction Model</h2>
        </div>
        <div className="insight-content">
          <div className="insight-item">
            <div className="insight-value">92%</div>
            <div className="insight-label">Prediction Accuracy</div>
          </div>
          <div className="insight-item">
            <div className="insight-value">-15%</div>
            <div className="insight-label">Waste Reduction this month</div>
          </div>
          <div className="insight-item">
            <div className="insight-value">24</div>
            <div className="insight-label">Donations Facilitated</div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .alerts-page {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .ai-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2));
          color: var(--accent);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--accent);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .alerts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .text-warning { color: var(--warning); }
        .text-primary { color: var(--primary); }

        .alerts-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .alert-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          border-left: 4px solid transparent;
        }

        .alert-card.warning { border-left-color: var(--warning); }
        .alert-card.surplus { border-left-color: var(--primary); }

        .alert-info h3 { font-size: 1.125rem; margin-bottom: 0.25rem; }
        .alert-info p { font-size: 0.875rem; color: var(--text-muted); }

        .priority-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .priority-badge.high { background: rgba(239, 68, 68, 0.1); color: var(--error); }
        .priority-badge.info { background: rgba(99, 102, 241, 0.1); color: var(--primary); }

        .prediction-insights {
          padding: 2.5rem;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .insight-content {
          display: flex;
          justify-content: space-around;
          text-align: center;
        }

        .insight-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }

        .insight-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .empty-state {
          color: var(--text-muted);
          padding: 2rem;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }

        @media (max-width: 1024px) {
          .alerts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AIAlerts;
