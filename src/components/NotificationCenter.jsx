import React, { useState } from 'react';
import { Bell, CheckCircle2, GitBranch, BrainCircuit, Sparkles, X } from 'lucide-react';

const initialNotifications = [
  {
    id: '1',
    title: 'GitHub Synced',
    desc: 'Repository devpal-ai/core synced 100 commits.',
    time: '2 mins ago',
    type: 'success',
    icon: GitBranch,
  },
  {
    id: '2',
    title: 'Memory Node Added',
    desc: 'New decision captured: Groq LLM architecture.',
    time: '15 mins ago',
    type: 'info',
    icon: BrainCircuit,
  },
  {
    id: '3',
    title: 'AI Recommendation Ready',
    desc: 'Task checkpoint suggestions updated.',
    time: '1 hour ago',
    type: 'ai',
    icon: Sparkles,
  },
];

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.length;

  const clearAll = () => setNotifications([]);

  return (
    <div className="notification-center-wrapper">
      <button
        className="icon-button notification-trigger"
        onClick={() => setOpen(!open)}
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {open && (
        <>
          <div className="popover-backdrop" onClick={() => setOpen(false)} />
          <div className="notification-popover">
            <div className="popover-header">
              <div className="popover-title">
                <Bell size={16} />
                <span>Notifications</span>
              </div>
              {notifications.length > 0 && (
                <button className="text-button" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="empty-notifications">
                  <CheckCircle2 size={24} className="success-icon" />
                  <p>All caught up!</p>
                  <small className="muted">No unread notifications.</small>
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className={`notification-item ${n.type}`}>
                      <div className="notification-icon">
                        <Icon size={16} />
                      </div>
                      <div className="notification-content">
                        <b>{n.title}</b>
                        <p>{n.desc}</p>
                        <small>{n.time}</small>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
