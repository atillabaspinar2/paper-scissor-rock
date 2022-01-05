// order of this array is important,
// assumption: preceding item wins, succeeding item lose.
export const itemTypeArray = [
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

export function findWinner(humanSelection: string | null, computerSelection: string | null) {
  const item1 = itemTypeArray.findIndex((i) => i.key === humanSelection);
  const item2 = itemTypeArray.findIndex((i) => i.key === computerSelection);
  if (item1 === item2) {
    return 'Tie';
  }
  const [min, max] = item1 <= item2 ? [item1, item2] : [item2, item1];
  let winnerKey = '';
  let loserKey = '';
  if (max - min < itemTypeArray.length / 2) {
    winnerKey = itemTypeArray[min].key;
    loserKey = itemTypeArray[max].key;
  } else {
    winnerKey = itemTypeArray[max].key;
    loserKey = itemTypeArray[min].key;
  }
  const text = winnerKey === humanSelection ? 'Human wins' : 'Computer wins';
  return `${text} with ${winnerKey} against ${loserKey}`;
}
