import { BOARD_SIZE, P1_BASE, P2_BASE } from "@/lib/game/constants";
import { getMonsterAt } from "@/lib/game/monsters";
import { isValidSpawnTileForPlayer } from "@/lib/game/spawn";
import { getMovementDistance } from "@/lib/game/movement";
import { isAdjacent } from "@/lib/game/combat";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";
import { Tile } from "./Tile";

type GameBoardProps = {
  currentPlayer: PlayerId;
  monsters: MonsterInstance[];
  selectedMonster: MonsterInstance | null;
  diceRoll: number | null;
  movementPointsLeft: number | null;
  hasSelectedMonsterCard: boolean;
  onSelectMonster: (monster: MonsterInstance) => void;
  onTileClick: (x: number, y: number) => void;
};

export function GameBoard({
  currentPlayer,
  monsters,
  selectedMonster,
  diceRoll,
  movementPointsLeft,
  hasSelectedMonsterCard,
  onSelectMonster,
  onTileClick,
}: GameBoardProps) {
  function isValidSpawnTile(x: number, y: number) {
    if (!hasSelectedMonsterCard) {
      return false;
    }

    return isValidSpawnTileForPlayer(monsters, currentPlayer, x, y);
  }

  function isValidMoveTile(x: number, y: number) {
    if (
      !selectedMonster ||
      diceRoll === null ||
      movementPointsLeft === null ||
      movementPointsLeft <= 0
    ) {
      return false;
    }

    if (selectedMonster.owner !== currentPlayer) {
      return false;
    }

    const occupied = getMonsterAt(monsters, x, y);

    if (occupied) {
      return false;
    }

    const distance = getMovementDistance(
      selectedMonster.x,
      selectedMonster.y,
      x,
      y
    );

    return distance > 0 && distance <= movementPointsLeft;
  }

  function isValidAttackTile(x: number, y: number) {
    if (!selectedMonster) {
      return false;
    }

    if (selectedMonster.owner !== currentPlayer) {
      return false;
    }

    const target = getMonsterAt(monsters, x, y);

    if (!target || target.owner === currentPlayer) {
      return false;
    }

    return isAdjacent(selectedMonster.x, selectedMonster.y, x, y);
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
              isValidMove={isValidMoveTile(x, y)}
              isValidAttack={isValidAttackTile(x, y)}
              isSelectedMonster={
                selectedMonster?.instanceId === monster?.instanceId
              }
              onSelectMonster={onSelectMonster}
              onTileClick={onTileClick}
            />
          );
        })}
      </div>
    </div>
  );
}
