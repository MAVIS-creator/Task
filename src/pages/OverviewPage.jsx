import React from 'react';
import { Link } from 'react-router-dom';

export default function OverviewPage() {
  const user = JSON.parse(
    localStorage.getItem('devpal-ai-user') || localStorage.getItem('project-brain-user') || '{}'
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Hero Section */}
      <section className="dashboard-hero-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-primary font-display font-medium tracking-widest text-xs uppercase mb-1">
              DASHBOARD OVERVIEW
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface leading-tight">
              Good Evening, {user.name || user.login || 'Akintunde Dolapo Elisha'}. <br className="hidden md:block" />
              Your project remembers everything.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold font-code flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE MEMORY ENGINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Status Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Repository Health */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <span className="font-display text-3xl font-bold text-secondary">98%</span>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg text-on-surface mb-1">Repository Health</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Optimized file structure and zero circular dependencies detected across active modules.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5">
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[98%]" />
            </div>
          </div>
        </div>

        {/* Memory Nodes */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">database</span>
            </div>
            <span className="font-display text-3xl font-bold text-primary">1,240</span>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg text-on-surface mb-1">Memory Nodes</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Vector embeddings stored and indexed for real-time semantic retrieval.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 flex gap-2 text-[10px] font-code">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">+12 TODAY</span>
            <span className="bg-white/5 text-on-surface-variant px-2 py-0.5 rounded uppercase">SYNC ACTIVE</span>
          </div>
        </div>

        {/* Project Decisions */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <span className="font-display text-3xl font-bold text-tertiary">42</span>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg text-on-surface mb-1">Project Decisions</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Architectural choices recorded and mapped to the logic tree.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Last update: 2h ago</span>
            <Link to="/brain" className="text-primary hover:underline flex items-center gap-1">
              <span>View Map</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
            <h2 className="font-display text-2xl font-semibold">AI Insights</h2>
          </div>
          <Link to="/brain" className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
            <span>View History</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Insights Cards Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-panel p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-lg">task_alt</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <h5 className="font-display font-semibold text-on-surface">Authentication module completed</h5>
                  <span className="text-xs text-on-surface-variant">Just now</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Verified GitHub OAuth flow and linked session tokens. All edge cases for session expiration are handled.
                </p>
                <div className="flex gap-2 pt-1">
                  <Link to="/repository" className="text-xs text-primary border border-primary/30 hover:bg-primary/10 px-3 py-1 rounded-lg font-semibold transition-all">
                    Review Diff
                  </Link>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 flex gap-4 items-start shimmer-border">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-lg">warning</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <h5 className="font-display font-semibold text-on-surface">README needs update</h5>
                  <span className="text-xs text-on-surface-variant">45m ago</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Added several new CLI arguments and memory engine features that are not yet documented in README.md.
                </p>
                <div className="flex gap-2 pt-1">
                  <Link to="/documents" className="bg-primary text-on-primary px-3 py-1 rounded-lg text-xs font-semibold hover:bg-primary-container transition-all">
                    Update Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-lg">new_releases</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <h5 className="font-display font-semibold text-on-surface">New dependencies indexed</h5>
                  <span className="text-xs text-on-surface-variant">2h ago</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Indexed express, dotenv, and lucide-react API surfaces for real-time copilot completion.
                </p>
              </div>
            </div>
          </div>

          {/* Logic Stream Bento Visual Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 h-full flex flex-col justify-between space-y-4">
              <h5 className="font-display font-semibold text-sm text-on-surface">Active Logic Stream</h5>
              <div className="relative h-40 bg-surface-container-low/50 rounded-2xl border border-white/5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                <div className="w-3 h-3 rounded-full bg-primary absolute" />
              </div>
              <div className="text-xs text-on-surface-variant space-y-1">
                <p className="font-medium text-on-surface">Vector Search Node #892 active</p>
                <p className="font-code text-[11px]">Embedding model: gpt-oss-120b</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
