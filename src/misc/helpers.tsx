import { OFFSET } from "./constants";

export function generateOffsetUrl(offset: number = 0): string {
  return `limit=15&offset=${offset}`;
}

export function getTotalPagesForPagination(count: number): number {
  return Math.ceil(count / OFFSET);
}

export function getPokemonIndexFromUrl(url: string): string {
  return url.split("/").reverse()[1];
}
