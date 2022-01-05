import { findWinner, Items } from './item-types';

// Test with extended options
const items: Items = [
  {
    key: 'SCISSOR',
  },
  {
    key: 'PAPER',
  },
  {
    key: 'ROCK',
  },
  {
    key: 'SPOCK',
  },
  {
    key: 'LIZARD',
  },
];

describe('Item types ', () => {
  test('Find winner should return "tie"', () => {
    const result = findWinner('ROCK', 'ROCK', items);
    expect(result).toMatch(/tie/i);
  });
  test('Find winner should return "User1 wins with ROCK against SPOCK"', () => {
    const result = findWinner('ROCK', 'SPOCK', items);
    expect(result).toMatch(/User1 wins with ROCK against SPOCK/i);
  });
  test('Find winner should return "User1 wins with ROCK against LIZARD', () => {
    const result = findWinner('ROCK', 'LIZARD', items);
    expect(result).toMatch(/User1 wins with ROCK against LIZARD/i);
  });
  test('Find winner should return "User2 wins with SCISSOR against ROCK', () => {
    const result = findWinner('ROCK', 'SCISSOR', items);
    expect(result).toMatch(/User2 wins with SCISSOR against ROCK/i);
  });
  test('Find winner should return "User2 wins with PAPER against ROCK', () => {
    const result = findWinner('ROCK', 'PAPER', items);
    expect(result).toMatch(/User2 wins with PAPER against ROCK/i);
  });
});

export default {};
