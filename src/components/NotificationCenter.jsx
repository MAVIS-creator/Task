import React, { useState } from 'react';

const initialNotifications = [
  {
    id: '1',
    title: 'GitHub Repositories Synced',
    desc: 'devpal-ai/main & memory-engine synced 142 commits.',
    time: '2 mins ago',
    type: 'success',
    icon: 'sync',
  },
  {
    id: '2',
    title: 'Memory Graph Updated',
    desc: 'Captured decision: Groq LLM reasoning engine.',
    time: '15 mins ago',
    type: 'info',
    icon: 'psychology',
  },
  {
    id: '3',
    title: 'AI Recommendation Ready',
    desc: 'Task checkpoint guidance updated.',
    time: '1 hour ago',
    type: 'ai',
    icon: 'auto_awesome',
  },
];

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full border border-white/10 bg-surface-container hover:bg-white/10 text-on-surface flex items-center justify-center transition-all cursor-pointer relative"
        title="Notifications"
      >
        <span className="material-symbols-outlined text-lg">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-80 bg-[#13131b] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#171721]">
              <div className="flex items-center gap-2 font-display font-semibold text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-base">notifications</span>
                <span>Notifications</span>
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-primary hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-xs space-y-2">
                  <span className="material-symbols-outlined text-emerald-400 text-3xl">check_circle</span>
                  <p className="font-semibold text-on-surface">All caught up!</p>
                  <p>No new notifications right now.</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="p-3.5 flex gap-3 hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-base">{n.icon}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <b className="text-xs font-semibold text-on-surface block leading-tight">{n.title}</b>
                      <p className="text-[11px] text-on-surface-variant leading-snug">{n.desc}</p>
                      <span className="text-[10px] text-on-surface-variant font-code block">{n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
