import { getPoiAt, isP1Base, isP2Base } from "@/lib/game/board";

type TileProps = {
  x: number;
  y: number;
};

export function Tile({ x, y }: TileProps) {
  const poi = getPoiAt(x, y);

  let content = "";
  let className = "border-slate-700 bg-slate-900 text-slate-500";

  if (isP2Base(x, y)) {
    content = "🔴";
    className = "border-red-500 bg-red-950 text-red-300";
  } else if (isP1Base(x, y)) {
    content = "🔵";
    className = "border-blue-500 bg-blue-950 text-blue-300";
  } else if (poi) {
    content = `⭐${poi.label}`;
    className = "border-yellow-500 bg-yellow-950 text-yellow-300";
  }

  return (
    <div
      title={`Tile ${x}, ${y}`}
      className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-bold ${className}`}
    >
      {content}
    </div>
  );
}
