import React from 'react';

export default function BrandMark({ size = 30, className = '' }) {
  const scale = size / 30;
  return (
    <span
      className={`brand-mark ${className}`}
      style={{
        width: `${size}px`,
        height: `${Math.round(28 * scale)}px`,
        position: 'relative',
        display: 'inline-block'
      }}
      aria-hidden="true"
    >
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  );
}
