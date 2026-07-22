import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  GitBranch,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Card from '../components/Card';

const mockCommits = [
  { hash: '1db146f', msg: 'feat: improve UI/UX design system, sidebar, header, command palette, and dark mode', author: 'DevPal Bot', time: '10 mins ago' },
  { hash: '4a43859', msg: 'feat: rename Project Brain to DevPal AI', author: 'Ifeoyewole', time: '25 mins ago' },
  { hash: '45e9ee7', msg: 'feat: prepare Devpost and Vercel release', author: 'MAVIS-creator', time: '1 hour ago' },
  { hash: '90f1848', msg: 'feat: add public workspace and live task tools', author: 'MAVIS-creator', time: '3 hours ago' },
  { hash: 'ef666f7', msg: 'feat: add GitHub connection workspace', author: 'Ifeoyewole', time: '1 day ago' },
];

const mockPRs = [
  { id: '#42', title: 'v1.1 Polish Pass & Branding Overhaul', state: 'merged', author: 'DevPal Lead' },
  { id: '#41', title: 'Groq LLM Context Ingestion Integration', state: 'open', author: 'Copilot AI' },
];

const mockContributors = [
  { name: 'Ifeoyewole', role: 'Owner / Lead', commits: 24, avatar: 'https://github.com/github.png' },
  { name: 'MAVIS-creator', role: 'Maintainer', commits: 18, avatar: 'https://github.com/github.png' },
  { name: 'DevPal AI Agent', role: 'AI Copilot', commits: 42, avatar: 'https://github.com/github.png' },
];

export default function RepositoryPage() {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [activeTab, setActiveTab] = useState('commits');

  return (
    <div className="repository-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">REPOSITORY INTELLIGENCE</p>
          <h2>Source-Aware Codebase Insights</h2>
          <p>
            Real-time repository analytics, commit history, pull request tracking, and health metrics.
          </p>
        </div>
        <Link className="button" to="/settings">
          <Github size={17} /> Manage GitHub Repos
        </Link>
      </div>

      {/* Repo Health & Quick Stats */}
      <div className="metrics">
        <Card>
          <div className="metric-header">
            <p>Overall Health</p>
            <ShieldCheck size={20} className="success" />
          </div>
          <strong>96 / 100</strong>
          <small>High maintainability index</small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>Total Commits</p>
            <GitCommit size={20} />
          </div>
          <strong>142</strong>
          <small>Across 4 active branches</small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>Open Pull Requests</p>
            <GitPullRequest size={20} />
          </div>
          <strong>1 Open</strong>
          <small>12 Merged this month</small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>Contributors</p>
            <Users size={20} />
          </div>
          <strong>3 Active</strong>
          <small>Core engineering team</small>
        </Card>
      </div>

      <div className="grid">
        {/* Main Content: Commits & PRs */}
        <Card className="wide">
          <div className="repo-toolbar">
            <div className="branch-selector">
              <GitBranch size={15} />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="select-input"
              >
                <option value="main">branch: main</option>
                <option value="feature/branding">branch: feature/branding</option>
                <option value="feature/project-memory">branch: feature/project-memory</option>
              </select>
            </div>

            <div className="repo-tab-buttons">
              <button
                className={`tab-btn ${activeTab === 'commits' ? 'active' : ''}`}
                onClick={() => setActiveTab('commits')}
              >
                <GitCommit size={15} /> Commits ({mockCommits.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'prs' ? 'active' : ''}`}
                onClick={() => setActiveTab('prs')}
              >
                <GitPullRequest size={15} /> Pull Requests ({mockPRs.length})
              </button>
            </div>
          </div>

          {activeTab === 'commits' ? (
            <div className="commits-list">
              {mockCommits.map((c) => (
                <div className="commit-item" key={c.hash}>
                  <div className="commit-icon">
                    <GitCommit size={16} />
                  </div>
                  <div className="commit-details">
                    <b className="commit-msg">{c.msg}</b>
                    <div className="commit-meta">
                      <code>{c.hash}</code> • <span>{c.author}</span> • <small>{c.time}</small>
                    </div>
                  </div>
                  <span className="verified-badge">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="prs-list">
              {mockPRs.map((pr) => (
                <div className="pr-item" key={pr.id}>
                  <GitPullRequest size={18} className={pr.state === 'merged' ? 'purple' : 'green'} />
                  <div className="pr-details">
                    <b>{pr.title} <small>{pr.id}</small></b>
                    <p>Opened by {pr.author}</p>
                  </div>
                  <span className={`pr-status ${pr.state}`}>{pr.state}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Right Sidebar: Contributors & Tech Stack */}
        <div className="stack-column">
          <Card>
            <p className="eyebrow">CONTRIBUTORS</p>
            <h3>Team Members</h3>
            <div className="contributors-list">
              {mockContributors.map((user) => (
                <div className="contributor-card" key={user.name}>
                  <img src={user.avatar} alt={user.name} className="contributor-avatar" />
                  <div className="contributor-info">
                    <b>{user.name}</b>
                    <small>{user.role} • {user.commits} commits</small>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="eyebrow">TECH STACK DETECTED</p>
            <h3>Architecture Stack</h3>
            <ul className="stack-tags">
              <li><span className="tag-dot react" /> React 19</li>
              <li><span className="tag-dot vite" /> Vite 7</li>
              <li><span className="tag-dot node" /> Express 5 API</li>
              <li><span className="tag-dot groq" /> Groq GPT-OSS 120B</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
