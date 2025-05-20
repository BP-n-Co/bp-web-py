import { filterByField } from './globals/filter.js'
import { highlightSubSequence } from './globals/subSequence.js'
import {
  extractAdditionsPerDay,
  extractDateLabels,
  extractCumulAdditionsPerDay,
} from './globals/commits.js'
declare global {
  interface Window {
    filterByField: <T extends Record<string, string>>(
      items: T[],
      field: keyof T,
      query: string,
    ) => T[]
    highlightSubSequence: (sub: string, str: string) => string
    extractDateLabels: (commits: Record<string, any>[]) => string[]
    extractAdditionsPerDay: (commits: Record<string, any>[]) => {
      date: string
      additions: number
    }[]
    extractCumulAdditionsPerDay: (commits: Record<string, any>[]) => number[]
  }
}

window.filterByField = filterByField
window.highlightSubSequence = highlightSubSequence
window.extractDateLabels = extractDateLabels
window.extractAdditionsPerDay = extractAdditionsPerDay
window.extractCumulAdditionsPerDay = extractCumulAdditionsPerDay
