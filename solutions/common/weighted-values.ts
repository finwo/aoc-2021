import { WeightedValue } from './weighted-value';

export function weightedValues(arr: any[]): WeightedValue[] {
  const storage: WeightedValue[] = [];
  for(const value of arr) {
    let found: WeightedValue = storage.find(a => a.value === value);
    if (found) {
      found.weight++;
    } else {
      storage.push({
        weight: 1,
        value
      });
    }
  }
  return storage;
}
