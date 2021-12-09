import {
  lineByLine,
  weightedValues,
  mostWeightedValue
} from '../common';

// let values = null;
// let lines  = 0;

(async () => {

  // Read whole input into memory this time
  const storage = [];
  await lineByLine(__dirname + '/input', line => {
    if (!line) return;
    storage.push(line.split('').map(v => parseInt(v, 2)));
  });

  // The things we need to filter
  let oxygenReadings   = storage.slice();
  let scrubberReadings = storage.slice();

  // Filter the oxygen readings
  for(let idx = 0 ; oxygenReadings.length > 1 ; idx++) {
    const column     = oxygenReadings.map(a => a[idx]);
    const weights    = weightedValues(column);
    let   mostCommon = mostWeightedValue(weights, false);

    // Equal = 1, as specified
    if (mostCommon === undefined) {
      mostCommon = 1;
    }

    // Remove non-matching values
    oxygenReadings = oxygenReadings.filter(v => v[idx] == mostCommon);
  }

  // Filter the scrubber readings
  for(let idx = 0 ; scrubberReadings.length > 1 ; idx++) {
    const column     = scrubberReadings.map(a => a[idx]);
    const weights    = weightedValues(column);
    let   mostCommon = mostWeightedValue(weights, false);

    // Equal = 1, as inverted of specified
    if (mostCommon === undefined) {
      mostCommon = 1;
    }

    // Invert, we're working binary-ish
    const leastCommon = (!mostCommon) | 0;

    // Remove non-matching values
    scrubberReadings = scrubberReadings.filter(v => v[idx] == leastCommon);
  }

  // Convert into numbers again
  const oxygenRating      = parseInt(oxygenReadings[0].join(''), 2);
  const scrubberRating    = parseInt(scrubberReadings[0].join(''), 2);
  const lifeSupportRating = oxygenRating * scrubberRating;

  process.stdout.write('\n\n');
  process.stdout.write('---[ REPORT ]---\n');
  process.stdout.write('\n');
  process.stdout.write(`oxygen rating       : ${oxygenRating}\n`);
  process.stdout.write(`scrubber rating     : ${scrubberRating}\n`);
  process.stdout.write(`life support rating : ${lifeSupportRating}\n`);
  process.stdout.write('\n');

})();

