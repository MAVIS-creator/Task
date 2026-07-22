import React from 'react';
import { Link } from 'react-router-dom';

export default function OverviewPage() {
  const user = JSON.parse(
    localStorage.getItem('devpal-ai-user') || localStorage.getItem('project-brain-user') || '{}'
  );

  return (
    <div className="overview-task-dashboard">
      {/* Hero Section */}
      <section className="dashboard-hero-section">
        <div className="hero-flex">
          <div>
            <p className="eyebrow-text">DASHBOARD OVERVIEW</p>
            <h1 className="hero-title">
              Good Evening, {user.name || user.login || 'Samuel'}. <br className="hidden-mobile" />
              Your project remembers everything.
            </h1>
          </div>
          <div className="hero-btn-wrap">
            <Link to="/assistant" className="btn-primary glow-indigo">
              <span className="material-symbols-outlined icon-fill">play_arrow</span>
              <span>Quick Resume</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Status Cards Grid */}
      <section className="status-grid">
        {/* Repository Health */}
        <div className="glass-panel status-card">
          <div className="card-top-row">
            <div className="icon-badge secondary">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <span className="stat-number secondary">98%</span>
          </div>
          <div className="card-body-text">
            <h4 className="card-heading">Repository Health</h4>
            <p className="card-desc">Optimized file structure and zero circular dependencies detected.</p>
          </div>
          <div className="card-footer-progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '98%' }} />
            </div>
          </div>
        </div>

        {/* Memory Nodes */}
        <div className="glass-panel status-card">
          <div className="card-top-row">
            <div className="icon-badge primary">
              <span className="material-symbols-outlined">database</span>
            </div>
            <span className="stat-number primary">1,240</span>
          </div>
          <div className="card-body-text">
            <h4 className="card-heading">Memory Nodes</h4>
            <p className="card-desc">Vector embeddings stored and indexed for semantic retrieval.</p>
          </div>
          <div className="card-footer-tags">
            <span className="tag-badge primary">+12 TODAY</span>
            <span className="tag-badge muted">SYNC ACTIVE</span>
          </div>
        </div>

        {/* Project Decisions */}
        <div className="glass-panel status-card">
          <div className="card-top-row">
            <div className="icon-badge tertiary">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <span className="stat-number tertiary">42</span>
          </div>
          <div className="card-body-text">
            <h4 className="card-heading">Project Decisions</h4>
            <p className="card-desc">Architectural choices recorded and mapped to the logic tree.</p>
          </div>
          <div className="card-footer-flex">
            <span className="footer-label">Last update: 2h ago</span>
            <span className="material-symbols-outlined arrow">arrow_forward</span>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="insights-section">
        <div className="insights-header">
          <div className="insights-title flex-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h2>AI Insights</h2>
          </div>
          <Link to="/brain" className="link-text">
            <span>View History</span>
            <span className="material-symbols-outlined">open_in_new</span>
          </Link>
        </div>

        <div className="bento-grid">
          {/* Main Insights List */}
          <div className="insights-column">
            {/* Card 1 */}
            <div className="glass-panel insight-card">
              <div className="insight-icon-box success">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
              <div className="insight-content">
                <div className="insight-top">
                  <h5>Authentication module completed</h5>
                  <span className="time-tag">Just now</span>
                </div>
                <p>
                  I've verified the OAuth2 flow and linked it to the session store. All edge cases for token expiration are now handled.
                </p>
                <div className="insight-actions">
                  <button className="btn-outline-primary">Review Diff</button>
                  <button className="btn-ghost">Dismiss</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-panel insight-card shimmer-border">
              <div className="insight-icon-box warning">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="insight-content">
                <div className="insight-top">
                  <h5>README needs update</h5>
                  <span className="time-tag">45m ago</span>
                </div>
                <p>
                  You've added several new CLI arguments that aren't documented yet. Should I generate an updated documentation block?
                </p>
                <div className="insight-actions">
                  <Link to="/documents" className="btn-solid-primary">Update Now</Link>
                  <button className="btn-ghost">Later</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-panel insight-card">
              <div className="insight-icon-box info">
                <span className="material-symbols-outlined">new_releases</span>
              </div>
              <div className="insight-content">
                <div className="insight-top">
                  <h5>New dependency detected</h5>
                  <span className="time-tag">2h ago</span>
                </div>
                <p>
                  Found `lucide-react` and `express` in package.json. Automatically indexed API surfaces for seamless code intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Stream Visual Card */}
          <div className="stream-column">
            <div className="glass-panel logic-stream-card">
              <h5 className="stream-title">Active Logic Stream</h5>
              <div className="stream-visual-box">
                <div className="pulse-node n1" />
                <div className="pulse-node n2" />
                <div className="pulse-node n3" />
                <div className="pulse-node n4" />
                <svg className="stream-svg-connections">
                  <line x1="20%" y1="30%" x2="80%" y2="40%" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="80%" y1="40%" x2="50%" y2="80%" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
              <div className="stream-footer">
                <p>Vector Search Node #892 active</p>
                <small className="text-muted">Embedding model: gpt-oss-120b</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
