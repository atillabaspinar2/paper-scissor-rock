import React from 'react';

export default function Overlay() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#bfbfbf',
        position: 'fixed',
        top: '4rem',
        left: 0,
        zIndex: 1,
        opacity: 0.3,
        cursor: 'wait',
      }}
    ></div>
  );
}
