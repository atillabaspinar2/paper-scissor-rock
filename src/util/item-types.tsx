// order of this array is important,
// assumption: preceding item wins, succeeding item lose.
export type Items = { key: string; imgPath?: string }[];
export const itemTypeArray: Items = [
  {
    key: 'SCISSOR',
    imgPath: process.env.PUBLIC_URL + '/scissor.svg',
  },
  {
    key: 'PAPER',
    imgPath: process.env.PUBLIC_URL + '/paper.svg',
  },
  {
    key: 'ROCK',
    imgPath: process.env.PUBLIC_URL + '/rock.svg',
  },
];

export function findWinner(user1Selection: string | null, user2Selection: string | null, items: Items = itemTypeArray) {
  const item1 = items.findIndex((i) => i.key === user1Selection);
  const item2 = items.findIndex((i) => i.key === user2Selection);
  if (item1 === item2) {
    return 'Tie';
  }
  const [min, max] = item1 <= item2 ? [item1, item2] : [item2, item1];
  let winnerKey = '';
  let loserKey = '';
  if (max - min < items.length / 2) {
    winnerKey = items[min].key;
    loserKey = items[max].key;
  } else {
    winnerKey = items[max].key;
    loserKey = items[min].key;
  }
  const text = winnerKey === user1Selection ? 'User1 wins' : 'User2 wins';
  return `${text} with ${winnerKey} against ${loserKey}`;
}
