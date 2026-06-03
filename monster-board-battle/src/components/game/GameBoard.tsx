import { BOARD_SIZE } from "@/lib/game/constants";
import { Tile } from "./Tile";

export function GameBoard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="grid grid-cols-[repeat(15,40px)] gap-1">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);

          return <Tile key={`${x}-${y}`} x={x} y={y} />;
        })}
      </div>
    </div>
  );
}
