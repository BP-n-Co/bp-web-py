export function extractDateLabels(commits, fromMs, untilMs) {
    const dateArray = [];
    const seenDates = new Set();
    for (let i = 0; i < commits.length; i++) {
        if (fromMs && new Date(commits[i].committedDate).getTime() < fromMs) {
            continue;
        }
        if (untilMs && new Date(commits[i].committedDate).getTime() > untilMs) {
            continue;
        }
        const date = commits[i].committedDate.slice(0, 10);
        if (!seenDates.has(date)) {
            dateArray.push(date);
            seenDates.add(date);
        }
    }
    return dateArray;
}
export function extractModificationsPerDay(commits, keys, cumul, selectedAuthor, fromMs, untilMs) {
    var _a;
    const mapDateModifications = new Map();
    for (let ic = 0; ic < commits.length; ic++) {
        for (let ik = 0; ik < keys.length; ik++) {
            if (selectedAuthor && selectedAuthor !== commits[ic].authorName) {
                continue;
            }
            if (fromMs && new Date(commits[ic].committedDate).getTime() < fromMs) {
                continue;
            }
            if (untilMs && new Date(commits[ic].committedDate).getTime() > untilMs) {
                continue;
            }
            const date = commits[ic]['committedDate'].slice(0, 10);
            const modifications = commits[ic][keys[ik]];
            mapDateModifications.set(date, ((_a = mapDateModifications.get(date)) !== null && _a !== void 0 ? _a : 0) + modifications);
        }
    }
    const dates = extractDateLabels(commits, fromMs, untilMs);
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
    const oldestDate = new Date(modificationsPerDay[modificationsPerDay.length - 1].date);
    if (fromMs && oldestDate.getTime() > fromMs) {
        oldestDate.setDate(oldestDate.getDate() - 1);
        modificationsPerDay.push({
            date: oldestDate.toISOString().split('T')[0],
            modifications: 0,
        });
    }
    if (fromMs && oldestDate.getTime() > fromMs) {
        modificationsPerDay.push({
            date: new Date(fromMs).toISOString().split('T')[0],
            modifications: 0,
        });
    }
    const latestDate = new Date(modificationsPerDay[0].date);
    if (untilMs && latestDate.getTime() < untilMs) {
        latestDate.setDate(latestDate.getDate() + 1);
        modificationsPerDay.unshift({
            date: latestDate.toISOString().split('T')[0],
            modifications: 0,
        });
    }
    if (untilMs && latestDate.getTime() < untilMs) {
        modificationsPerDay.unshift({
            date: new Date(untilMs).toISOString().split('T')[0],
            modifications: 0,
        });
    }
    return modificationsPerDay;
}
export function extractAuthors(commits) {
    const mapNameAvatarUrl = new Map();
    for (let i = 0; i < commits.length; i++) {
        mapNameAvatarUrl.set(commits[i].authorName, commits[i].authorAvatarUrl);
    }
    const authors = Array.from(mapNameAvatarUrl).map(([name, url]) => ({
        name: name,
        avatarUrl: url,
    }));
    return authors;
}
export function minMaxDatesMs(commits) {
    const dates = extractDateLabels(commits);
    const datesNumber = dates.map((date) => new Date(date).getTime());
    const minMax = {
        min: Math.min.apply(null, datesNumber),
        max: Math.max.apply(null, datesNumber),
    };
    return minMax;
}
