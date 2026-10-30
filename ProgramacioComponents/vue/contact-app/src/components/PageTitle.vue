<script setup lang="ts">
import { BCol, BImg, BRow } from 'bootstrap-vue-next'

defineProps<{ titol: string, color?: string, icon?: string }>()
</script>

<template>
  <BRow align-v="center" class="mb-4">
    <BCol>
      <h2 :class="['fw-bold m-0 d-flex align-items-center', color || 'text-success']">
        <BImg v-if="icon" :src="icon" width="32" height="32" class="me-2" />
        {{ titol }}
      </h2>
    </BCol>
  </BRow>
</template>
