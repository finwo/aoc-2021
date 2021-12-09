import { lineByLine, sum } from '../common';

let history        = [];
let sumLast        = null;
let increasedTotal = 0;

let texts = [
  'decreased',
  'no change',
  'increased',
];

(async () => {

  await lineByLine(__dirname + '/input', line => {
    if ((!line) || isNaN(line)) return;
    const depth = parseInt(line);
    history.push(depth);

    while (history.length >= 3) {
      const sumCurrent = sum(...history.slice(0,3));
      history.shift();

      if (null === sumLast) {
        process.stdout.write(`${sumCurrent} (N/A - no previous measurement)\n`);
      } else {
        const increased = (sumCurrent > sumLast) | 0;
        const decreased = (sumCurrent < sumLast) | 0;
        increasedTotal += increased;
        process.stdout.write(`${sumCurrent} (${texts[1 + increased - decreased]})\n`);
      }

      sumLast = sumCurrent;
    }

  });

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write(`Increased ${increasedTotal} times\n`);
  process.stdout.write('\n');

})();

