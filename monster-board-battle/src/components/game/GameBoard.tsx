import { BOARD_SIZE, P1_BASE, P2_BASE } from "@/lib/game/constants";
import { getMonsterAt } from "@/lib/game/monsters";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";
import { Tile } from "./Tile";

type GameBoardProps = {
  currentPlayer: PlayerId;
  monsters: MonsterInstance[];
  hasSelectedMonsterCard: boolean;
  onSelectMonster: (monster: MonsterInstance) => void;
  onTileClick: (x: number, y: number) => void;
};

export function GameBoard({
  currentPlayer,
  monsters,
  hasSelectedMonsterCard,
  onSelectMonster,
  onTileClick,
}: GameBoardProps) {
  function isValidSpawnTile(x: number, y: number) {
    if (!hasSelectedMonsterCard) {
      return false;
    }

    const base = currentPlayer === "p1" ? P1_BASE : P2_BASE;
    const monsterAtTile = getMonsterAt(monsters, x, y);

    return base.x === x && base.y === y && !monsterAtTile;
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="grid grid-cols-[repeat(15,40px)] gap-1">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const monster = getMonsterAt(monsters, x, y);

          return (
            <Tile
              key={`${x}-${y}`}
              x={x}
              y={y}
              monster={monster}
              isValidSpawn={isValidSpawnTile(x, y)}
              onSelectMonster={onSelectMonster}
              onTileClick={onTileClick}
            />
          );
        })}
      </div>
    </div>
  );
}
