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

export function extractModificationsPerDay<T extends Record<string, any>>(
  commits: T[],
  keys: (keyof T)[],
  cumul?: boolean,
  selectedAuthor?: string,
): {
  date: string
  modifications: number
}[] {
  const mapDateModifications = new Map<string, number>()
  for (let ic = 0; ic < commits.length; ic++) {
    for (let ik = 0; ik < keys.length; ik++) {
      if (selectedAuthor && selectedAuthor !== commits[ic].authorName) {
        continue
      }
      const date = commits[ic]['committedDate'].slice(0, 10)
      const modifications = commits[ic][keys[ik]]
      mapDateModifications.set(
        date,
        (mapDateModifications.get(date) ?? 0) + modifications,
      )
    }
  }

  const dates = extractDateLabels(commits)
  let modificationsPerDay = dates.map((date) => {
    return { date: date, modifications: mapDateModifications.get(date) ?? 0 }
  })
  if (cumul) {
    for (let i = modificationsPerDay.length - 1; i > 0; i--) {
      modificationsPerDay[i - 1].modifications +=
        modificationsPerDay[i].modifications
    }
  }
  return modificationsPerDay
}

export function extractAuthors(
  commits: Record<string, any>,
): { name: string; avatarUrl: string }[] {
  const mapNameAvatarUrl = new Map<string, string>()
  for (let i = 0; i < commits.length; i++) {
    mapNameAvatarUrl.set(commits[i].authorName, commits[i].authorAvatarUrl)
  }
  const authors: { name: string; avatarUrl: string }[] = Array.from(
    mapNameAvatarUrl,
  ).map(([name, url]) => ({
    name: name,
    avatarUrl: url,
  }))
  return authors
}
