import React from 'react';

export default function DevPalLogo({ size = 34, showText = true, animated = true, className = '' }) {
  return (
    <div className={`devpal-brand-container ${className}`}>
      <div className="devpal-logo-box" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="devpal-logo-svg"
        >
          <rect width="48" height="48" rx="14" fill="url(#devpal-gradient)" />
          
          {/* Code brackets */}
          <path
            d="M15 16L9 24L15 32"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33 16L39 24L33 32"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Core Pulse */}
          <circle cx="24" cy="24" r="3.5" fill="#E9D5FF" />
          <circle
            cx="24"
            cy="24"
            r="7"
            stroke="#A855F7"
            strokeWidth="1.8"
            strokeDasharray="3 2"
            className={animated ? "devpal-ai-spin" : ""}
          />

          <defs>
            <linearGradient id="devpal-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#4F46E5" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Live AI Pulse Ring */}
        {animated && (
          <span className="devpal-pulse-dot" title="DevPal Memory Engine Active">
            <span className="pulse-ping" />
            <span className="pulse-core" />
          </span>
        )}
      </div>

      {showText && (
        <div className="devpal-brand-text">
          <span className="devpal-brand-name">
            DevPal <span className="devpal-ai-accent">AI</span>
          </span>
        </div>
      )}
    </div>
  );
}
