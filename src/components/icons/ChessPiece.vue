<script setup lang="ts">
import { type PieceType } from '../chessboard';
const props = defineProps<{
  type: PieceType;
}>();

const image = new URL(`/src/assets/${props.type}.png`, import.meta.url).href;
</script>

<template>
  <img
    :src="image"
    :alt="type"
    draggable="false"
    class="h-[45px] w-[45px] rounded-md p-1 shadow hover:backdrop-brightness-90"
  />
</template>
