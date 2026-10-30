<script setup lang="ts">
import { BButton, BCol, BListGroupItem, BRow } from 'bootstrap-vue-next'
import ContactAvatar from '@/components/ContactAvatar.vue'
import type { Contacte } from '@/data/types'

defineProps<{
  contacte: Contacte
  color: string
  mostrarEditar?: boolean
  mostrarEliminar?: boolean
  onFavorit: (contacte: Contacte) => void
  onEditar?: (contacte: Contacte) => void
  onEliminar?: (id: string) => void
}>()
</script>

<template>
  <BListGroupItem class="d-flex justify-content-between align-items-center py-3">
    <BRow align-v="center" class="w-100 m-0">
      <BCol class="d-flex align-items-center p-0">
        <ContactAvatar :contacte="contacte" :color="color" class="me-3" />
        <div>
          <div class="fw-bold fs-5 text-dark">
            {{ contacte.nom }} {{ (contacte.cognoms && contacte.cognoms !== 'null') ? contacte.cognoms : '' }}
          </div>
          <div class="text-muted small">{{ contacte.telefon }}</div>
        </div>
      </BCol>

      <BCol cols="auto" class="p-0">
        <BButton size="sm" :variant="contacte.favorit ? 'warning' : 'outline-warning'" class="me-2" @click="onFavorit(contacte)">*</BButton>
        <BButton v-if="mostrarEditar" size="sm" variant="outline-primary" class="me-2" @click="onEditar?.(contacte)">Editar</BButton>
        <BButton v-if="mostrarEliminar" size="sm" variant="outline-danger" @click="onEliminar?.(contacte.id)">Eliminar</BButton>
      </BCol>
    </BRow>
  </BListGroupItem>
</template>
