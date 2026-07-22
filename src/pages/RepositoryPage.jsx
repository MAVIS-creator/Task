import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockCommits = [
  { hash: 'a72a004', msg: 'feat: apply Task UI design templates for light and dark modes', author: 'DevPal Bot', time: '10 mins ago' },
  { hash: '1db146f', msg: 'feat: improve UI/UX design system, sidebar, header, command palette, and dark mode', author: 'DevPal Bot', time: '30 mins ago' },
  { hash: '4a43859', msg: 'feat: rename Project Brain to DevPal AI', author: 'Ifeoyewole', time: '1 hour ago' },
  { hash: '45e9ee7', msg: 'feat: prepare Devpost and Vercel release', author: 'MAVIS-creator', time: '2 hours ago' },
];

export default function RepositoryPage() {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant mb-1 text-xs font-code">
            <span className="material-symbols-outlined text-sm">folder</span>
            <span>devpal-ai / core-engine</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-on-surface">Repository Intelligence</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary hover:bg-primary-container text-on-primary font-display font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 glow-indigo">
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span>Analyze Repo</span>
          </button>
          <Link
            to="/settings"
            className="bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">sync</span>
            <span>Sync Repos</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/10 overflow-x-auto text-sm font-medium">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === 'summary'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">description</span>
          <span>Intelligence Summary</span>
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
            activeTab === 'commits'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">history</span>
          <span>Commits</span>
          <span className="bg-surface-container px-2 py-0.5 rounded-full text-xs">1,284</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'summary' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* AI Summary Hero Card */}
            <div className="glass-panel p-6 shimmer-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined icon-fill">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-on-surface mb-2">
                  Architecture Intelligence Summary
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  This repository is an AI-powered project intelligence workspace built with React 19, Vite 7, and Express 5 API.
                  The core engine leverages <span className="text-secondary font-code">distributed memory graph nodes</span> for context indexing and Groq LLM inference for tasks and documentation.
                </p>
              </div>
            </div>

            {/* Code Snippet with AI Annotation */}
            <div className="glass-panel overflow-hidden p-0">
              <div className="px-5 py-3 bg-surface-container-high/40 border-b border-white/10 flex justify-between items-center text-xs font-code">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">code</span>
                  <span className="text-on-surface">server/index.js</span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase">
                    Indexed &amp; Active
                  </span>
                </div>
              </div>

              {/* AI Inline Annotation */}
              <div className="bg-primary/10 border-l-4 border-primary px-5 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                <span className="text-sm text-on-surface italic font-medium">
                  "Express API endpoints handle GitHub OAuth identity exchange, Groq task next-step suggestions, and Markdown doc generation."
                </span>
              </div>

              {/* Code Viewer */}
              <div className="p-5 bg-[#0a0a0c] font-code text-xs overflow-x-auto text-zinc-300 leading-relaxed">
                <pre>
{`import express from 'express';
import { groq } from './groq';

const app = express();

// DevPal AI API Server Initialization
app.post('/api/tasks/next-step', async (req, res) => {
  const suggestion = await groq([
    { role: 'system', content: 'You are DevPal AI copilot.' },
    { role: 'user', content: req.body.context }
  ]);
  res.json({ suggestion });
});`}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column: Repo Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 space-y-4">
              <h4 className="font-display font-semibold text-lg text-on-surface">Repository Health</h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Code Churn Score</span>
                <span className="font-bold text-emerald-400">Low (Optimal)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Memory Embedding Density</span>
                <span className="font-bold text-primary">1,240 nodes</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Test Coverage</span>
                <span className="font-bold text-secondary">98%</span>
              </div>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <h4 className="font-display font-semibold text-lg text-on-surface">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 text-xs font-code">
                <span className="bg-surface-container px-3 py-1 rounded-lg border border-outline/20 text-on-surface">
                  React 19
                </span>
                <span className="bg-surface-container px-3 py-1 rounded-lg border border-outline/20 text-on-surface">
                  Vite 7
                </span>
                <span className="bg-surface-container px-3 py-1 rounded-lg border border-outline/20 text-on-surface">
                  Express 5
                </span>
                <span className="bg-surface-container px-3 py-1 rounded-lg border border-outline/20 text-on-surface">
                  Groq LLM
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="font-display font-semibold text-lg text-on-surface mb-4">Recent Commits</h3>
          {mockCommits.map((c) => (
            <div key={c.hash} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">commit</span>
                <div>
                  <b className="text-sm font-medium text-on-surface block">{c.msg}</b>
                  <span className="text-xs text-on-surface-variant font-code">{c.hash} • {c.author}</span>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant">{c.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
