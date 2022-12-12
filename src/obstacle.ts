import { Entity } from "./entity";
import { PositionRange } from "./position";

export interface Obstacle extends Entity {
  collision: PositionRange;
}
