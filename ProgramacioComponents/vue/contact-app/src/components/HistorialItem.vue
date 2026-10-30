<script setup lang="ts">
import { BCol, BListGroupItem, BRow } from 'bootstrap-vue-next'
import ContactAvatar from '@/components/ContactAvatar.vue'
import type { Contacte, Historial } from '@/data/types'

defineProps<{
  item: Historial
  contacte?: Contacte
  color: string
  tipus: 'missatge' | 'trucada'
  nom: string
  telefon: string
  data: string
  durada: string
}>()
</script>

<template>
  <BListGroupItem class="py-3">
    <BRow align-v="center" class="g-3">
      <BCol cols="auto">
        <ContactAvatar :contacte="contacte" :color="color" />
      </BCol>

      <BCol>
        <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
          <span class="fw-bold text-dark">{{ nom }}</span>
        </div>

        <p v-if="tipus === 'missatge'" class="mb-1 text-body">{{ item.missatge }}</p>
        <p v-else class="mb-1 text-body">Durada: {{ durada }}</p>

        <div class="text-muted small">{{ telefon }} - {{ data }}</div>
      </BCol>
    </BRow>
  </BListGroupItem>
</template>
