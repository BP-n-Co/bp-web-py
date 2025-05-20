import isSubSequence from '../utils/isSubSequence.js';
export default function filterByField(items, field, query) {
    return items.filter((item) => isSubSequence(query.toLowerCase(), String(item[field]).toLowerCase()));
}
