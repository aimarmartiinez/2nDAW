<script setup lang="ts">
import { BCard } from 'bootstrap-vue-next'

defineProps<{ titol: string, valor?: number }>()
</script>

<template>
  <BCard class="h-100 shadow-sm border-0 border-start border-4 border-success">
    <h6 class="text-muted mb-3 text-center">{{ titol }}</h6>
    <h1 class="fw-bold mb-0 text-success display-4 text-center">{{ valor }}</h1>
  </BCard>
</template>
