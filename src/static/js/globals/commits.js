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
    console.log(dateArray);
    return dateArray;
}
export function extractAdditionsPerDay(commits) {
    var _a;
    const mapDateAdditions = new Map();
    for (let i = 0; i < commits.length; i++) {
        const date = commits[i].committedDate.slice(0, 10);
        const additions = commits[i].additions;
        mapDateAdditions.set(date, ((_a = mapDateAdditions.get(date)) !== null && _a !== void 0 ? _a : 0) + additions);
    }
    console.log(mapDateAdditions);
    const datesIncluded = extractDateLabels(commits);
    console.log(datesIncluded);
    let additionsPerDay = datesIncluded.map((date) => {
        var _a;
        return { date: date, additions: (_a = mapDateAdditions.get(date)) !== null && _a !== void 0 ? _a : 0 };
    });
    console.log(additionsPerDay);
    return additionsPerDay;
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
