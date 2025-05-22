import { filterByField } from './globals/filter.js';
import { highlightSubSequence } from './globals/subSequence.js';
import { extractAdditionsPerDay, extractDateLabels, extractCumulAdditionsPerDay, } from './globals/commits.js';
window.filterByField = filterByField;
window.highlightSubSequence = highlightSubSequence;
window.extractDateLabels = extractDateLabels;
window.extractAdditionsPerDay = extractAdditionsPerDay;
window.extractCumulAdditionsPerDay = extractCumulAdditionsPerDay;
