import { BASE_MAX_HP } from "@/lib/game/constants";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";
import { MonsterCardPreview } from "./MonsterCardPreview";

type GameSidebarProps = {
  currentPlayer: PlayerId;
  turnNumber: number;
  p1BaseHp: number;
  p2BaseHp: number;
  selectedMonster: MonsterInstance | null;
  p1DeckCount: number;
  p2DeckCount: number;
  onEndTurn: () => void;
};

export function GameSidebar({
  currentPlayer,
  turnNumber,
  p1BaseHp,
  p2BaseHp,
  selectedMonster,
  p1DeckCount,
  p2DeckCount,
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

        <button
          onClick={onEndTurn}
          className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-400"
        >
          End Turn + Draw
        </button>
      </div>

      <MonsterCardPreview monster={selectedMonster} />
    </aside>
  );
}
