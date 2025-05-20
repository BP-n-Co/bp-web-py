import { getSubSequenceIndices } from '../utils/subSequence.js'

export function highlightSubSequence(sub: string, str: string): string {
  const indicesSet = new Set(getSubSequenceIndices(sub, str))
  return str
    .split('')
    .map((char, i) =>
      indicesSet.has(i)
        ? `<strong class="text-blue-500 font-semibold">${char}</strong>`
        : char,
    )
    .join('')
}
