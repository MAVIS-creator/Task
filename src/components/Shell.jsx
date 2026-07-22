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

  // Dark/Light Theme management using Task UI class toggles
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('devpal-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.className = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('devpal-theme', 'dark');
    } else {
      document.documentElement.className = 'light';
      document.body.classList.add('light');
      document.body.classList.remove('dark');
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
    <div className={`min-h-screen bg-surface text-on-surface ${isDark ? 'dark' : 'light'}`}>
      <Header
        title={title}
        onOpenCmdPalette={() => setCmdPaletteOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenLogout={() => setLogoutOpen(true)}
        user={user}
      />

      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <main className={`pt-20 pb-12 px-6 md:pr-10 min-h-screen transition-all duration-200 ${isCollapsed ? 'md:pl-24' : 'md:pl-72'}`}>
        <Outlet />
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
