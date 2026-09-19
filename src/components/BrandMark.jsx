import React from 'react';

export default function BrandMark({ size = 30, className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="NetCraft Studio logo"
      className={`brand-mark ${className}`}
      style={{
        width: `${size}px`,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0
      }}
    />
  );
}
