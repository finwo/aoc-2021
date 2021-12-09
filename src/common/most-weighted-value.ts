import { WeightedValue } from './weighted-value';

/**
 * Returns the most weighted value
 */
export function mostWeightedValue(values: WeightedValue[], keepDuplicate = true) {
  let chosen: WeightedValue = { weight: -1, value: undefined };
  let matchesFound = 0;
  for(const weightedValue of values) {

    // Track if there are equals
    if (weightedValue.weight == chosen.weight) {
      matchesFound++;
    }

    // Skip lte
    if (weightedValue.weight <= chosen.weight) {
      continue;
    }

    // Found a new high
    chosen = weightedValue;
    matchesFound = 0;
  }

  // equal weights may need to be discarded
  if (matchesFound && (!keepDuplicate)) {
    return undefined;
  }

  // Return highest weighted value
  return chosen.value;
}
