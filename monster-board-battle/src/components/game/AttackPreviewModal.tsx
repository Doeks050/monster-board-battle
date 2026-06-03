import { calculateDamage } from "@/lib/game/combat";
import { getMonsterCard } from "@/lib/game/monsters";
import { getEffectiveMonsterStats } from "@/lib/game/stats";
import type { MonsterInstance } from "@/lib/game/types";

type AttackPreviewModalProps = {
  attacker: MonsterInstance;
  defender: MonsterInstance;
  monsters: MonsterInstance[];
  onConfirm: () => void;
  onCancel: () => void;
};

export function AttackPreviewModal({
  attacker,
  defender,
  monsters,
  onConfirm,
  onCancel,
}: AttackPreviewModalProps) {
  const attackerCard = getMonsterCard(attacker.cardId);
  const defenderCard = getMonsterCard(defender.cardId);

  const attackerStats = getEffectiveMonsterStats(attacker, monsters);
  const defenderStats = getEffectiveMonsterStats(defender, monsters);

  const damage = calculateDamage(attackerStats.atk, defenderStats.def);
  const hpAfterAttack = Math.max(0, defender.currentHp - damage);
  const willDefeat = hpAfterAttack <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-5 text-white shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-red-300">Enemy Monster</p>
            <h2 className="text-2xl font-bold">{defenderCard.name}</h2>
            <p className="text-sm text-slate-400">{defenderCard.rarity}</p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-700 px-3 py-1 text-slate-300 hover:bg-slate-800"
          >
            X
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-center">
          <div className="mb-3 text-6xl">{defenderCard.icon}</div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">❤ HP</p>
              <p className="text-2xl font-bold">
                {defender.currentHp} / {defenderStats.hp}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">⚔ ATK</p>
              <p className="text-2xl font-bold">
                {defenderStats.atk}
                {defenderStats.atkBonus > 0 && (
                  <span className="text-sm text-emerald-300">
                    {" "}
                    (+{defenderStats.atkBonus})
                  </span>
                )}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">🛡 DEF</p>
              <p className="text-2xl font-bold">
                {defenderStats.def}
                {defenderStats.defBonus > 0 && (
                  <span className="text-sm text-emerald-300">
                    {" "}
                    (+{defenderStats.defBonus})
                  </span>
                )}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">👣 MOV</p>
              <p className="text-2xl font-bold">
                +{defenderStats.mov}
                {defenderStats.movBonus > 0 && (
                  <span className="text-sm text-emerald-300">
                    {" "}
                    (+{defenderStats.movBonus})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-2 text-sm text-slate-400">Attack Preview</p>

          <div className="space-y-2 text-sm">
            <p>
              Attacker:{" "}
              <span className="font-bold text-blue-300">
                {attackerCard.icon} {attackerCard.name}
              </span>
            </p>

            <p>
              Attacker ATK:{" "}
              <span className="font-bold">{attackerStats.atk}</span>
            </p>

            <p>
              Defender DEF:{" "}
              <span className="font-bold">{defenderStats.def}</span>
            </p>

            <p>
              Damage:{" "}
              <span className="font-bold text-red-300">{damage}</span>
            </p>

            <p>
              Enemy HP after attack:{" "}
              <span className="font-bold">
                {hpAfterAttack} / {defenderStats.hp}
              </span>
            </p>

            {willDefeat && (
              <p className="font-bold text-emerald-300">
                This attack will defeat the enemy. Your monster will take this
                tile.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-400"
          >
            Attack
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-bold text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
