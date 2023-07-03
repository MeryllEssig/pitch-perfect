// Function to check if array B contains at least one value from array A
export function containsAtLeastOne(
  arrayA: string[],
  arrayB: string[]
): boolean {
  // Check if at least one value from array A is in array B
  return arrayA.some((value) => arrayB.includes(value));
}
