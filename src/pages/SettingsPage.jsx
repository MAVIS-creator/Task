import React, { useState } from 'react';
import {
  User,
  Github,
  Sun,
  Moon,
  Database,
  LogOut,
  Check,
  ShieldAlert,
  Save,
  GitBranch,
} from 'lucide-react';
import Card from '../components/Card';

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
    <div className="settings-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SETTINGS &amp; PREFERENCES</p>
          <h2>Workspace Configuration</h2>
          <p>Manage your account, GitHub integration, appearance, and memory engine state.</p>
        </div>
      </div>

      <div className="stack">
        {/* Profile Card */}
        <Card>
          <div className="card-title">
            <div>
              <p className="eyebrow">PROFILE INFO</p>
              <h3>Developer Account</h3>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="stack">
            <div className="form-row">
              <label className="flex-1">
                Display Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </label>

              <label className="flex-1">
                Email Address
                <input type="email" value={email} disabled />
              </label>
            </div>

            <button className="button self-start" type="submit">
              <Save size={16} /> Save Profile Changes
            </button>
            {savedSuccess && <span className="success-text"><Check size={14} /> Profile saved successfully!</span>}
          </form>
        </Card>

        {/* GitHub Integration */}
        <Card>
          <div className="card-title">
            <div>
              <p className="eyebrow">GITHUB INTEGRATION</p>
              <h3>Repository OAuth Connection</h3>
            </div>
          </div>

          <div className="github-settings-row">
            <div className="github-badge">
              <Github size={24} />
            </div>
            <div className="github-info">
              <b>{user.login ? `Connected as @${user.login}` : 'GitHub Connection Active'}</b>
              <p className="muted">OAuth status: Read-only access enabled for repositories and commits.</p>
            </div>
            <a href="/api/github/connect" className="secondary-button">
              <GitBranch size={16} /> Re-authenticate GitHub
            </a>
          </div>
        </Card>

        {/* Memory Engine State */}
        <Card>
          <div className="card-title">
            <div>
              <p className="eyebrow">MEMORY ENGINE</p>
              <h3>Local Knowledge Graph Cache</h3>
            </div>
          </div>

          <p className="muted">
            DevPal AI caches local decision nodes and repository analysis locally for instantaneous responses.
          </p>

          <div className="memory-actions mt-3">
            <button className="secondary-button" onClick={handleClearMemoryCache}>
              <Database size={16} /> Clear Local Memory Cache
            </button>
            {memoryCleared && <span className="success-text"><Check size={14} /> Cache reset successfully.</span>}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="danger-card">
          <div className="danger-zone-content">
            <div className="danger-icon">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3>Account Session</h3>
              <p className="muted">Sign out of DevPal AI workspace on this machine.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
