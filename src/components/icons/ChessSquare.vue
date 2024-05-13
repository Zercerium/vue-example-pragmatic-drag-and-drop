<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { canMove, isCoord, isPieceType, type Coord, type PieceRecord } from '../chessboard';
import ChessPiece from './ChessPiece.vue';

const props = defineProps<{
  square: {
    piece: PieceRecord | undefined;
    isDark: boolean;
    location: Coord;
  };
  pieces: PieceRecord[];
}>();

type HoveredState = 'idle' | 'validMove' | 'invalidMove';

const state: Ref<HoveredState> = ref('idle');
const squareRef = ref();
onMounted(() => {
  dropTargetForElements({
    element: squareRef.value,
    onDragEnter: ({ source }) => {
      const piece = source.data.piece as PieceRecord;
      if (
        // type guards
        !isCoord(piece.location) ||
        !isPieceType(piece.type)
      ) {
        return;
      }

      if (canMove(piece.location, props.square.location, piece.type, props.pieces)) {
        state.value = 'validMove';
      } else {
        state.value = 'invalidMove';
      }
    },
    onDragLeave: () => (state.value = 'idle'),
    onDrop: () => (state.value = 'idle')
  });
});

function getColor(state: HoveredState, isDark: boolean): string {
  if (state === 'validMove') {
    return 'bg-green-300';
  } else if (state === 'invalidMove') {
    return 'bg-red-300';
  }
  return isDark ? 'bg-gray-300' : 'bg-white';
}
</script>

<template>
  <div
    class="flex h-full w-full items-center justify-center"
    :class="getColor(state, square.isDark)"
    ref="squareRef"
  >
    <ChessPiece v-if="props.square.piece" :piece="props.square.piece" />
  </div>
</template>
