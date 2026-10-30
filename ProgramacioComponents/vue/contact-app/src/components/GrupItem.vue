<script setup lang="ts">
import { BButton, BCol, BListGroupItem, BRow } from 'bootstrap-vue-next'
import type { Grup } from '@/data/types'

defineProps<{
  grup: Grup
  onEditar: (grup: Grup) => void
  onEliminar: (id: string) => void
}>()
</script>

<template>
  <BListGroupItem class="d-flex justify-content-between align-items-center py-3">
    <BRow align-v="center" class="w-100 m-0">
      <BCol class="d-flex align-items-center p-0">
        <div
          class="rounded-circle border me-3"
          :style="{ backgroundColor: grup.color, width: '22px', height: '22px' }"
        ></div>
        <span class="fw-bold">{{ grup.nom }}</span>
      </BCol>

      <BCol cols="auto" class="p-0">
        <BButton size="sm" variant="outline-primary" class="me-2" @click="onEditar(grup)">Editar</BButton>
        <BButton size="sm" variant="outline-danger" @click="onEliminar(grup.id)">Eliminar</BButton>
      </BCol>
    </BRow>
  </BListGroupItem>
</template>
