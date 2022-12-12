import { Entity } from "./entity";
import { distance } from "./utils";

export function collides(entity: Entity, other: Entity): boolean {
  const collision = entity.collisionRadius + other.collisionRadius;

  const before = distance(entity.pos, other.pos)
  const after = distance(entity.nextPos || entity.pos, other.nextPos || other.pos)

  return after < collision && after < before
}
