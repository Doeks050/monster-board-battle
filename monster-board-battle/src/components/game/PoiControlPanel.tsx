import { getPoiControl } from "@/lib/game/poi";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";

type PoiControlPanelProps = {
  monsters: MonsterInstance[];
  playerId: PlayerId;
};

export function PoiControlPanel({ monsters, playerId }: PoiControlPanelProps) {
  const controlledPois = getPoiControl(monsters, playerId);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
      <h3 className="mb-2 font-bold">
        {playerId === "p1" ? "🔵 Player 1 POIs" : "🔴 Player 2 POIs"}
      </h3>

      {controlledPois.length === 0 ? (
        <p className="text-sm text-slate-400">No POIs controlled.</p>
      ) : (
        <div className="space-y-2">
          {controlledPois.map((control) => (
            <div
              key={control.poi.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-2"
            >
              <p className="font-bold">
                {control.poi.icon} {control.poi.name}
              </p>
              <p className="text-xs text-slate-400">
                {control.poi.effectDescription}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
