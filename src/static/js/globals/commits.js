export function extractDateLabels(commits) {
    const dateArray = [];
    const seenDates = new Set();
    for (let i = 0; i < commits.length; i++) {
        const date = commits[i].committedDate.slice(0, 10);
        if (!seenDates.has(date)) {
            dateArray.push(date);
            seenDates.add(date);
        }
    }
    return dateArray;
}
export function extractModificationsPerDay(commits, keys, cumul) {
    var _a;
    const mapDateModifications = new Map();
    for (let ic = 0; ic < commits.length; ic++) {
        for (let ik = 0; ik < keys.length; ik++) {
            const date = commits[ic]['committedDate'].slice(0, 10);
            const modifications = commits[ic][keys[ik]];
            mapDateModifications.set(date, ((_a = mapDateModifications.get(date)) !== null && _a !== void 0 ? _a : 0) + modifications);
        }
    }
    const dates = extractDateLabels(commits);
    let modificationsPerDay = dates.map((date) => {
        var _a;
        return { date: date, modifications: (_a = mapDateModifications.get(date)) !== null && _a !== void 0 ? _a : 0 };
    });
    if (cumul) {
        for (let i = modificationsPerDay.length - 1; i > 0; i--) {
            modificationsPerDay[i - 1].modifications +=
                modificationsPerDay[i].modifications;
        }
    }
    return modificationsPerDay;
}
