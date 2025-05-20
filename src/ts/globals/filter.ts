import { isSubSequence } from '../utils/subSequence.js'

export function filterByField<T extends Record<string, string>>(
  items: T[],
  field: keyof T,
  query: string,
): T[] {
  return items.filter((item) =>
    isSubSequence(query.toLowerCase(), String(item[field]).toLowerCase()),
  )
}
