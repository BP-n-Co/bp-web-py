import { filterByField } from './globals/filter.js'
import { highlightSubSequence } from './globals/subSequence.js'
import {
  extractModificationsPerDay,
  extractAuthors,
} from './globals/commits.js'
import { slider } from './globals/slider.js'
declare global {
  interface Window {
    filterByField: <T extends Record<string, string>>(
      items: T[],
      field: keyof T,
      query: string,
    ) => T[]
    highlightSubSequence: (sub: string, str: string) => string
    extractModificationsPerDay: <T extends Record<string, string>>(
      commits: T[],
      keys: (keyof T)[],
      cumul?: boolean,
      selectedAuthor?: string,
    ) => {
      date: string
      modifications: number
    }[]
    extractAuthors(
      commits: Record<string, any>,
    ): { name: string; avatarUrl: string }[]
    priceSlider(
      min: number,
      max: number,
      minGap: number,
    ): {
      min: number
      max: number
      minGap: number
      readonly minPercent: number
      readonly maxPercent: number
      update(event: Event): void
      init(): void
    }
  }
}

window.filterByField = filterByField
window.highlightSubSequence = highlightSubSequence
window.extractModificationsPerDay = extractModificationsPerDay
window.extractAuthors = extractAuthors
window.priceSlider = slider
