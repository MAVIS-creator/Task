import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandPalette from './CommandPalette';
import LogoutModal from './LogoutModal';

const navMap = {
  '/overview': 'Overview Dashboard',
  '/repository': 'Repository Intelligence',
  '/brain': 'Project Memory Engine',
  '/assistant': 'AI Assistant Studio',
  '/tasks': 'Task Checkpoints',
  '/documents': 'Document Studio',
  '/settings': 'Settings & Account',
};

export default function Shell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Theme management
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('devpal-theme');
    return saved ? saved === 'dark' : true; // Default to sleek dark mode
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('devpal-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('devpal-theme', 'light');
    }
  }, [isDark]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch current user info
  const user = JSON.parse(
    localStorage.getItem('devpal-ai-user') || localStorage.getItem('project-brain-user') || '{}'
  );

  const title = navMap[pathname] || 'DevPal AI Workspace';

  const handleLogoutConfirm = () => {
    localStorage.removeItem('devpal-ai-user');
    localStorage.removeItem('project-brain-user');
    setLogoutOpen(false);
    navigate('/');
  };

  return (
    <div className={`app ${isCollapsed ? 'sidebar-collapsed' : ''} ${isDark ? 'dark' : 'light'}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <main className="app-main-content">
        <Header
          title={title}
          onOpenCmdPalette={() => setCmdPaletteOpen(true)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenLogout={() => setLogoutOpen(true)}
          user={user}
        />

        <section className="content-container">
          <Outlet />
        </section>
      </main>

      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
