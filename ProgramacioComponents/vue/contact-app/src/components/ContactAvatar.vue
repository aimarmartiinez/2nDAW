<script setup lang="ts">
import { BAvatar } from 'bootstrap-vue-next'
import type { Contacte } from '@/data/types'

const props = defineProps<{
  contacte?: Contacte
  color: string
}>()

function inicials() {
  if (!props.contacte) {
    return '?'
  }

  const nom = props.contacte.nom[0] || ''
  const cognom = props.contacte.cognoms && props.contacte.cognoms !== 'null' ? props.contacte.cognoms[0] : ''
  return (nom + cognom).toUpperCase()
}
</script>

<template>
  <BAvatar :style="`background-color: ${color} !important;`" class="fw-bold text-white shadow-sm" size="3rem">
    {{ inicials() }}
  </BAvatar>
</template>
