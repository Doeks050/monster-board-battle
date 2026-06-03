import { getPoiControl } from "./poi";
import { getMonsterCard } from "./monsters";
import type { MonsterInstance } from "./types";

export type EffectiveMonsterStats = {
  hp: number;
  atk: number;
  def: number;
  mov: number;
  atkBonus: number;
  defBonus: number;
  movBonus: number;
};

export function getEffectiveMonsterStats(
  monster: MonsterInstance,
  allMonsters: MonsterInstance[]
): EffectiveMonsterStats {
  const card = getMonsterCard(monster.cardId);
  const controlledPois = getPoiControl(allMonsters, monster.owner);

  const atkBonus = controlledPois.filter(
    (control) => control.poi.effectType === "attack"
  ).length;

  const defBonus = controlledPois.filter(
    (control) => control.poi.effectType === "defense"
  ).length;

  const movBonus = controlledPois.filter(
    (control) => control.poi.effectType === "movement"
  ).length;

  return {
    hp: card.hp,
    atk: card.atk + atkBonus,
    def: card.def + defBonus,
    mov: card.mov + movBonus,
    atkBonus,
    defBonus,
    movBonus,
  };
}

export function getPlayerMovementBonus(
  playerId: "p1" | "p2",
  allMonsters: MonsterInstance[]
) {
  const controlledPois = getPoiControl(allMonsters, playerId);

  return controlledPois.filter(
    (control) => control.poi.effectType === "movement"
  ).length;
}
