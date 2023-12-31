export function isHeiban(pitch: string, acceptFirstMoraHigh = false): boolean {
  const pitchPattern = pitch.split('');
  const firstMoraPattern = pitchPattern.shift();
  if (!acceptFirstMoraHigh && firstMoraPattern === 'H') {
    return false;
  }
  for (let i = 0; i < pitchPattern.length; i++) {
    if (pitchPattern[i] === 'L') {
      return false;
    }
  }
  return true;
}
export function isAtamadaka(pitch: string, acceptFirstMoraLow = false): boolean {
  const pitchPattern = pitch.split('');
  const firstMoraPattern = pitchPattern.shift();
  if (!acceptFirstMoraLow && firstMoraPattern === 'L') {
    return false;
  }
  for (let i = 0; i < pitchPattern.length; i++) {
    if (pitchPattern[i] === 'H') {
      return false;
    }
  }
  return true;
}

export function isOdaka(pitch: string, acceptFirstMoraHigh = false): boolean {
  const pitchPattern = pitch.split('');
  const firstMoraPattern = pitchPattern.shift();
  if (!acceptFirstMoraHigh && firstMoraPattern === 'H') {
    return false;
  }
  // We go through except for the last one.
  for (let i = 0; i < pitchPattern.length - 1; i++) {
    if (pitchPattern[i] === 'L') {
      return false;
    }
  }
  return pitchPattern.pop() === 'L' ? true : false;
}

// Useful for counters. Like 13 is atamadaka, the 3 part is full down,
// we want to know we odakaize the 2 parts since they form a whole (when applying common counter rules)
export function isFullDown(pitch: string): boolean {
  return !pitch.split('').includes('H');
}
