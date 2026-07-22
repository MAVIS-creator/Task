import React from 'react';

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line header" />
      <div className="skeleton-line sub" />
      <div className="skeleton-block" />
    </div>
  );
}

export function SkeletonMetrics() {
  return (
    <div className="metrics">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
