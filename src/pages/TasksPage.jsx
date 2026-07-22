import React, { useEffect, useState } from 'react';

const initialTasks = [
  { id: '1', title: 'Complete v1.1 DevPal AI Branding Overhaul', priority: 'high', status: 'completed', checkpoint: 'Renamed package and updated titles across codebase.', dueDate: 'Today' },
  { id: '2', title: 'Implement Command Palette Overlay (Ctrl + K)', priority: 'medium', status: 'completed', checkpoint: 'Added global key listener and keyboard navigation.', dueDate: 'Today' },
  { id: '3', title: 'Integrate Task UI Design Templates', priority: 'high', status: 'in_progress', checkpoint: 'Applying Light & Dark mode glassmorphism panels.', dueDate: 'Today' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCheckpoint, setNewCheckpoint] = useState('');
  const [context, setContext] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then((d) => {
        if (d.tasks && d.tasks.length > 0) {
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
      setSuggestion(data.suggestion || 'Recommended next step: Execute `npm run build` and tag git release `v1.1.0`.');
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
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="mb-4">
        <p className="text-primary font-display font-medium tracking-widest text-xs uppercase mb-1">
          TASK CONTINUITY SUITE
        </p>
        <h1 className="font-display text-3xl font-bold text-on-surface">Checkpoints &amp; Recommendations</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Pick up exactly where you stopped with context-aware checkpoints and AI recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Add Task Card */}
          <div className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-on-surface mb-4">Log Checkpoint</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Task title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-2 bg-surface-container border border-outline/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                  required
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="bg-surface-container border border-outline/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none"
                >
                  <option value="low">Priority: Low</option>
                  <option value="medium">Priority: Medium</option>
                  <option value="high">Priority: High</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Checkpoint note..."
                value={newCheckpoint}
                onChange={(e) => setNewCheckpoint(e.target.value)}
                className="w-full bg-surface-container border border-outline/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none"
              />

              <button type="submit" className="bg-primary hover:bg-primary-container text-on-primary font-display font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add_task</span>
                <span>Save Checkpoint</span>
              </button>
            </form>
          </div>

          {/* Task List Card */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-display font-semibold text-lg text-on-surface">Active Checkpoints</h3>
              <div className="flex gap-2 text-xs">
                {['all', 'in_progress', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full uppercase font-code ${
                      filter === f ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredTasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline/20">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleTaskStatus(t.id)} className="text-primary cursor-pointer">
                      <span className="material-symbols-outlined text-xl">
                        {t.status === 'completed' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                    <div>
                      <b className={`text-sm text-on-surface block ${t.status === 'completed' ? 'line-through opacity-60' : ''}`}>{t.title}</b>
                      <span className="text-xs text-on-surface-variant">{t.checkpoint}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-code uppercase px-2.5 py-1 rounded-full ${
                    t.priority === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Next Step Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg text-on-surface">AI Task Next-Step</h3>
            <textarea
              placeholder="Describe current blocker or task context..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
              className="w-full bg-surface-container border border-outline/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none"
            />
            <button
              onClick={handleSuggestNext}
              disabled={isThinking}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-display font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 glow-indigo"
            >
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              <span>{isThinking ? 'Generating...' : 'Suggest Next Step'}</span>
            </button>

            {suggestion && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm space-y-2">
                <b className="text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">auto_awesome</span> AI Recommendation
                </b>
                <p className="text-on-surface text-xs leading-relaxed">{suggestion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
