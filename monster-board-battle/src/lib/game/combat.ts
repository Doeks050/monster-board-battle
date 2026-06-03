export function calculateDamage(atk: number, def: number) {
  return Math.max(1, atk - def);
}

export function isAdjacent(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  const distanceX = Math.abs(fromX - toX);
  const distanceY = Math.abs(fromY - toY);

  return distanceX <= 1 && distanceY <= 1 && (distanceX > 0 || distanceY > 0);
}
