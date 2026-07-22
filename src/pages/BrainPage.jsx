import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialNodes = [
  { id: '1', title: 'v1.1 DevPal AI Branding Decision', type: 'decision', summary: 'Renamed Project Brain to DevPal AI while preserving internal memory engine name.', author: 'Ifeoyewole', date: '2026-07-22' },
  { id: '2', title: 'Groq GPT-OSS 120B Integration', type: 'architecture', summary: 'Selected Groq reasoning LLM for task next-steps and Markdown doc drafting.', author: 'MAVIS-creator', date: '2026-07-21' },
  { id: '3', title: 'Command Palette Overlay (Ctrl + K)', type: 'code', summary: 'Added keyboard listener for instant global navigation across repos, tasks, docs, and memory.', author: 'DevPal Agent', date: '2026-07-22' },
  { id: '4', title: 'GitHub OAuth Read-Only Identity Scope', type: 'milestone', summary: 'OAuth exchange flow maps user repos into DevPal intelligence pipeline.', author: 'Ifeoyewole', date: '2026-07-21' },
];

export default function BrainPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  const filteredNodes = nodes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <p className="text-primary font-display font-medium tracking-widest text-xs uppercase mb-1">
            PROJECT MEMORY ENGINE
          </p>
          <h1 className="font-display text-3xl font-bold text-on-surface">Living Knowledge Graph</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            DevPal AI automatically captures architectural choices, code milestones, and technical context into a living graph.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-surface-container border border-outline/20 rounded-xl px-4 py-2 flex items-center gap-2 text-sm text-on-surface">
            <span className="material-symbols-outlined text-primary">search</span>
            <input
              type="text"
              placeholder="Search memory nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 outline-none text-sm text-on-surface w-48"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Memory Nodes List & Graph Canvas */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Graph Representation */}
          <div className="glass-panel p-6 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            <div className="flex justify-between items-center z-10">
              <h3 className="font-display font-semibold text-lg text-on-surface">System Knowledge Graph</h3>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold font-code">
                ENGINE OPTIMAL
              </span>
            </div>

            {/* Canvas Nodes */}
            <div className="grid grid-cols-2 gap-4 my-6 relative z-10">
              {filteredNodes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className="p-4 rounded-xl bg-surface-container-low border border-outline/30 hover:border-primary cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-code uppercase text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">adjust</span>
                      {n.type}
                    </span>
                    <span className="text-xs text-on-surface-variant">{n.date}</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-on-surface mb-1">{n.title}</h4>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{n.summary}</p>
                </div>
              ))}
            </div>

            {/* Health Overlay */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-on-surface-variant z-10">
              <span>Vector Latency: <strong className="text-primary">12ms</strong></span>
              <span>Semantic Throughput: <strong className="text-secondary">1.2k nodes/s</strong></span>
            </div>
          </div>
        </div>

        {/* Right AI Confidence Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 flex items-center gap-4 border border-primary/20 bg-primary/5">
            <div className="flex-1">
              <div className="text-[10px] text-primary font-bold uppercase tracking-widest">AI Confidence Index</div>
              <div className="text-4xl font-display font-bold text-primary">94%</div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-on-surface-variant">
              Active Memory Engine State
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-on-surface">Groq GPT-OSS 120B Reasoning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-on-surface">GitHub Commit Indexer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Inspector Modal */}
      {selectedNode && (
        <div className="modal-backdrop" onClick={() => setSelectedNode(null)}>
          <div className="glass-panel max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-code uppercase text-primary font-bold">{selectedNode.type}</span>
              <button onClick={() => setSelectedNode(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h2 className="font-display text-xl font-bold text-on-surface">{selectedNode.title}</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{selectedNode.summary}</p>
            <div className="text-xs text-on-surface-variant pt-2 border-t border-white/10">
              Recorded on {selectedNode.date} by {selectedNode.author}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
