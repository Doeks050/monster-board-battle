export type PlayerId = "p1" | "p2";

export type Poi = {
  id: string;
  x: number;
  y: number;
  label: string;
};

export type MonsterRarity = "Common" | "Rare" | "Epic" | "Legendary";

export type MonsterCard = {
  id: string;
  name: string;
  icon: string;
  rarity: MonsterRarity;
  hp: number;
  atk: number;
  def: number;
  mov: number;
};

export type BoostCard = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type GameCard =
  | {
      type: "monster";
      cardId: string;
    }
  | {
      type: "boost";
      cardId: string;
    };

export type MonsterInstance = {
  instanceId: string;
  cardId: string;
  owner: PlayerId;
  x: number;
  y: number;
  currentHp: number;
};

export type PlayerState = {
  id: PlayerId;
  deck: GameCard[];
  hand: GameCard[];
  discard: GameCard[];
};
