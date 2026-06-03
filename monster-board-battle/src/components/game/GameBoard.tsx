import { BOARD_SIZE } from "@/lib/game/constants";
import { getMonsterAt } from "@/lib/game/monsters";
import type { MonsterInstance } from "@/lib/game/types";
import { Tile } from "./Tile";

type GameBoardProps = {
  monsters: MonsterInstance[];
  onSelectMonster: (monster: MonsterInstance) => void;
};

export function GameBoard({ monsters, onSelectMonster }: GameBoardProps) {
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
              onSelectMonster={onSelectMonster}
            />
          );
        })}
      </div>
    </div>
  );
}
