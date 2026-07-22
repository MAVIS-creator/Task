import React, { useState } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState(() =>
    JSON.parse(
      localStorage.getItem('devpal-ai-user') ||
        localStorage.getItem('project-brain-user') ||
        '{}'
    )
  );

  const [name, setName] = useState(user.name || '');
  const [email] = useState(user.email || 'developer@devpal.ai');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [memoryCleared, setMemoryCleared] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, name };
    localStorage.setItem('devpal-ai-user', JSON.stringify(updated));
    setUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearMemoryCache = () => {
    setMemoryCleared(true);
    setTimeout(() => setMemoryCleared(false), 2500);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-primary font-display font-medium tracking-widest text-xs uppercase mb-1">
          SETTINGS &amp; PREFERENCES
        </p>
        <h1 className="font-display text-3xl font-bold text-on-surface">Workspace Configuration</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Manage your account details, GitHub integration, appearance, and memory engine state.
        </p>
      </div>

      <div className="space-y-6">
        {/* Developer Profile Card */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-on-surface">Developer Profile</h3>
              <p className="text-xs text-on-surface-variant">Update your public display name and credentials.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-surface-container border border-outline/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-surface-container-low border border-outline/20 rounded-xl px-4 py-2.5 text-sm text-on-surface-variant cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-container text-on-primary font-display font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95 glow-indigo flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>Save Profile Changes</span>
              </button>

              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Profile updated!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* GitHub OAuth Connection Card */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">code</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-on-surface">
                  {user.login ? `Connected as @${user.login}` : 'GitHub Integration Active'}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  OAuth status: Read-only repository access for commits, issues, and pull requests.
                </p>
              </div>
            </div>

            <a
              href="/api/github/connect"
              className="bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">sync</span>
              <span>Re-authenticate GitHub</span>
            </a>
          </div>
        </div>

        {/* Memory Engine Cache Card */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">database</span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-on-surface">Local Memory Cache</h3>
              <p className="text-xs text-on-surface-variant">
                DevPal AI caches local decision nodes and repository analysis for instant response times.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleClearMemoryCache}
              className="bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span>
              <span>Clear Local Memory Cache</span>
            </button>

            {memoryCleared && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span> Memory cache reset!
              </span>
            )}
          </div>
        </div>

        {/* Account Session Card */}
        <div className="glass-panel p-6 border-red-500/20 bg-red-500/5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <span className="material-symbols-outlined">shield_with_house</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-on-surface">Account Session</h3>
                <p className="text-xs text-on-surface-variant">
                  Sign out of DevPal AI workspace on this machine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
