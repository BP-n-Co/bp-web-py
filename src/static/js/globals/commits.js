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
export function extractModificationsPerDay(commits, keys) {
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
    return modificationsPerDay;
}
export function extractCumulAdditionsPerDay(commits) {
    const mapDateAdditions = new Map();
    for (let i = 0; i < commits.length; i++) {
        const date = commits[i].committedDate.slice(0, 10);
        const additions = commits[i].additions;
        const prev = mapDateAdditions.get(date);
        !prev
            ? mapDateAdditions.set(date, additions)
            : mapDateAdditions.set(date, prev + additions);
    }
    console.log(mapDateAdditions);
    const datesIncluded = extractDateLabels(commits);
    console.log(datesIncluded);
    if (datesIncluded.length === 0) {
        return [];
    }
    const firstDayAddition = mapDateAdditions.get(datesIncluded[0]);
    const additionsCumul = [!firstDayAddition ? 0 : firstDayAddition];
    for (let i = 1; i < datesIncluded.length; i++) {
        const date = datesIncluded[i];
        const additions = mapDateAdditions.get(date);
        additionsCumul.push(!additions ? additionsCumul[i - 1] : additionsCumul[i - 1] + additions);
    }
    console.log(additionsCumul);
    return additionsCumul;
}
