import { P1_BASE, P2_BASE, POIS } from "./constants";

export function getPoiAt(x: number, y: number) {
  return POIS.find((poi) => poi.x === x && poi.y === y);
}

export function isP1Base(x: number, y: number) {
  return P1_BASE.x === x && P1_BASE.y === y;
}

export function isP2Base(x: number, y: number) {
  return P2_BASE.x === x && P2_BASE.y === y;
}
