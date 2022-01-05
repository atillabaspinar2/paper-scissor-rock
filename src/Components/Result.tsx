import React from 'react';

type Props = {
  thinking: boolean;
  winner: string | null;
};

export default function Result({ thinking, winner }: Props) {
  return (
    <>
      {!thinking && winner && (
        <div
          style={{
            gridColumn: `1 / span 3`,
            justifySelf: 'center',
            textAlign: 'center',
            fontSize: '2rem',
            backgroundColor: 'darkred',
            borderRadius: '0.5rem',
            color: 'white',
            margin: '0 0.5rem',
            padding: '0 0.5rem',
            fontWeight: 'bold',
          }}
        >
          {winner}
        </div>
      )}
      {thinking && (
        <div style={{ gridColumn: `1 / span 3`, justifySelf: 'center', fontSize: '2rem', textAlign: 'center' }}>
          Wait a moment please for the result...
        </div>
      )}
    </>
  );
}
