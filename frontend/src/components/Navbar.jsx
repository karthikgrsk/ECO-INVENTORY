import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  HeartHandshake, 
  LogOut,
  Leaf
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <Leaf className="brand-icon" />
        <span>EcoInventory</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Package size={20} />
          <span>Inventory</span>
        </NavLink>
        
        <NavLink to="/alerts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <AlertTriangle size={20} />
          <span>AI Insights</span>
        </NavLink>
        
        <NavLink to="/donations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HeartHandshake size={20} />
          <span>Donations</span>
        </NavLink>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
          z-index: 1000;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }

        .brand-icon {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          text-decoration: none;
          color: var(--text-muted);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .logout-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
