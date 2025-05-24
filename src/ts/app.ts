import { filterByField } from './globals/filter.js'
import { highlightSubSequence } from './globals/subSequence.js'
import {
  extractDateLabels,
  extractModificationsPerDay,
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
    extractModificationsPerDay: <T extends Record<string, string>>(
      commits: T[],
      keys: (keyof T)[],
    ) => {
      date: string
      modifications: number
    }[]
  }
}

window.filterByField = filterByField
window.highlightSubSequence = highlightSubSequence
window.extractDateLabels = extractDateLabels
window.extractModificationsPerDay = extractModificationsPerDay
