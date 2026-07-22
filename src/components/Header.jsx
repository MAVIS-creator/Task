import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';
import DevPalLogo from './DevPalLogo';

const availableRepos = [
  { id: '1', name: 'devpal-ai / main', branch: 'main', status: 'Active' },
  { id: '2', name: 'devpal-ai / memory-engine', branch: 'v1.1-release', status: 'Synced' },
  { id: '3', name: 'devpal-ai / web-client', branch: 'main', status: 'Synced' },
  { id: '4', name: 'MAVIS-creator / Task', branch: 'main', status: 'Connected' },
];

export default function Header({ onOpenCmdPalette, isDark, onToggleTheme, onOpenLogout, user }) {
  const [userMenu, setUserMenu] = useState(false);
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(availableRepos[0]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 px-6 flex justify-between items-center bg-[#09090b]/80 dark:bg-[#13131b]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_40px_rgba(73,75,214,0.15)]">
      {/* Header Left: Brand Logo + Repository Selector */}
      <div className="flex items-center gap-6">
        <Link to="/overview" className="flex items-center gap-3 text-decoration-none">
          <DevPalLogo size={32} showText={true} />
        </Link>

        {/* Repository Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRepoDropdownOpen(!repoDropdownOpen)}
            className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-base">folder</span>
            <span className="font-code">{selectedRepo.name}</span>
            <span className="material-symbols-outlined text-xs text-on-surface-variant">expand_more</span>
          </button>

          {repoDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRepoDropdownOpen(false)} />
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#13131b] border border-white/10 rounded-xl p-2 shadow-2xl z-50 space-y-1">
                <div className="text-[10px] font-code uppercase text-on-surface-variant px-3 py-1 font-bold">
                  Monitored Repositories ({availableRepos.length})
                </div>
                {availableRepos.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => {
                      setSelectedRepo(repo);
                      setRepoDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                      selectedRepo.id === repo.id
                        ? 'bg-primary/20 text-primary font-bold'
                        : 'text-on-surface hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">folder</span>
                      <span className="font-code">{repo.name}</span>
                    </div>
                    {selectedRepo.id === repo.id && (
                      <span className="material-symbols-outlined text-xs text-primary">check</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search Command Palette Trigger */}
        <button
          onClick={onOpenCmdPalette}
          className="hidden md:flex items-center gap-3 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface-variant px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">search</span>
          <span>Search Repo Intelligence...</span>
          <kbd className="bg-surface-container-lowest border border-outline/20 px-2 py-0.5 rounded text-[10px] font-code text-on-surface-variant">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications Popover */}
        <NotificationCenter />

        {/* Contrast Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="w-9 h-9 rounded-full border border-white/10 bg-surface-container hover:bg-white/10 text-on-surface flex items-center justify-center transition-all cursor-pointer"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined text-lg">contrast</span>
        </button>

        {/* User Avatar Menu */}
        <div className="relative">
          <button onClick={() => setUserMenu(!userMenu)} className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 cursor-pointer block">
            <img
              src={
                user?.avatar ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAHKMj3D7WZ3oLqG2s3hTo7YhXyUoNWE7l7Pdvm1rsSosnk8gdrFTv87MHEF8L82No8ieajkmbE-npAn6yxBSVAoLT7cHxNn-DA5P-B9aQ6H2rjssSgHKdnjOhxbboBUJPzdSCjzkuvnebmLzSMmotfpdbEsXFrTgHtIjv8CRtloORvBs1RfZQ6JLSZDOAVsMIJtjxi2kv74HxxWGvEOSJc3kFH4ZGwxFyE1_7o7ujGnQO8KORVrqhqRdWaZg65RsoJF4hqO3Ib3s4'
              }
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {userMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#13131b] border border-white/10 rounded-xl p-2 shadow-2xl z-50">
                <div className="px-3 py-2">
                  <b className="text-xs text-on-surface block truncate">{user?.name || user?.login || 'Akintunde Dolapo Elisha'}</b>
                  <span className="text-[11px] text-on-surface-variant truncate block">{user?.email || 'devpal@local'}</span>
                </div>
                <div className="h-px bg-white/10 my-1" />
                <Link
                  to="/settings"
                  onClick={() => setUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-white/5 rounded-lg transition-all text-decoration-none"
                >
                  <span className="material-symbols-outlined text-sm">person</span> Account &amp; Settings
                </Link>
                <button
                  onClick={() => {
                    setUserMenu(false);
                    onOpenLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer text-left border-0 bg-transparent"
                >
                  <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
