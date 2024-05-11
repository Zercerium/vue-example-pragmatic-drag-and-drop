<script setup lang="ts">
import { isEqualCoord, type Coord, type PieceRecord } from './chessboard';
import ChessPiece from './icons/ChessPiece.vue';

const pieces: PieceRecord[] = [
  { type: 'king', location: [3, 2] },
  { type: 'pawn', location: [1, 6] }
];

const squares = ((pieces: PieceRecord[]) => {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];

      const piece = pieces.find((piece) => isEqualCoord(piece.location, squareCoord));

      const isDark = (row + col) % 2 === 1;

      squares.push({ piece, isDark });
    }
  }
  return squares;
})(pieces);
</script>

<template>
  <div class="grid h-[500px] w-[500px] grid-cols-8 grid-rows-8 border-2 border-gray-300">
    <div
      v-for="(square, index) in squares"
      :key="index"
      class="flex h-full w-full items-center justify-center"
      :class="{ 'bg-gray-300': square.isDark }"
    >
      <ChessPiece v-if="square.piece" :type="square.piece.type" />
    </div>
  </div>
</template>
