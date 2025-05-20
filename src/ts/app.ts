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
    extractAdditionsPerDay: <T extends Record<string, any>>(
      commits: T[],
    ) => {
      date: string
      additions: number
    }[]
    extractDateLabels: <T extends Record<string, any>>(commits: T[]) => string[]
    extractCumulAdditionsPerDay: <T extends Record<string, any>>(
      commits: T[],
    ) => number[]
  }
}

window.filterByField = filterByField
window.highlightSubSequence = highlightSubSequence
window.extractAdditionsPerDay = extractAdditionsPerDay
window.extractDateLabels = extractDateLabels
window.extractCumulAdditionsPerDay = extractCumulAdditionsPerDay
