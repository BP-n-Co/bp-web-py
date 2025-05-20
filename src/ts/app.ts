import filterByField from './components/filterByField.js'

declare global {
  interface Window {
    filterByField: <T extends Record<string, string>>(
      items: T[],
      field: keyof T,
      query: string,
    ) => T[]
  }
}

window.filterByField = filterByField
