import { isSubSequence } from '../utils/subSequence.js';
export function filterByField(items, field, query) {
    return items.filter((item) => isSubSequence(query, item[field]));
}
