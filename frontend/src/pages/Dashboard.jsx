import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  TrendingDown, 
  Package, 
  AlertCircle, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';

const StatCard = ({ title, value, subValue, icon: Icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card stat-card"
  >
    <div className="stat-header">
      <div className="stat-icon" style={{ backgroundColor: `rgba(${color}, 0.1)`, color: `rgb(${color})` }}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="stat-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
    <div className="stat-footer">
      <span className="sub-value">{subValue}</span>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 124,
    expiringSoon: 8,
    savedToday: 12.5,
    donationsMonth: 12
  });

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>Inventory Overview</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="date-picker glass-card">
          <span>Last 30 Days</span>
          <Activity size={16} />
        </div>
      </header>

      <div className="stats-grid">
        <StatCard 
          title="Total Inventory" 
          value={stats.totalItems} 
          subValue="Across 5 categories"
          icon={Package} 
          trend={12}
          color="99, 102, 241" 
        />
        <StatCard 
          title="Expiring Soon" 
          value={stats.expiringSoon} 
          subValue="Action required within 48h"
          icon={AlertCircle} 
          trend={-5}
          color="245, 158, 11" 
        />
        <StatCard 
          title="Waste Prevented" 
          value={`${stats.savedToday} kg`} 
          subValue="Estimated impact"
          icon={TrendingDown} 
          trend={18}
          color="16, 185, 129" 
        />
        <StatCard 
          title="Active Donations" 
          value={stats.donationsMonth} 
          subValue="To local food banks"
          icon={TrendingUp} 
          color="236, 72, 153" 
        />
      </div>

      <div className="dashboard-sections">
        <section className="recent-activity glass-card">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all">View All</button>
          </div>
          <div className="activity-list">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p><strong>Apples (Organic)</strong> updated to 50 units</p>
                  <span>2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="quick-actions glass-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn-action">
              <Plus size={20} />
              <span>Add Stock</span>
            </button>
            <button className="btn-action">
              <ArrowUpRight size={20} />
              <span>Initiate Donation</span>
            </button>
            <button className="btn-action">
              <Activity size={20} />
              <span>Run AI Scan</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
