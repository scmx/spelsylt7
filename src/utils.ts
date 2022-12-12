import { Position } from "./position";

export function sortBy<T, V>(
  mapper: (item: T) => V,
  order: "asc" | "desc" = "asc"
): (a: T, b: T) => -1 | 0 | 1 {
  return function sortBy(a, b) {
    const av = mapper(a);
    const bv = mapper(b);
    if (order === "asc") return av < bv ? -1 : av > bv ? 1 : 0;
    return av < bv ? 1 : av > bv ? -1 : 0;
  };
}

export function distance(a: Position, b: Position): number {
  return Math.hypot(a.y - b.y, a.x - b.x);
}
