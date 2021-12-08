import readline      from 'readline';
import fs            from 'fs';
import events        from 'events';


let lastDepth      = null;
let increasedTotal = 0;

let texts = [
  'decreased',
  'no change',
  'increased',
];

(async () => {

  const rl = readline.createInterface({
    input  : fs.createReadStream(__dirname + '/input-01'),
    output : null,
  });

  rl.on('line', line => {
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

  await events.once(rl, 'close');

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write(`Increased ${increasedTotal} times\n`);
  process.stdout.write('\n');


})();

