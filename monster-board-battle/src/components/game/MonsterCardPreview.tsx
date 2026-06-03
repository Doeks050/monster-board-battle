import type { MonsterInstance } from "@/lib/game/types";
import { getMonsterCard } from "@/lib/game/monsters";
import { getEffectiveMonsterStats } from "@/lib/game/stats";

type MonsterCardPreviewProps = {
  monster: MonsterInstance | null;
  monsters: MonsterInstance[];
};

function formatStat(value: number, bonus: number) {
  if (bonus <= 0) {
    return `${value}`;
  }

  return `${value} (+${bonus})`;
}

export function MonsterCardPreview({
  monster,
  monsters,
}: MonsterCardPreviewProps) {
  if (!monster) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <h3 className="mb-2 font-bold">Selected Monster</h3>
        <p className="text-sm text-slate-400">
          Click a monster pawn on the board to inspect its card.
        </p>
      </div>
    );
  }

  const card = getMonsterCard(monster.cardId);
  const stats = getEffectiveMonsterStats(monster, monsters);

  const ownerLabel = monster.owner === "p1" ? "Player 1" : "Player 2";
  const ownerColor =
    monster.owner === "p1" ? "text-blue-300" : "text-red-300";

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{card.name}</h3>
          <p className={`text-sm ${ownerColor}`}>{ownerLabel}</p>
        </div>

        <div className="text-5xl">{card.icon}</div>
      </div>

      <p className="mb-4 text-sm text-slate-400">{card.rarity}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <p className="text-sm text-slate-400">❤ HP</p>
          <p className="text-2xl font-bold">
            {monster.currentHp} / {stats.hp}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <p className="text-sm text-slate-400">⚔ ATK</p>
          <p className="text-2xl font-bold">
            {formatStat(stats.atk, stats.atkBonus)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <p className="text-sm text-slate-400">🛡 DEF</p>
          <p className="text-2xl font-bold">
            {formatStat(stats.def, stats.defBonus)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <p className="text-sm text-slate-400">👣 MOV</p>
          <p className="text-2xl font-bold">
            +{formatStat(stats.mov, stats.movBonus)}
          </p>
        </div>
      </div>
    </div>
  );
}
