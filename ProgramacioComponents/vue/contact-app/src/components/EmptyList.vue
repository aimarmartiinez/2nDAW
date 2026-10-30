<script setup lang="ts">
import { BListGroupItem } from 'bootstrap-vue-next'

defineProps<{ text: string }>()
</script>

<template>
  <BListGroupItem class="text-center py-5 text-muted">{{ text }}</BListGroupItem>
</template>
