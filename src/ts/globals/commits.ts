export function extractDateLabels(commits: Record<string, any>[]): string[] {
  const dateArray: string[] = []
  const seenDates: Set<string> = new Set()
  for (let i = 0; i < commits.length; i++) {
    const date = commits[i].committedDate.slice(0, 10)
    if (!seenDates.has(date)) {
      dateArray.push(date)
      seenDates.add(date)
    }
  }

  return dateArray
}

export function extractAdditionsPerDay(commits: Record<string, any>[]): {
  date: string
  additions: number
}[] {
  const mapDateAdditions = new Map<string, number>()
  for (let i = 0; i < commits.length; i++) {
    const date = commits[i].committedDate.slice(0, 10)
    const additions = commits[i].additions
    mapDateAdditions.set(date, (mapDateAdditions.get(date) ?? 0) + additions)
  }

  const datesIncluded = extractDateLabels(commits)
  let additionsPerDay = datesIncluded.map((date) => {
    return { date: date, additions: mapDateAdditions.get(date) ?? 0 }
  })
  return additionsPerDay
}

export function extractCumulAdditionsPerDay(
  commits: Record<string, any>[],
): number[] {
  const mapDateAdditions = new Map<string, number>()

  for (let i = 0; i < commits.length; i++) {
    const date = commits[i].committedDate.slice(0, 10)
    const additions = commits[i].additions
    const prev = mapDateAdditions.get(date)
    !prev
      ? mapDateAdditions.set(date, additions)
      : mapDateAdditions.set(date, prev + additions)
  }
  console.log(mapDateAdditions)

  const datesIncluded = extractDateLabels(commits)
  console.log(datesIncluded)
  if (datesIncluded.length === 0) {
    return []
  }

  const firstDayAddition = mapDateAdditions.get(datesIncluded[0])
  const additionsCumul = [!firstDayAddition ? 0 : firstDayAddition]
  for (let i = 1; i < datesIncluded.length; i++) {
    const date = datesIncluded[i]
    const additions = mapDateAdditions.get(date)
    additionsCumul.push(
      !additions ? additionsCumul[i - 1] : additionsCumul[i - 1] + additions,
    )
  }
  console.log(additionsCumul)
  return additionsCumul
}
