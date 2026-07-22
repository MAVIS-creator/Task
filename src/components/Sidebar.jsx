import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DevPalLogo from './DevPalLogo';

const navItems = [
  { to: '/overview', label: 'Overview', icon: 'dashboard' },
  { to: '/brain', label: 'Project Memory', icon: 'psychology' },
  { to: '/repository', label: 'Repository', icon: 'code' },
  { to: '/assistant', label: 'AI Assistant', icon: 'smart_toy' },
  { to: '/tasks', label: 'Tasks', icon: 'checklist' },
  { to: '/documents', label: 'Documentation', icon: 'description' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { pathname } = useLocation();

  return (
    <aside className={`task-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header Brand Box */}
      <div className="sidebar-brand-box">
        <Link className="brand-link" to="/overview">
          <DevPalLogo size={32} showText={!isCollapsed} />
        </Link>
        <button
          className="collapse-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <span className="material-symbols-outlined">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="project-hub-badge">
          <div className="hub-icon">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div className="hub-text">
            <h3 className="hub-title">DevPal AI Hub</h3>
            <p className="hub-sub">Project Intelligence</p>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="sidebar-menu">
        {navItems.map(({ to, label, icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={isCollapsed ? label : ''}
            >
              <span className="material-symbols-outlined link-icon">{icon}</span>
              {!isCollapsed && <span className="link-label">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer support */}
      {!isCollapsed && (
        <div className="sidebar-footer-links">
          <Link to="/settings" className="footer-link">
            <span className="material-symbols-outlined">person</span>
            <span>Account</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
