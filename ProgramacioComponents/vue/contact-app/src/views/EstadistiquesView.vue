<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import ColorBadge from '@/components/ColorBadge.vue'
import PageTitle from '@/components/PageTitle.vue'
import StatCard from '@/components/StatCard.vue'
import { getContactes } from '@/data/contacte'
import { getGrups } from '@/data/grup'
import type { Contacte, Grup } from '@/data/types'

const contactes = ref<Contacte[]>([])
const grups = ref<Grup[]>([])

const estadistiquesGrups = computed(() => {
  const stats: { nom: string, total: number, color: string }[] = []

  contactes.value.forEach(c => {
    const grup = grups.value.find(g => g.id === c.grupId)
    const nomGrup = grup ? grup.nom : 'Sense grup'
    const colorGrup = grup ? grup.color : '#6c757d'
    const stat = stats.find(s => s.nom === nomGrup)

    if (stat) {
      stat.total++
    } else {
      stats.push({ nom: nomGrup, total: 1, color: colorGrup })
    }
  })

  return stats.sort((a, b) => b.total - a.total)
})

const contactesRecents = computed(() => {
  const fa7Dies = new Date()
  fa7Dies.setDate(fa7Dies.getDate() - 7)

  return contactes.value.filter(c => {
    if (!c.dataCreacio) {
      return false
    }

    return new Date(c.dataCreacio) >= fa7Dies
  }).length
})

const grupsDisponibles = computed(() => {
  const grupIdsAmbContactes: string[] = []

  contactes.value.forEach(c => {
    if (!grupIdsAmbContactes.includes(c.grupId)) {
      grupIdsAmbContactes.push(c.grupId)
    }
  })

  return grupIdsAmbContactes.map(id => {
    const grupInfo = grups.value.find(g => g.id === id)

    if (grupInfo) {
      return grupInfo
    }

    return { id, nom: 'Sense grup', color: '#6c757d' }
  }).filter(g => g.id !== '')
})

async function carregarDades() {
  contactes.value = await getContactes()
  grups.value = await getGrups()
}

onMounted(carregarDades)
</script>

<template>
  <BContainer class="py-4">
    <PageTitle titol="Estadistiques" icon="/src/assets/stats.svg" />

    <BRow class="mb-4">
      <BCol md="4" class="mb-3 mb-md-0">
        <BCard class="h-100 shadow-sm border-0 border-start border-4 border-success">
          <h6 class="text-muted mb-2">Total de Contactes per Grup</h6>
          <div class="d-flex flex-wrap gap-2 mt-3">
          <ColorBadge
            v-for="stat in estadistiquesGrups"
            :key="stat.nom"
            :color="stat.color"
            :text="`${stat.nom}: ${stat.total}`"
          />
          </div>
        </BCard>
      </BCol>

      <BCol md="4" class="mb-3 mb-md-0">
        <StatCard titol="Contactes Recents (Ultims 7 dies)" :valor="contactesRecents" />
      </BCol>

      <BCol md="4">
        <BCard class="h-100 shadow-sm border-0 border-start border-4 border-success">
          <h6 class="text-muted mb-2">Grups Actius</h6>
          <div class="d-flex flex-wrap gap-2 mt-3">
          <ColorBadge
            v-for="grup in grupsDisponibles"
            :key="grup.id"
            :color="grup.color"
            :text="grup.nom"
          />
          </div>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>
