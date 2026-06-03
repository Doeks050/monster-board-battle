import { POIS } from "./constants";
import type { MonsterInstance, PlayerId, PoiControl } from "./types";

export function getPoiControl(
  monsters: MonsterInstance[] = [],
  playerId: PlayerId
): PoiControl[] {
  return POIS.map((poi) => {
    const occupyingMonster = monsters.find(
      (monster) => monster.x === poi.x && monster.y === poi.y
    );

    return {
      poi,
      owner: occupyingMonster?.owner ?? null,
    };
  }).filter((control) => control.owner === playerId);
}

export function getPoiOwner(
  monsters: MonsterInstance[] = [],
  x: number,
  y: number
): PlayerId | null {
  const occupyingMonster = monsters.find(
    (monster) => monster.x === x && monster.y === y
  );

  return occupyingMonster?.owner ?? null;
}

export function isControlledSpawnPoi(
  monsters: MonsterInstance[] = [],
  playerId: PlayerId,
  x: number,
  y: number
) {
  const poi = POIS.find((item) => item.x === x && item.y === y);

  if (!poi || poi.effectType !== "spawn") {
    return false;
  }

  const occupyingMonster = monsters.find(
    (monster) => monster.x === x && monster.y === y
  );

  return occupyingMonster?.owner === playerId;
}
