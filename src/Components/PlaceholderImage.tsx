import React from 'react';
type Props = {
  gridCol: string;
};
export default function PlaceholderImage({ gridCol }: Props) {
  return (
    <img
      style={{ gridColumn: gridCol, justifySelf: 'center', height: '5rem' }}
      src={process.env.PUBLIC_URL + '/question-mark.svg'}
    />
  );
}
