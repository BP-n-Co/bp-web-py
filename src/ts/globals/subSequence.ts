import { getSubSequenceIndices } from '../utils/subSequence.js'

export function highlightSubSequence(sub: string, str: string): string {
  const indices = getSubSequenceIndices(sub, str)
  return str
    .split('')
    .map((char, i) =>
      indices.includes(i)
        ? `<strong class="text-blue-500 font-semibold">${char}</strong>`
        : char,
    )
    .join('')
}
