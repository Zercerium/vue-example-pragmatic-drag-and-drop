export type Coord = [number, number];
export type PieceRecord = {
  type: PieceType;
  location: Coord;
};
export type PieceType = 'king' | 'pawn';

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}
