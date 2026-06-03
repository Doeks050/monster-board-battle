import { BOARD_SIZE } from "./constants";

export function getMovementDistance(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  return Math.abs(fromX - toX) + Math.abs(fromY - toY);
}

export function isInsideBoard(x: number, y: number) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}
