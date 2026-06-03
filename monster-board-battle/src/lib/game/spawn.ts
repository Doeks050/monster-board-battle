import { P1_BASE, P2_BASE, POIS } from "./constants";
import { isAdjacent } from "./combat";
import type { MonsterInstance, PlayerId } from "./types";

export function isValidSpawnTileForPlayer(
  monsters: MonsterInstance[] = [],
  playerId: PlayerId,
  x: number,
  y: number
) {
  const occupied = monsters.some(
    (monster) => monster.x === x && monster.y === y
  );

  if (occupied) {
    return false;
  }

  const base = playerId === "p1" ? P1_BASE : P2_BASE;

  if (base.x === x && base.y === y) {
    return true;
  }

  const controlledOutposts = POIS.filter((poi) => {
    if (poi.effectType !== "spawn") {
      return false;
    }

    const occupyingMonster = monsters.find(
      (monster) => monster.x === poi.x && monster.y === poi.y
    );

    return occupyingMonster?.owner === playerId;
  });

  return controlledOutposts.some((poi) => isAdjacent(poi.x, poi.y, x, y));
}
