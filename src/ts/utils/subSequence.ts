export function getSubSequenceIndices(sub: string, str: string): number[] {
  let subIndex = 0
  const indices: number[] = []

  for (
    let strIndex = 0;
    subIndex < sub.length && strIndex < str.length;
    strIndex++
  ) {
    if (sub[subIndex].toLowerCase() === str[strIndex].toLowerCase()) {
      indices.push(strIndex)
      subIndex++
    }
  }

  return indices
}

export function isSubSequence(sub: string, str: string): boolean {
  let subIndex = 0
  let strIndex = 0

  while (subIndex < sub.length && strIndex < str.length) {
    if (sub[subIndex] === str[strIndex]) {
      subIndex++
    }
    strIndex++
  }

  return subIndex === sub.length
}
