<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  BBadge,
  BButton,
  BButtonGroup,
  BCard,
  BCol,
  BContainer,
  BImg,
  BListGroup,
  BRow
} from 'bootstrap-vue-next'
import EmptyList from '@/components/EmptyList.vue'
import HistorialItem from '@/components/HistorialItem.vue'
import { getContactes } from '@/data/contacte'
import { getGrups } from '@/data/grup'
import { getHistorial } from '@/data/historial'
import type { Contacte, Grup, Historial } from '@/data/types'

const historial = ref<Historial[]>([])
const contactes = ref<Contacte[]>([])
const grups = ref<Grup[]>([])
const filtreActiu = ref<'missatge' | 'trucada'>('missatge')

const historialFiltrat = computed(() => {
  return historial.value
    .filter(item => item.tipus === filtreActiu.value)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
})

const totalTrucades = computed(() => {
  return historial.value.filter(item => item.tipus === 'trucada').length
})

function obtenirContacte(contacteId: string) {
  return contactes.value.find(contacte => contacte.id === contacteId)
}

function obtenirColorGrup(contacteId: string) {
  const contacte = obtenirContacte(contacteId)
  const grup = grups.value.find(g => g.id === contacte?.grupId)

  if (grup) {
    return grup.color
  }

  return '#198754'
}

function nomContacte(contacteId: string) {
  const contacte = obtenirContacte(contacteId)

  if (!contacte) {
    return 'Contacte desconegut'
  }

  const teCognoms = contacte.cognoms && contacte.cognoms !== 'null'
  const cognoms = teCognoms ? ` ${contacte.cognoms}` : ''

  return `${contacte.nom}${cognoms}`
}

function telefonContacte(contacteId: string) {
  const contacte = obtenirContacte(contacteId)

  if (contacte) {
    return contacte.telefon
  }

  return 'Sense telefon'
}

function formatData(data: string) {
  return new Intl.DateTimeFormat('ca-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(data))
}

function formatDurada(segons = 0) {
  const minuts = Math.floor(segons / 60)
  const restaSegons = segons % 60

  return `${minuts}:${restaSegons.toString().padStart(2, '0')}`
}

async function carregarDades() {
  historial.value = await getHistorial()
  contactes.value = await getContactes()
  grups.value = await getGrups()
}

onMounted(carregarDades)
</script>

<template>
  <BContainer class="py-4">
    <BRow align-v="center" class="mb-4">
      <BCol>
        <h2 class="text-success fw-bold m-0 d-flex align-items-center">
          <BImg src="/src/assets/history.svg" width="32" height="32" class="me-2" />
          Historial
        </h2>
      </BCol>
      <BCol cols="auto">
        <BButtonGroup>
          <BButton
            :variant="filtreActiu === 'missatge' ? 'success' : 'outline-success'"
            @click="filtreActiu = 'missatge'"
          >
            Missatges
          </BButton>
          <BButton
            :variant="filtreActiu === 'trucada' ? 'success' : 'outline-success'"
            @click="filtreActiu = 'trucada'"
          >
            Trucades
            <BBadge :variant="filtreActiu === 'trucada' ? 'light' : 'success'" class="ms-2">
              {{ totalTrucades }}
            </BBadge>
          </BButton>
        </BButtonGroup>
      </BCol>
    </BRow>

    <BCard class="shadow-sm border-0">
      <BListGroup flush>
        <HistorialItem
          v-for="item in historialFiltrat"
          :key="item.id"
          :item="item"
          :contacte="obtenirContacte(item.contacteId)"
          :color="obtenirColorGrup(item.contacteId)"
          :tipus="filtreActiu"
          :nom="nomContacte(item.contacteId)"
          :telefon="telefonContacte(item.contacteId)"
          :data="formatData(item.data)"
          :durada="formatDurada(item.durada)"
        />

        <EmptyList
          v-if="historialFiltrat.length === 0"
          :text="`No hi ha ${filtreActiu === 'missatge' ? 'missatges' : 'trucades'} al historial.`"
        />
      </BListGroup>
    </BCard>
  </BContainer>
</template>
