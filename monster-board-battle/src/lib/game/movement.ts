import { BOARD_SIZE } from "./constants";

export function getMovementDistance(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  const distanceX = Math.abs(fromX - toX);
  const distanceY = Math.abs(fromY - toY);

  return Math.max(distanceX, distanceY);
}

export function isInsideBoard(x: number, y: number) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}
