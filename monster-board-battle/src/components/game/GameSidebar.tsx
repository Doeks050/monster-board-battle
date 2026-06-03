import { BASE_MAX_HP } from "@/lib/game/constants";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";
import { MonsterCardPreview } from "./MonsterCardPreview";
import { PoiControlPanel } from "./PoiControlPanel";

type GameSidebarProps = {
  currentPlayer: PlayerId;
  turnNumber: number;
  p1BaseHp: number;
  p2BaseHp: number;
  selectedMonster: MonsterInstance | null;
  monsters: MonsterInstance[];
  p1DeckCount: number;
  p2DeckCount: number;
  diceRoll: number | null;
  movementPointsLeft: number | null;
  onRollDice: () => void;
  onEndTurn: () => void;
};

export function GameSidebar({
  currentPlayer,
  turnNumber,
  p1BaseHp,
  p2BaseHp,
  selectedMonster,
  monsters,
  p1DeckCount,
  p2DeckCount,
  diceRoll,
  movementPointsLeft,
  onRollDice,
  onEndTurn,
}: GameSidebarProps) {
  return (
    <aside className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div>
        <h2 className="mb-3 text-xl font-bold">Game Info</h2>

        <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950 p-3">
          <p className="text-sm text-slate-400">Current Turn</p>
          <p className="text-2xl font-bold">
            {currentPlayer === "p1" ? "🔵 Player 1" : "🔴 Player 2"}
          </p>
          <p className="text-sm text-slate-400">Turn {turnNumber}</p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-blue-900 bg-blue-950 p-3">
            <p className="text-sm text-blue-300">🔵 Player 1 Base</p>
            <p className="text-2xl font-bold">
              {p1BaseHp} / {BASE_MAX_HP} HP
            </p>
            <p className="text-sm text-blue-200">Deck: {p1DeckCount}</p>
          </div>

          <div className="rounded-xl border border-red-900 bg-red-950 p-3">
            <p className="text-sm text-red-300">🔴 Player 2 Base</p>
            <p className="text-2xl font-bold">
              {p2BaseHp} / {BASE_MAX_HP} HP
            </p>
            <p className="text-sm text-red-200">Deck: {p2DeckCount}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-3">
          <p className="text-sm text-slate-400">Dice Roll</p>
          <p className="text-3xl font-bold">
            {diceRoll === null ? "—" : `🎲 ${diceRoll}`}
          </p>
          <p className="text-sm text-slate-400">
            Movement left:{" "}
            {movementPointsLeft === null ? "—" : movementPointsLeft}
          </p>

          <button
            onClick={onRollDice}
            disabled={diceRoll !== null}
            className="mt-3 w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Roll Dice
          </button>
        </div>

        <button
          onClick={onEndTurn}
          className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-400"
        >
          End Turn + Draw
        </button>
      </div>

      <PoiControlPanel monsters={monsters} playerId="p1" />
      <PoiControlPanel monsters={monsters} playerId="p2" />

      <MonsterCardPreview monster={selectedMonster} monsters={monsters} />
    </aside>
  );
}
