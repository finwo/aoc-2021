const events   = require('events');
const fs       = require('fs');
const readline = require('readline');

export function lineByLine(filename: string, cb: (string)=>Promise<void>): Promise<any> {
  const rl = readline.createInterface({
    input  : fs.createReadStream(filename),
    output : null,
  });
  rl.on('line', cb);
  return events.once(rl, 'close');
}
