import readline from 'readline';
import fs       from 'fs';
import events   from 'events';

export function lineByLine(filename: string, cb: ()=>{}): Promise<void> {
  const rl = readline.createInterface({
    input  : fs.createReadStream(filename),
    output : null,
  });
  rl.on('line', cb);
  return events.once(rl, 'close');
}
