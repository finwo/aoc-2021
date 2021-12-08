import readline      from 'readline';
import fs            from 'fs';
import events        from 'events';

let history        = [];
let sumLast        = null;
let increasedTotal = 0;

let texts = [
  'decreased',
  'no change',
  'increased',
];

function sum(...n) {
  return n.reduce((r,a)=>r+a, 0);
}

(async () => {

  const rl = readline.createInterface({
    input  : fs.createReadStream(__dirname + '/input-01'),
    output : null,
  });

  rl.on('line', line => {
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

  await events.once(rl, 'close');

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write(`Increased ${increasedTotal} times\n`);
  process.stdout.write('\n');


})();

