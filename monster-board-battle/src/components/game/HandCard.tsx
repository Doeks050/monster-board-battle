import type { GameCard } from "@/lib/game/types";
import { getCardDisplay } from "@/lib/game/cards";

type HandCardProps = {
  card: GameCard;
};

export function HandCard({ card }: HandCardProps) {
  const display = getCardDisplay(card);

  return (
    <div className="min-w-36 rounded-xl border border-slate-700 bg-slate-900 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-white">{display.name}</p>
          <p className="text-xs text-slate-400">{display.subtitle}</p>
        </div>

        <div className="text-3xl">{display.icon}</div>
      </div>

      <p className="text-xs text-slate-300">{display.description}</p>
    </div>
  );
}
