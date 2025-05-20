import { filterByField } from './globals/filter.js'
import { highlightSubSequence } from './globals/subSequence.js'
declare global {
  interface Window {
    filterByField: <T extends Record<string, string>>(
      items: T[],
      field: keyof T,
      query: string,
    ) => T[]
    highlightSubSequence: (sub: string, str: string) => string
  }
}

window.filterByField = filterByField
window.highlightSubSequence = highlightSubSequence
