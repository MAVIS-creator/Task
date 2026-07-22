import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';
import DevPalLogo from './DevPalLogo';

export default function Header({ title, onOpenCmdPalette, isDark, onToggleTheme, onOpenLogout, user }) {
  const { pathname } = useLocation();
  const [userMenu, setUserMenu] = useState(false);

  const topNavLinks = [
    { to: '/overview', label: 'Overview' },
    { to: '/brain', label: 'Project Memory' },
    { to: '/repository', label: 'Repository' },
    { to: '/assistant', label: 'AI Assistant' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/documents', label: 'Docs' },
  ];

  return (
    <header className="task-header">
      <div className="header-left-brand">
        <DevPalLogo size={32} showText={true} />

        <nav className="header-topnav hidden-mobile">
          {topNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`topnav-link ${pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="header-right-actions">
        {/* Search Command Palette Input */}
        <button className="header-search-btn" onClick={onOpenCmdPalette}>
          <span className="material-symbols-outlined search-icon">search</span>
          <span className="search-placeholder">Search Repo Intelligence...</span>
          <kbd className="cmd-tag">Ctrl K</kbd>
        </button>

        {/* Notifications */}
        <NotificationCenter />

        {/* Contrast Theme Toggle */}
        <button
          className="header-icon-btn"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined">contrast</span>
        </button>

        {/* User Avatar */}
        <div className="user-avatar-wrap">
          <button className="avatar-btn" onClick={() => setUserMenu(!userMenu)}>
            <img
              src={
                user?.avatar ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAHKMj3D7WZ3oLqG2s3hTo7YhXyUoNWE7l7Pdvm1rsSosnk8gdrFTv87MHEF8L82No8ieajkmbE-npAn6yxBSVAoLT7cHxNn-DA5P-B9aQ6H2rjssSgHKdnjOhxbboBUJPzdSCjzkuvnebmLzSMmotfpdbEsXFrTgHtIjv8CRtloORvBs1RfZQ6JLSZDOAVsMIJtjxi2kv74HxxWGvEOSJc3kFH4ZGwxFyE1_7o7ujGnQO8KORVrqhqRdWaZg65RsoJF4hqO3Ib3s4'
              }
              alt="User Profile Avatar"
              className="user-img"
            />
          </button>

          {userMenu && (
            <>
              <div className="popover-backdrop" onClick={() => setUserMenu(false)} />
              <div className="user-dropdown-popover">
                <div className="dropdown-user-header">
                  <b>{user?.name || user?.login || 'Samuel (Developer)'}</b>
                  <small className="text-muted">{user?.email || 'samuel@devpal.ai'}</small>
                </div>
                <div className="dropdown-divider" />
                <Link to="/settings" className="dropdown-item" onClick={() => setUserMenu(false)}>
                  <span className="material-symbols-outlined">person</span> Account &amp; Settings
                </Link>
                <button
                  className="dropdown-item danger"
                  onClick={() => {
                    setUserMenu(false);
                    onOpenLogout();
                  }}
                >
                  <span className="material-symbols-outlined">logout</span> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
