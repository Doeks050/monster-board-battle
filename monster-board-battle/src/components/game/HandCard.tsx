import type { GameCard } from "@/lib/game/types";
import { getCardDisplay } from "@/lib/game/cards";

type HandCardProps = {
  card: GameCard;
  isSelected: boolean;
  onClick: () => void;
};

export function HandCard({ card, isSelected, onClick }: HandCardProps) {
  const display = getCardDisplay(card);

  const selectedClass = isSelected
    ? "border-emerald-400 bg-emerald-950"
    : "border-slate-700 bg-slate-900 hover:border-slate-500";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-36 rounded-xl border p-3 text-left transition ${selectedClass}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-white">{display.name}</p>
          <p className="text-xs text-slate-400">{display.subtitle}</p>
        </div>

        <div className="text-3xl">{display.icon}</div>
      </div>

      <p className="text-xs text-slate-300">{display.description}</p>
    </button>
  );
}
