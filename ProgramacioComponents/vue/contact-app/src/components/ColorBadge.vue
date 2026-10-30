<script setup lang="ts">
import { BBadge } from 'bootstrap-vue-next'

defineProps<{
  color: string
  text: string
}>()
</script>

<template>
  <BBadge :style="`background-color: ${color} !important;`" class="fs-6">
    {{ text }}
  </BBadge>
</template>
