import React from 'react';
import { AlertTriangle, LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content logout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="logout-icon-wrapper">
          <AlertTriangle size={28} className="warning-icon" />
        </div>

        <h3>Sign Out of DevPal AI?</h3>
        <p className="muted">
          Your current session state and project context will be preserved locally, but you will need to sign in again to access live AI workspace features.
        </p>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="danger-button" onClick={onConfirm}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
