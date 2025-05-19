export function parseNDJSON<T>(ndjsonString: string): T[] {
  return ndjsonString
    .trim()
    .split('\n')
    .map(line => JSON.parse(line));
}