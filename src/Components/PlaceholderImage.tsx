import React from 'react';

export default function PlaceholderImage() {
  return (
    <img
      style={{ gridColumn: `3`, justifySelf: 'center', height: '5rem' }}
      src={process.env.PUBLIC_URL + '/question-mark.svg'}
    />
  );
}
