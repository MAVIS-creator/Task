import React, { useState } from 'react';
import {
  BrainCircuit,
  Plus,
  Search,
  Filter,
  Layers,
  Milestone,
  CheckCircle2,
  Code2,
  FileCode,
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import Card from '../components/Card';

const initialNodes = [
  {
    id: 'node-1',
    title: 'v1.1 DevPal AI Branding Decision',
    type: 'decision',
    summary: 'Renamed Project Brain to DevPal AI while preserving internal memory engine name.',
    author: 'Ifeoyewole',
    date: '2026-07-22',
    tags: ['Branding', 'v1.1', 'UI'],
    details: 'Ensures clear developer-tool positioning (Linear / GitHub aesthetic) while maintaining backwards compatibility.',
  },
  {
    id: 'node-2',
    title: 'Groq GPT-OSS 120B Integration',
    type: 'architecture',
    summary: 'Selected Groq reasoning LLM for task next-steps and Markdown doc drafting.',
    author: 'MAVIS-creator',
    date: '2026-07-21',
    tags: ['AI', 'LLM', 'Groq'],
    details: 'Configured medium reasoning effort and fallback mechanisms for low latency assistant queries.',
  },
  {
    id: 'node-3',
    title: 'Command Palette Overlay (Ctrl + K)',
    type: 'code',
    summary: 'Added keyboard listener for instant global navigation across repos, tasks, docs, and memory.',
    author: 'DevPal Agent',
    date: '2026-07-22',
    tags: ['UX', 'Keyboard', 'Navigation'],
    details: 'Implemented modal overlay with focus management, ESC handling, and instant search filter.',
  },
  {
    id: 'node-4',
    title: 'GitHub OAuth Read-Only Identity Scope',
    type: 'milestone',
    summary: 'OAuth exchange flow maps user repos into DevPal intelligence pipeline.',
    author: 'Ifeoyewole',
    date: '2026-07-21',
    tags: ['GitHub', 'OAuth', 'Security'],
    details: 'Captures access token in server session and provides secure repository metadata endpoints.',
  },
];

export default function BrainPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  // New Node Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('decision');
  const [newSummary, setNewSummary] = useState('');

  const filteredNodes = nodes.filter((node) => {
    const matchesType = filterType === 'all' || node.type === filterType;
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNode = {
      id: `node-${Date.now()}`,
      title: newTitle,
      type: newType,
      summary: newSummary,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      tags: ['Manual', newType],
      details: newSummary,
    };

    setNodes([newNode, ...nodes]);
    setNewTitle('');
    setNewSummary('');
    setShowAddModal(false);
  };

  return (
    <div className="brain-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROJECT MEMORY ENGINE</p>
          <h2>Living Knowledge Graph</h2>
          <p>
            DevPal AI automatically captures architectural decisions, code milestones, and technical context into a living graph.
          </p>
        </div>

        <button className="button" onClick={() => setShowAddModal(true)}>
          <Plus size={17} /> Add Memory Node
        </button>
      </div>

      {/* Toolbar & Filters */}
      <div className="memory-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search memory graph..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills">
          {['all', 'decision', 'architecture', 'code', 'milestone'].map((t) => (
            <button
              key={t}
              className={`filter-btn ${filterType === t ? 'active' : ''}`}
              onClick={() => setFilterType(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <Card className="memory-canvas-card">
        <div className="canvas-header">
          <p className="eyebrow">GRAPH VISUALIZATION</p>
          <small className="muted">{filteredNodes.length} active memory nodes in view</small>
        </div>

        <div className="knowledge-graph-container">
          {/* Animated Connecting Lines */}
          <svg className="graph-lines-svg">
            <line x1="150" y1="80" x2="380" y2="140" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="380" y1="140" x2="600" y2="90" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="150" y1="80" x2="250" y2="220" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5 5" />
          </svg>

          {/* Interactive Nodes */}
          <div className="nodes-grid">
            {filteredNodes.map((node) => {
              const iconMap = {
                decision: CheckCircle2,
                architecture: Layers,
                code: Code2,
                milestone: Milestone,
              };
              const NodeIcon = iconMap[node.type] || BrainCircuit;

              return (
                <div
                  key={node.id}
                  className={`memory-node-card ${node.type} ${selectedNode?.id === node.id ? 'selected' : ''}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="node-icon-header">
                    <div className="node-type-badge">
                      <NodeIcon size={14} />
                      <span>{node.type}</span>
                    </div>
                    <small>{node.date}</small>
                  </div>

                  <h4>{node.title}</h4>
                  <p>{node.summary}</p>

                  <div className="node-tags">
                    {node.tags.map((tag) => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Node Inspection Drawer / Modal */}
      {selectedNode && (
        <div className="modal-backdrop" onClick={() => setSelectedNode(null)}>
          <div className="modal-content node-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedNode(null)}>
              <X size={18} />
            </button>

            <div className="node-detail-header">
              <span className={`type-tag ${selectedNode.type}`}>{selectedNode.type}</span>
              <small>Recorded {selectedNode.date} by {selectedNode.author}</small>
            </div>

            <h2>{selectedNode.title}</h2>
            <p className="node-detail-summary">{selectedNode.summary}</p>

            <div className="node-detail-section">
              <b>Architectural Rationale &amp; Context</b>
              <p>{selectedNode.details}</p>
            </div>

            <div className="modal-actions">
              <button className="button" onClick={() => setSelectedNode(null)}>
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Node Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content add-node-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>
              <X size={18} />
            </button>

            <h3>Capture Memory Node</h3>
            <p className="muted">Add a decision, milestone, or architectural note to the project memory graph.</p>

            <form onSubmit={handleAddNode} className="stack">
              <label>
                Node Title
                <input
                  type="text"
                  placeholder="e.g. Switched to SVG charts engine"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </label>

              <label>
                Category Type
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="select-input"
                >
                  <option value="decision">Decision</option>
                  <option value="architecture">Architecture</option>
                  <option value="code">Code</option>
                  <option value="milestone">Milestone</option>
                </select>
              </label>

              <label>
                Summary &amp; Context
                <textarea
                  placeholder="Describe the context or rationale..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  required
                />
              </label>

              <button className="button" type="submit">
                <Plus size={16} /> Save Memory Node
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
