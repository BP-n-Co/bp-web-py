export default function isSubSequence(sub: string, str: string): boolean {
  let subIndex = 0
  let strIndex = 0

  while (subIndex < sub.length && strIndex < str.length) {
    if (sub[subIndex] === str[strIndex]) {
      subIndex++
    }
    strIndex++
  }

  return subIndex === sub.length
}
