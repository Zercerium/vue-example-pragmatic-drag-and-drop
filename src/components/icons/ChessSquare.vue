<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { PieceRecord } from '../chessboard';
import ChessPiece from './ChessPiece.vue';

const props = defineProps<{
  square: {
    piece: PieceRecord | undefined;
    isDark: boolean;
  };
}>();

const isDraggedOver = ref(false);
const squareRef = ref();
onMounted(() => {
  dropTargetForElements({
    element: squareRef.value,
    onDragEnter: () => (isDraggedOver.value = true),
    onDragLeave: () => (isDraggedOver.value = false),
    onDrop: () => (isDraggedOver.value = false)
  });
});
</script>

<template>
  <div
    class="flex h-full w-full items-center justify-center"
    :class="{ 'bg-blue-200': isDraggedOver, 'bg-gray-300': square.isDark && !isDraggedOver }"
    ref="squareRef"
  >
    <ChessPiece v-if="props.square.piece" :type="props.square.piece.type" />
  </div>
</template>
