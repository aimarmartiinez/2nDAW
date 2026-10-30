<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  BAlert,
  BButton,
  BCard,
  BCol,
  BContainer,
  BFormInput,
  BListGroup,
  BRow
} from 'bootstrap-vue-next'
import ContacteItem from '@/components/ContacteItem.vue'
import EmptyList from '@/components/EmptyList.vue'
import PageTitle from '@/components/PageTitle.vue'
import { getContactes, updateContacte } from '@/data/contacte'
import { getGrups } from '@/data/grup'
import type { Contacte, Grup } from '@/data/types'

const contactes = ref<Contacte[]>([])
const grups = ref<Grup[]>([])
const textCerca = ref('')
const missatge = ref('')
const colorAlerta = ref<'success' | 'danger' | 'warning'>('success')

const favoritsFiltrats = computed(() => {
  const cerca = textCerca.value.toLowerCase()

  return contactes.value.filter(c => {
    if (!c.favorit) {
      return false
    }

    const coincideixNom = c.nom.toLowerCase().startsWith(cerca)
    const teCognoms = c.cognoms && c.cognoms !== 'null'
    const coincideixCognoms = teCognoms && c.cognoms.toLowerCase().startsWith(cerca)

    return coincideixNom || coincideixCognoms
  }).sort((a, b) => a.nom.localeCompare(b.nom))
})

function obtenirColorGrup(grupId: string) {
  const grup = grups.value.find(g => g.id === grupId)

  if (grup) {
    return grup.color
  }

  return '#198754'
}

async function carregarDades() {
  contactes.value = await getContactes()
  grups.value = await getGrups()
}

async function toggleFavorit(c: Contacte) {
  const actualitzat = { ...c, favorit: !c.favorit }

  await updateContacte(actualitzat)

  if (actualitzat.favorit) {
    avisar('Afegit a favorits')
  } else {
    avisar('Eliminat de favorits', 'warning')
  }

  carregarDades()
}

function avisar(text: string, color: 'success' | 'danger' | 'warning' = 'success') {
  missatge.value = text
  colorAlerta.value = color
  setTimeout(() => missatge.value = '', 3000)
}

onMounted(carregarDades)
</script>

<template>
  <BContainer class="py-4">
    <PageTitle titol="Contactes Favorits *" color="text-warning" />

    <BRow class="mb-3">
      <BCol>
        <BFormInput v-model="textCerca" placeholder="Cerca als teus favorits..." />
      </BCol>
    </BRow>

    <BAlert :model-value="!!missatge" :variant="colorAlerta" class="mb-3 shadow-sm">
      {{ missatge }}
    </BAlert>

    <BCard class="shadow-sm border-0 border-start border-4 border-warning">
      <BListGroup flush>
        <ContacteItem
          v-for="c in favoritsFiltrats"
          :key="c.id"
          :contacte="c"
          :color="obtenirColorGrup(c.grupId)"
          :on-favorit="toggleFavorit"
        />

        <EmptyList v-if="favoritsFiltrats.length === 0" text="No tens cap contacte favorit" />
      </BListGroup>
    </BCard>
  </BContainer>
</template>
