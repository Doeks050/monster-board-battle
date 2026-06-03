import type { GameCard, PlayerId } from "@/lib/game/types";
import { HandCard } from "./HandCard";

type PlayerHandProps = {
  currentPlayer: PlayerId;
  hand: GameCard[];
  deckCount: number;
  discardCount: number;
  handLimit: number;
};

export function PlayerHand({
  currentPlayer,
  hand,
  deckCount,
  discardCount,
  handLimit,
}: PlayerHandProps) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {currentPlayer === "p1" ? "🔵 Player 1 Hand" : "🔴 Player 2 Hand"}
          </h2>
          <p className="text-sm text-slate-400">
            Hand {hand.length}/{handLimit} | Deck {deckCount} | Discard{" "}
            {discardCount}
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {hand.map((card, index) => (
          <HandCard key={`${card.type}-${card.cardId}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
