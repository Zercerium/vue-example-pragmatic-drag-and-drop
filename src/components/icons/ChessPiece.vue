<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type PieceRecord } from '../chessboard';

const props = defineProps<{
  piece: PieceRecord;
}>();

const imageSrc = new URL(`/src/assets/${props.piece.type}.png`, import.meta.url).href;

const imageRef = ref();
const dragging = ref(false);
onMounted(() => {
  draggable({
    element: imageRef.value,
    getInitialData: () => ({ piece: props.piece }),
    onDragStart: () => {
      dragging.value = true;
    },
    onDrop: () => {
      dragging.value = false;
    }
  });
});
</script>

<template>
  <img
    :src="imageSrc"
    :alt="piece.type"
    class="h-[45px] w-[45px] rounded-md p-1 shadow hover:bg-gray-400 hover:backdrop-brightness-90"
    :class="{ 'opacity-50': dragging }"
    ref="imageRef"
  />
</template>
