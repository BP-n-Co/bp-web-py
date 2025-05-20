import searchComponent from './components/searchComponent.js'
import filterByField from './components/filterByField.js'

declare global {
  interface Window {
    searchComponent: () => any
    filterByField: <T extends Record<string, string>>(
      items: T[],
      field: keyof T,
      query: string,
    ) => T[]
  }
}

window.searchComponent = searchComponent
window.filterByField = filterByField
