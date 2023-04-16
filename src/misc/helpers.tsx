export function generateOffsetUrl(offset: number = 0): string {
  return `pokemon?limit=15&offset=${offset}`;
}
