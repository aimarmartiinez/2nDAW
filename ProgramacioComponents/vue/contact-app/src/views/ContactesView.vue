<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BAlert, BButton, BCard, BCol, BContainer, BFormInput, BFormSelect, BListGroup, BModal, BRow } from 'bootstrap-vue-next'
import ContacteForm from '@/components/ContacteForm.vue'
import ContacteItem from '@/components/ContacteItem.vue'
import EmptyList from '@/components/EmptyList.vue'
import { createContacte, deleteContacte, getContactes, updateContacte } from '@/data/contacte'
import { getGrups } from '@/data/grup'
import type { Contacte, Grup } from '@/data/types'

const contactes = ref<Contacte[]>([])
const grups = ref<Grup[]>([])
const textCerca = ref('')
const grupFiltre = ref('')
const ordreDades = ref<'nom' | 'data'>('nom')
const isModalOpen = ref(false)
const isEditing = ref(false)
const missatge = ref('')
const colorAlerta = ref<'success' | 'danger' | 'warning'>('success')

const initialForm = { nom: '', cognoms: '', telefon: '', email: '', grupId: '', favorit: false, foto: null }
const form = ref<any>({ ...initialForm })

const contactesFiltrats = computed(() => {
  const cerca = textCerca.value.toLowerCase()

  let resultat = contactes.value.filter(c => {
    const coincideixNom = c.nom.toLowerCase().startsWith(cerca)
    const teCognoms = c.cognoms && c.cognoms !== 'null'
    const coincideixCognoms = teCognoms && c.cognoms.toLowerCase().startsWith(cerca)
    const coincideixGrup = grupFiltre.value === '' || c.grupId === grupFiltre.value

    return (coincideixNom || coincideixCognoms) && coincideixGrup
  })

  if (ordreDades.value === 'nom') {
    resultat = resultat.sort((a, b) => a.nom.localeCompare(b.nom))
  } else {
    resultat = resultat.sort((a, b) => {
      const dataA = a.dataCreacio ? new Date(a.dataCreacio).getTime() : 0
      const dataB = b.dataCreacio ? new Date(b.dataCreacio).getTime() : 0
      return dataB - dataA
    })
  }

  return resultat
})

function obtenirColorGrup(grupId: string) {
  const grup = grups.value.find(g => g.id === grupId)
  return grup ? grup.color : '#198754'
}

async function carregarDades() {
  contactes.value = await getContactes()
  grups.value = await getGrups()
}

function obrirNou() {
  isEditing.value = false
  form.value = { ...initialForm }
  isModalOpen.value = true
}

function obrirEditar(c: Contacte) {
  isEditing.value = true
  form.value = { ...c }
  isModalOpen.value = true
}

async function guardar() {
  const regexTelefon = /^\+[1-9]\d{1,14}$/
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const telefonDuplicat = contactes.value.find(c => c.telefon === form.value.telefon && c.id !== form.value.id)

  if (!form.value.nom?.trim()) return error('El nom es obligatori.')
  if (form.value.cognoms && form.value.cognoms !== 'null' && form.value.cognoms.trim().length < 2) return error('Si indiques cognoms, han de tenir almenys 2 caracters.')
  if (!regexTelefon.test(form.value.telefon || '')) return error('El telefon ha de tenir format internacional E.164 (ex: +34600000000).')
  if (form.value.email && !regexEmail.test(form.value.email)) return error('El format del correu electronic no es valid.')
  if (telefonDuplicat) return error('Aquest telefon ja esta assignat a un altre contacte.')
  if (!form.value.grupId) return error('Has de seleccionar almenys un grup per al contacte.')

  try {
    if (isEditing.value) {
      await updateContacte(form.value)
      avisar('Contacte actualitzat')
    } else {
      await createContacte(form.value)
      avisar('Contacte creat')
    }

    isModalOpen.value = false
    carregarDades()
  } catch (error) {
    avisar('Error en desar el contacte', 'danger')
  }
}

function error(text: string) {
  alert(text)
}

async function eliminar(id: string) {
  if (window.confirm('Segur que vols eliminar aquest contacte?')) {
    await deleteContacte(id)
    avisar('Contacte eliminat', 'danger')
    carregarDades()
  }
}

async function toggleFavorit(c: Contacte) {
  const actualitzat = { ...c, favorit: !c.favorit }
  await updateContacte(actualitzat)
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
    <BRow align-v="center" class="mb-4">
      <BCol>
        <h2 class="text-success fw-bold m-0">Contactes</h2>
      </BCol>
      <BCol cols="auto">
        <div class="d-flex gap-2">
        <BFormSelect v-model="grupFiltre" class="w-auto">
          <option value="">Tots els grups</option>
          <option v-for="g in grups" :key="g.id" :value="g.id">
            {{ g.nom }}
          </option>
        </BFormSelect>
        <BButton variant="success" class="text-nowrap" @click="obrirNou">Nou Contacte</BButton>
        </div>
      </BCol>
    </BRow>

    <BRow class="mb-3">
      <BCol md="8" class="mb-2 mb-md-0">
        <BFormInput v-model="textCerca" placeholder="Cerca per nom o cognoms..." />
      </BCol>
      <BCol md="4">
        <BFormSelect v-model="ordreDades">
          <option value="nom">Ordenar alfabeticament</option>
          <option value="data">Ordenar per mes recents</option>
        </BFormSelect>
      </BCol>
    </BRow>

    <BAlert :model-value="!!missatge" :variant="colorAlerta" class="mb-3 shadow-sm">
      {{ missatge }}
    </BAlert>

    <BCard class="shadow-sm border-0">
      <BListGroup flush>
        <ContacteItem
          v-for="c in contactesFiltrats"
          :key="c.id"
          :contacte="c"
          :color="obtenirColorGrup(c.grupId)"
          mostrar-editar
          mostrar-eliminar
          :on-favorit="toggleFavorit"
          :on-editar="obrirEditar"
          :on-eliminar="eliminar"
        />

        <EmptyList v-if="contactesFiltrats.length === 0" text="No s'han trobat contactes" />
      </BListGroup>
    </BCard>

    <BModal
      v-model="isModalOpen"
      :title="isEditing ? 'Editar Contacte' : 'Nou Contacte'"
      ok-title="Guardar"
      ok-variant="success"
      cancel-title="Cancelar"
      cancel-variant="light"
      @ok="guardar"
      size="lg"
    >
      <ContacteForm :form="form" :grups="grups" />
    </BModal>
  </BContainer>
</template>
