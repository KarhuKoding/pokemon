export function generateOffsetUrl(offset: number = 0): string {
  return `pokemon?limit=15&offset=${offset}`;
}

export function getTotalPagesForPagination(count: number): number {
  return Math.ceil(count / 15);
}

export function getPokemonIndexFromUrl(url: string): string {
  return url.split("/").reverse()[1];
}
