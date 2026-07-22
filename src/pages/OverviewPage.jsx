import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  Sparkles,
  GitCommit,
  Bot,
  FileText,
  TrendingUp,
  Activity,
  Zap,
} from 'lucide-react';
import Card from '../components/Card';

export default function OverviewPage() {
  const user = JSON.parse(
    localStorage.getItem('devpal-ai-user') || localStorage.getItem('project-brain-user') || '{}'
  );

  return (
    <div className="overview-page">
      {/* Hero Header */}
      <div className="hero-banner card">
        <div className="hero-content">
          <p className="eyebrow purple">
            <Sparkles size={14} /> DEVELOPER INTELLIGENCE PLATFORM
          </p>
          <h2>
            Welcome back, <span className="gradient-text">{user.name || user.login || 'Developer'}</span>!
          </h2>
          <p>
            DevPal AI is currently indexing your project context across commits, decisions, tasks, and documentation.
          </p>
          <div className="hero-button-group">
            <Link className="button" to="/assistant">
              <Bot size={16} /> Ask AI Copilot <ArrowRight size={16} />
            </Link>
            <Link className="secondary-button" to="/repository">
              <GitBranch size={16} /> View Repositories
            </Link>
          </div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="metrics">
        <Card>
          <div className="metric-header">
            <p>Repository Health</p>
            <div className="metric-icon">
              <Activity size={18} />
            </div>
          </div>
          <strong>98%</strong>
          <small>
            <TrendingUp size={12} className="success" /> +4% from last week
          </small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>Memory Nodes</p>
            <div className="metric-icon">
              <BrainCircuit size={18} />
            </div>
          </div>
          <strong>24</strong>
          <small>Living decisions &amp; architectural nodes</small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>AI Sessions</p>
            <div className="metric-icon">
              <Bot size={18} />
            </div>
          </div>
          <strong>18</strong>
          <small>Interactive queries answered</small>
        </Card>

        <Card>
          <div className="metric-header">
            <p>Docs Generated</p>
            <div className="metric-icon">
              <FileText size={18} />
            </div>
          </div>
          <strong>7</strong>
          <small>READMEs &amp; Architecture specs</small>
        </Card>
      </div>

      {/* Charts & Interactive Section */}
      <div className="grid">
        {/* Main Knowledge & Activity Chart */}
        <Card className="wide">
          <div className="card-title">
            <div>
              <p className="eyebrow">PROJECT MEMORY GRAPH</p>
              <h3>Repository Activity &amp; Knowledge Ingestion</h3>
            </div>
            <Link to="/brain" className="text-link">
              Open Knowledge Engine <ArrowRight size={15} />
            </Link>
          </div>

          <div className="chart-wrapper">
            <svg viewBox="0 0 700 200" className="overview-svg-chart">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="var(--border-color)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="var(--border-color)" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="var(--border-color)" strokeDasharray="4 4" />

              {/* Area Chart */}
              <path
                d="M0,160 Q100,120 200,140 T400,60 T600,80 T700,40 L700,200 L0,200 Z"
                fill="url(#chartGrad)"
              />

              {/* Smooth Line */}
              <path
                d="M0,160 Q100,120 200,140 T400,60 T600,80 T700,40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
              />

              {/* Data Points */}
              <circle cx="200" cy="140" r="5" fill="#6366f1" />
              <circle cx="400" cy="60" r="5" fill="#8b5cf6" />
              <circle cx="600" cy="80" r="5" fill="#6366f1" />
              <circle cx="700" cy="40" r="6" fill="#a855f7" />
            </svg>
          </div>

          <div className="chart-legend">
            <span><i className="dot purple" /> Memory Nodes</span>
            <span><i className="dot blue" /> GitHub Commits</span>
            <span><i className="dot green" /> Verified Tasks</span>
          </div>
        </Card>

        {/* Right Side Activity Column */}
        <Card>
          <div className="card-title">
            <div>
              <p className="eyebrow">LIVE STREAM</p>
              <h3>Recent AI Activity</h3>
            </div>
          </div>

          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-icon ai">
                <Sparkles size={14} />
              </div>
              <div className="timeline-content">
                <b>Renamed Project Brain to DevPal AI</b>
                <p>Branding overhaul v1.1 applied across UI and documentation.</p>
                <small>10 mins ago</small>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon git">
                <GitCommit size={14} />
              </div>
              <div className="timeline-content">
                <b>Commit: feat: add command palette</b>
                <p>Global Ctrl+K palette integrated for quick navigation.</p>
                <small>25 mins ago</small>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon doc">
                <FileText size={14} />
              </div>
              <div className="timeline-content">
                <b>Generated Architecture Guide</b>
                <p>Markdown document created via Groq engine.</p>
                <small>1 hour ago</small>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
