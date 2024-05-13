<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import {
  canMove,
  isCoord,
  isEqualCoord,
  isPiece,
  type Coord,
  type PieceRecord
} from './chessboard';
import ChessSquare from './icons/ChessSquare.vue';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const pieces: PieceRecord[] = reactive([
  { type: 'king', location: [3, 2] },
  { type: 'pawn', location: [1, 6] }
]);

const squares = computed(() => {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];

      const piece = pieces.find((piece) => isEqualCoord(piece.location, squareCoord));

      const isDark = (row + col) % 2 === 1;

      squares.push({ piece, isDark, location: squareCoord });
    }
  }
  return squares;
});

onMounted(() => {
  monitorForElements({
    onDrop({ source, location }) {
      const destination = location.current.dropTargets[0];
      if (!destination) {
        return;
      }
      const destinationLocation = destination.data.location;
      const sourcePiece = source.data.piece;

      if (
        // type guarding
        !isPiece(sourcePiece) ||
        !isCoord(destinationLocation)
      ) {
        return;
      }

      const piece = pieces.find((p) => isEqualCoord(p.location, sourcePiece.location));

      if (
        canMove(sourcePiece.location, destinationLocation, sourcePiece.type, pieces) &&
        piece !== undefined
      ) {
        const idx = pieces.findIndex((p) => isEqualCoord(p.location, sourcePiece.location));
        pieces[idx] = { ...pieces[idx], location: destinationLocation };
      }
    }
  });
});
</script>

<template>
  <div class="grid h-[500px] w-[500px] grid-cols-8 grid-rows-8 border-2 border-gray-300">
    <template v-for="(square, index) in squares" :key="index">
      <ChessSquare :square="square" :pieces="pieces" />
    </template>
  </div>
</template>
