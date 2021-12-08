import { lineByLine } from '../common';

let values = null;
let lines  = 0;

(async () => {

  await lineByLine(__dirname + '/input-01', line => {
    if (!line) return;

    const lineValues = line.split('');
    lines++;

    if (!values) {
      values = new Array(lineValues.length).fill(0);
    }

    lineValues.forEach((bit, index) => {
      values[index] += parseInt(bit, 2);
    });
  });

  // Tasks questions
  const commons = values.map((a,i) => (a >= (lines / 2) ? 1 : 0));
  const gamma   = parseInt(commons.join(''), 2);
  const epsilon = parseInt(commons.map(a => 1-a).join(''), 2);
  const power   = gamma * epsilon;

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write('\n');
  process.stdout.write(`Values (total: ${lines})\n`);
  process.stdout.write(`  ${values.join(',')}\n`);
  process.stdout.write('\n');
  process.stdout.write(`Gamma  : ${gamma}\n`);
  process.stdout.write(`Epsilon: ${epsilon}\n`);
  process.stdout.write(`Power  : ${power}\n`);
  process.stdout.write('\n');


})();

