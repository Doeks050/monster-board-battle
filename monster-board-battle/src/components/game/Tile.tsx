import { getPoiAt, isP1Base, isP2Base } from "@/lib/game/board";
import { getMonsterCard } from "@/lib/game/monsters";
import type { MonsterInstance } from "@/lib/game/types";

type TileProps = {
  x: number;
  y: number;
  monster?: MonsterInstance;
  isValidSpawn: boolean;
  isValidMove: boolean;
  isSelectedMonster: boolean;
  onSelectMonster: (monster: MonsterInstance) => void;
  onTileClick: (x: number, y: number) => void;
};

export function Tile({
  x,
  y,
  monster,
  isValidSpawn,
  isValidMove,
  isSelectedMonster,
  onSelectMonster,
  onTileClick,
}: TileProps) {
  const poi = getPoiAt(x, y);

  let content = "";
  let className = "border-slate-700 bg-slate-900 text-slate-500";

  if (isP2Base(x, y)) {
    content = "🔴";
    className = "border-red-500 bg-red-950 text-red-300";
  } else if (isP1Base(x, y)) {
    content = "🔵";
    className = "border-blue-500 bg-blue-950 text-blue-300";
  } else if (poi) {
    content = `⭐${poi.label}`;
    className = "border-yellow-500 bg-yellow-950 text-yellow-300";
  }

  if (isValidSpawn) {
    className = `${className} ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950`;
  }

  if (isValidMove) {
    className = `${className} ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950`;
  }

  if (monster) {
    const card = getMonsterCard(monster.cardId);

    let ownerClass =
      monster.owner === "p1"
        ? "border-blue-400 bg-blue-700 text-white hover:bg-blue-600"
        : "border-red-400 bg-red-700 text-white hover:bg-red-600";

    if (isSelectedMonster) {
      ownerClass = `${ownerClass} ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950`;
    }

    return (
      <button
        type="button"
        title={`${card.name} | HP ${monster.currentHp}/${card.hp}`}
        onClick={() => onSelectMonster(monster)}
        className={`flex h-10 w-10 items-center justify-center rounded border text-lg font-bold ${ownerClass}`}
      >
        {card.icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      title={`Tile ${x}, ${y}`}
      onClick={() => onTileClick(x, y)}
      className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-bold ${className}`}
    >
      {content}
    </button>
  );
}
