import React, { useEffect, useState } from 'react';
import {
  ListTodo,
  CheckCircle2,
  Sparkles,
  Plus,
  Clock,
  AlertCircle,
  Trash2,
  ArrowRight,
  Filter,
  Check,
} from 'lucide-react';
import Card from '../components/Card';

const initialTasks = [
  { id: '1', title: 'Complete v1.1 DevPal AI Branding Overhaul', priority: 'high', status: 'completed', checkpoint: 'Renamed package and updated titles across codebase.', dueDate: 'Today' },
  { id: '2', title: 'Implement Command Palette Overlay (Ctrl + K)', priority: 'medium', status: 'completed', checkpoint: 'Added global key listener and keyboard navigation.', dueDate: 'Today' },
  { id: '3', title: 'Integrate SVG Charts into Repository Analytics', priority: 'medium', status: 'in_progress', checkpoint: 'Drafting area charts for repository health.', dueDate: 'Tomorrow' },
  { id: '4', title: 'Deploy v1.1 Release Build to Vercel/Netlify', priority: 'high', status: 'in_progress', checkpoint: 'Build verified locally with 0 warnings.', dueDate: 'Tomorrow' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCheckpoint, setNewCheckpoint] = useState('');

  // AI Next Step State
  const [context, setContext] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then((d) => {
        if (d.tasks && d.tasks.length > 0) {
          // Merge server tasks
          const serverMapped = d.tasks.map((t) => ({
            id: t.id,
            title: t.title,
            priority: 'medium',
            status: t.status || 'in_progress',
            checkpoint: t.checkpoint || 'Created',
            dueDate: 'Today',
          }));
          setTasks((prev) => [...serverMapped, ...prev]);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const taskObj = {
      id: Date.now().toString(),
      title: newTitle,
      priority: newPriority,
      status: 'in_progress',
      checkpoint: newCheckpoint || 'Checkpoint logged',
      dueDate: 'Soon',
    };

    setTasks([taskObj, ...tasks]);

    // Push to backend endpoint
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, checkpoint: newCheckpoint }),
      });
    } catch (e) {}

    setNewTitle('');
    setNewCheckpoint('');
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === 'completed' ? 'in_progress' : 'completed' } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleSuggestNext = async () => {
    setIsThinking(true);
    setSuggestion('');
    try {
      const res = await fetch('/api/tasks/next-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: context || 'Current development task continuity' }),
      });
      const data = await res.json();
      setSuggestion(data.suggestion || 'Recommended next step: Run `npm run build` and tag git release `v1.1.0`.');
    } catch (e) {
      setSuggestion('Recommended next step: Review commit log, execute verification build, and deploy.');
    } finally {
      setIsThinking(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'in_progress') return t.status === 'in_progress';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="tasks-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">TASK CONTINUITY SUITE</p>
          <h2>Checkpoints &amp; AI Recommendations</h2>
          <p>Pick up exactly where you stopped with context-aware checkpoints and AI guidance.</p>
        </div>
      </div>

      <div className="grid">
        {/* Left Column: Task List & Form */}
        <div className="tasks-main-column">
          <Card className="add-task-card">
            <p className="eyebrow">LOG CHECKPOINT</p>
            <h3>Add Task Checkpoint</h3>
            <form onSubmit={handleAddTask} className="task-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="What are you currently working on?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="select-input"
                >
                  <option value="low">Priority: Low</option>
                  <option value="medium">Priority: Medium</option>
                  <option value="high">Priority: High</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Optional checkpoint notes or blocker summary..."
                value={newCheckpoint}
                onChange={(e) => setNewCheckpoint(e.target.value)}
              />

              <button className="button" type="submit">
                <Plus size={16} /> Save Checkpoint
              </button>
            </form>
          </Card>

          <Card className="task-list-card">
            <div className="card-title">
              <div>
                <p className="eyebrow">CHECKPOINTS</p>
                <h3>Active &amp; Completed Tasks</h3>
              </div>

              <div className="filter-pills">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({tasks.length})
                </button>
                <button
                  className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
                  onClick={() => setFilter('in_progress')}
                >
                  In Progress
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="tasks-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-tasks">No tasks matching selected filter.</div>
              ) : (
                filteredTasks.map((t) => (
                  <div key={t.id} className={`task-item-card ${t.status}`}>
                    <button
                      className="task-checkbox"
                      onClick={() => toggleTaskStatus(t.id)}
                      title="Toggle completion status"
                    >
                      {t.status === 'completed' ? <CheckCircle2 size={20} className="check-icon" /> : <div className="checkbox-ring" />}
                    </button>

                    <div className="task-content">
                      <b className="task-title">{t.title}</b>
                      <p className="task-checkpoint"><Clock size={13} /> {t.checkpoint}</p>
                    </div>

                    <div className="task-meta">
                      <span className={`priority-badge ${t.priority}`}>{t.priority}</span>
                      <button className="delete-task-btn" onClick={() => deleteTask(t.id)} title="Delete task">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: AI Next Step Recommendation */}
        <div className="ai-next-column">
          <Card>
            <p className="eyebrow">AI TASK GUIDANCE</p>
            <h3>Suggest Next Step</h3>
            <p className="muted">Describe your current blocker or task context to get AI recommendations.</p>

            <textarea
              className="context-textarea"
              placeholder="e.g., Finished branding overhaul, need to verify build output and tag release..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
            />

            <button
              className="button full-width"
              onClick={handleSuggestNext}
              disabled={isThinking}
            >
              <Sparkles size={16} /> {isThinking ? 'Generating Suggestion...' : 'Suggest Next Step'}
            </button>

            {suggestion && (
              <div className="ai-recommendation-box">
                <div className="box-header">
                  <Sparkles size={16} className="sparkle-icon" />
                  <b>AI Next Step Recommendation</b>
                </div>
                <p>{suggestion}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
