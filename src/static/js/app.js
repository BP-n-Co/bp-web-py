import { filterByField } from './globals/filter.js';
import { highlightSubSequence } from './globals/subSequence.js';
import { extractDateLabels, extractCumulAdditionsPerDay, extractModificationsPerDay, } from './globals/commits.js';
window.filterByField = filterByField;
window.highlightSubSequence = highlightSubSequence;
window.extractDateLabels = extractDateLabels;
window.extractModificationsPerDay = extractModificationsPerDay;
window.extractCumulAdditionsPerDay = extractCumulAdditionsPerDay;
