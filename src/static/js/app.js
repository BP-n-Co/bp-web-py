import { filterByField } from './globals/filter.js';
import { highlightSubSequence } from './globals/subSequence.js';
import { extractModificationsPerDay, extractAuthors, } from './globals/commits.js';
window.filterByField = filterByField;
window.highlightSubSequence = highlightSubSequence;
window.extractModificationsPerDay = extractModificationsPerDay;
window.extractAuthors = extractAuthors;
