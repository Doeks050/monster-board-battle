import type { Poi } from "./types";

export const BOARD_SIZE = 15;
export const BASE_MAX_HP = 50;

export const P1_BASE = { x: 7, y: 14 };
export const P2_BASE = { x: 7, y: 0 };

export const POIS: Poi[] = [
  { id: "north", x: 7, y: 3, label: "N" },
  { id: "west", x: 2, y: 7, label: "W" },
  { id: "center", x: 7, y: 7, label: "C" },
  { id: "east", x: 12, y: 7, label: "E" },
  { id: "south", x: 7, y: 11, label: "S" },
];
