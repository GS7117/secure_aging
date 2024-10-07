// SkeletonCard.js
import React from 'react';
import './SkeletonCard.css'; // 样式文件可以自定义

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
    </div>
  );
}

export default SkeletonCard;
