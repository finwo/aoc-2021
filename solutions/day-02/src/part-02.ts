import { lineByLine } from './line-by-line';

const position = { x: 0, y: 0 };
let   aim      = 0;

(async () => {

  await lineByLine(__dirname + '/input', line => {
    if (!line) return;
    let [command,range] = line.split(' ');
    range = parseInt(range);

    switch(command) {
      case 'up'     : aim -= range; break;
      case 'down'   : aim += range; break;
      case 'forward': position.x += range; position.y += aim * range; break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  });

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write('\n');
  process.stdout.write(`Position\n`);
  process.stdout.write(`  X: ${position.x}\n`);
  process.stdout.write(`  Y: ${position.y}\n`);
  process.stdout.write('\n');
  process.stdout.write(`Puzzle\n`);
  process.stdout.write(`  mult: ${position.x * position.y}\n`);
  process.stdout.write('\n');


})();

