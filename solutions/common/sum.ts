export function sum(...n: number[]): number {
  return n.reduce((r,a)=>r+a, 0);
}
