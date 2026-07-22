import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  BrainCircuit,
  Bot,
  ListTodo,
  FileText,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import DevPalLogo from './DevPalLogo';

const navItems = [
  { to: '/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/repository', label: 'Repository', icon: FolderGit2 },
  { to: '/brain', label: 'Project Memory', icon: BrainCircuit },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { pathname } = useLocation();

  return (
    <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link className="brand" to="/overview">
          <DevPalLogo size={32} showText={!isCollapsed} />
        </Link>
        <button
          className="collapse-toggle"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {!isCollapsed && <p className="eyebrow sidebar-eyebrow">DEVELOPER INTELLIGENCE</p>}

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? label : ''}
            >
              <div className="nav-icon-box">
                <Icon size={19} />
              </div>
              {!isCollapsed && <span className="nav-label">{label}</span>}
              {isActive && <div className="active-pill" />}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed ? (
        <div className="sidebar-note">
          <div className="sidebar-note-header">
            <Sparkles size={16} className="sparkle-icon" />
            <b>DevPal Engine</b>
          </div>
          <p>Context graph active &amp; ready for repository sources</p>
        </div>
      ) : (
        <div className="sidebar-note-collapsed" title="DevPal Engine Active">
          <Sparkles size={16} />
        </div>
      )}
    </aside>
  );
}
