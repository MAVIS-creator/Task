import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  FolderGit2,
  BrainCircuit,
  Bot,
  ListTodo,
  FileText,
  Settings,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

const commands = [
  { id: 'overview', title: 'Go to Overview Dashboard', category: 'Navigation', icon: LayoutDashboard, path: '/overview' },
  { id: 'repository', title: 'Go to Repository Intelligence', category: 'Navigation', icon: FolderGit2, path: '/repository' },
  { id: 'brain', title: 'Go to Project Memory Engine', category: 'Navigation', icon: BrainCircuit, path: '/brain' },
  { id: 'assistant', title: 'Ask AI Assistant', category: 'Navigation', icon: Bot, path: '/assistant' },
  { id: 'tasks', title: 'Manage Task Checkpoints', category: 'Navigation', icon: ListTodo, path: '/tasks' },
  { id: 'documents', title: 'Generate Document Studio', category: 'Navigation', icon: FileText, path: '/documents' },
  { id: 'settings', title: 'Open Settings & Preferences', category: 'Navigation', icon: Settings, path: '/settings' },
  { id: 'repo-main', title: 'Switch Repository: devpal-ai/main', category: 'Repositories', icon: FolderGit2, path: '/repository' },
  { id: 'repo-memory', title: 'Switch Repository: devpal-ai/memory-engine', category: 'Repositories', icon: FolderGit2, path: '/repository' },
  { id: 'action-ask', title: 'Quick Action: Ask AI about repository architecture', category: 'Actions', icon: Sparkles, path: '/assistant' },
  { id: 'action-doc', title: 'Quick Action: Generate README document', category: 'Actions', icon: FileText, path: '/documents' },
];

export default function CommandPalette({ isOpen, onClose, onToggleTheme, isDark }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    onClose();
    if (item.path) {
      navigate(item.path);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop command-palette-backdrop" onClick={onClose}>
      <div className="command-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="command-search-header">
          <Search size={20} className="search-icon" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search repos, tasks, memory..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div className="command-list">
          {filtered.length === 0 ? (
            <div className="empty-command-search">No matching commands or pages found.</div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`command-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="command-item-left">
                    <div className="command-icon">
                      <Icon size={16} />
                    </div>
                    <span className="command-title">{item.title}</span>
                  </div>
                  <div className="command-item-right">
                    <span className="command-category">{item.category}</span>
                    <ArrowRight size={14} className="command-arrow" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="command-footer">
          <div className="command-footer-hints">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate
            </span>
            <span>
              <kbd>↵</kbd> Select
            </span>
            <span>
              <kbd>ESC</kbd> Close
            </span>
          </div>

          <button className="theme-quick-toggle" onClick={onToggleTheme}>
            {isDark ? <Sun size={14} /> : <Moon size={14} />} {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
