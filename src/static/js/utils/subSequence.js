export function getSubSequenceIndices(sub, str) {
    let subIndex = 0;
    let strIndex = 0;
    const indices = [];
    while (subIndex < sub.length && strIndex < str.length) {
        if (sub[subIndex].toLowerCase() === str[strIndex].toLowerCase()) {
            indices.push(strIndex);
            subIndex++;
        }
        strIndex++;
    }
    return indices;
}
export function isSubSequence(sub, str) {
    let subIndex = 0;
    let strIndex = 0;
    while (subIndex < sub.length && strIndex < str.length) {
        if (sub[subIndex].toLowerCase() === str[strIndex].toLowerCase()) {
            subIndex++;
        }
        strIndex++;
    }
    return subIndex === sub.length;
}
