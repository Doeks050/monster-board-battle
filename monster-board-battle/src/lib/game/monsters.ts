import { MONSTER_CARDS } from "@/data/monsters";
import type { MonsterCard, MonsterInstance } from "./types";

export function getMonsterCard(cardId: string): MonsterCard {
  const card = MONSTER_CARDS.find((monster) => monster.id === cardId);

  if (!card) {
    throw new Error(`Monster card not found: ${cardId}`);
  }

  return card;
}

export function getMonsterAt(
  monsters: MonsterInstance[],
  x: number,
  y: number
) {
  return monsters.find((monster) => monster.x === x && monster.y === y);
}
