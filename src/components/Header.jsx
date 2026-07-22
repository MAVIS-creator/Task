import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Search,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  GitBranch,
  CheckCircle2,
  User,
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

export default function Header({ title, onOpenCmdPalette, isDark, onToggleTheme, onOpenLogout, user }) {
  const [repoDropdown, setRepoDropdown] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState('devpal-ai / main');
  const [userMenu, setUserMenu] = useState(false);

  const repos = [
    'devpal-ai / main',
    'devpal-ai / memory-engine',
    'devpal-ai / web-client',
    'devpal-ai / docs-studio',
  ];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-title-block">
          <p className="eyebrow">
            <span className="live-status-dot" /> CONNECTED WORKSPACE
          </p>
          <h1>{title}</h1>
        </div>

        {/* Repository Switcher */}
        <div className="repo-switcher-container">
          <button
            className="repo-switcher-button"
            onClick={() => setRepoDropdown(!repoDropdown)}
          >
            <GitBranch size={15} className="repo-icon" />
            <span className="repo-name">{selectedRepo}</span>
            <ChevronDown size={14} />
          </button>

          {repoDropdown && (
            <>
              <div className="popover-backdrop" onClick={() => setRepoDropdown(false)} />
              <div className="repo-dropdown-menu">
                <div className="dropdown-label">Active Repositories</div>
                {repos.map((r) => (
                  <button
                    key={r}
                    className={`repo-option ${selectedRepo === r ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedRepo(r);
                      setRepoDropdown(false);
                    }}
                  >
                    <GitBranch size={14} />
                    <span>{r}</span>
                    {selectedRepo === r && <CheckCircle2 size={14} className="check" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Command Palette Trigger */}
        <button className="cmd-palette-btn" onClick={onOpenCmdPalette}>
          <Search size={15} />
          <span className="cmd-text">Search...</span>
          <kbd>Ctrl K</kbd>
        </button>

        {/* Notifications */}
        <NotificationCenter />

        {/* Theme Toggle */}
        <button
          className="icon-button"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Profile Dropdown */}
        <div className="user-menu-container">
          <button className="avatar-button" onClick={() => setUserMenu(!userMenu)}>
            {user?.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="user-avatar-img" />
            ) : (
              <div className="avatar-fallback">
                <User size={16} />
              </div>
            )}
          </button>

          {userMenu && (
            <>
              <div className="popover-backdrop" onClick={() => setUserMenu(false)} />
              <div className="user-dropdown-menu">
                <div className="user-info-header">
                  <b>{user?.name || user?.login || 'Developer User'}</b>
                  <small className="muted">{user?.email || 'devpal@local'}</small>
                </div>
                <div className="dropdown-divider" />
                <Link
                  to="/settings"
                  className="user-dropdown-item"
                  onClick={() => setUserMenu(false)}
                >
                  <User size={15} /> Account & Settings
                </Link>
                <button
                  className="user-dropdown-item danger"
                  onClick={() => {
                    setUserMenu(false);
                    onOpenLogout();
                  }}
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
