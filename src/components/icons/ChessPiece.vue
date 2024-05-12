<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type PieceType } from '../chessboard';

const props = defineProps<{
  type: PieceType;
}>();

const imageSrc = new URL(`/src/assets/${props.type}.png`, import.meta.url).href;

const image = ref();
const dragging = ref(false);
onMounted(() => {
  const imageElement = image.value;
  draggable({
    element: imageElement,
    onDragStart: () => {
      dragging.value = true;
      console.log('Start');
    },
    onDrop: () => {
      dragging.value = false;
      console.log('Drop');
    }
  });
});
</script>

<template>
  <img
    :src="imageSrc"
    :alt="type"
    class="h-[45px] w-[45px] rounded-md p-1 shadow hover:bg-gray-400 hover:backdrop-brightness-90"
    :class="{ 'opacity-50': dragging }"
    ref="image"
  />
</template>
