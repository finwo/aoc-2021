import { lineByLine } from '../common';

let lastDepth      = null;
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
    if (null === lastDepth) {
      process.stdout.write(`${depth} (N/A - no previous measurement)\n`);
    } else {
      const increased = (depth > lastDepth) | 0;
      const decreased = (depth < lastDepth) | 0;
      increasedTotal += increased;

      process.stdout.write(`${depth} (${texts[1 + increased - decreased]})\n`);
    }
    lastDepth = depth;
  });

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write(`Increased ${increasedTotal} times\n`);
  process.stdout.write('\n');

})();

