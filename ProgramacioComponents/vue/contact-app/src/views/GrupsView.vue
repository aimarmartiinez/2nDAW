<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  BAlert,
  BButton,
  BCard,
  BCol,
  BContainer,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BListGroup,
  BModal,
  BRow
} from 'bootstrap-vue-next'
import EmptyList from '@/components/EmptyList.vue'
import GrupItem from '@/components/GrupItem.vue'
import { createGrup, deleteGrup, getGrups, updateGrup } from '@/data/grup'
import type { Grup } from '@/data/types'

const grups = ref<Grup[]>([])
const textCerca = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const missatge = ref('')
const colorAlerta = ref<'success' | 'danger' | 'warning'>('success')

const form = ref<Grup>({
  id: '',
  nom: '',
  color: '#198754'
})

const grupsFiltrats = computed(() => {
  return grups.value.filter(g => {
    return g.nom.toLowerCase().startsWith(textCerca.value.toLowerCase())
  })
})

async function carregarDades() {
  grups.value = await getGrups()
}

function obrirNou() {
  isEditing.value = false
  form.value = { id: '', nom: '', color: '#198754' }
  isModalOpen.value = true
}

function obrirEditar(grup: Grup) {
  isEditing.value = true
  form.value = { ...grup }
  isModalOpen.value = true
}

async function guardar() {
  if (isEditing.value) {
    await updateGrup(form.value)
    avisar('Grup actualitzat')
  } else {
    await createGrup(form.value)
    avisar('Grup creat')
  }

  isModalOpen.value = false
  carregarDades()
}

async function eliminar(id: string) {
  if (window.confirm('Segur que vols eliminar aquest grup?')) {
    try {
      await deleteGrup(id)
      avisar('Grup eliminat', 'danger')
      await carregarDades()
    } catch (error) {
      console.error('Error al eliminar:', error)
      avisar('Error al eliminar el grup', 'danger')
    }
  }
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
        <h2 class="text-success fw-bold m-0">Grups</h2>
      </BCol>
      <BCol cols="auto">
        <BButton variant="success" @click="obrirNou">+ Nou Grup</BButton>
      </BCol>
    </BRow>

    <BRow class="mb-3">
      <BInputGroup>
        <BFormInput v-model="textCerca" placeholder="Buscar grup pel nom..." />
      </BInputGroup>
    </BRow>

    <BAlert :model-value="!!missatge" :variant="colorAlerta" class="mb-3 shadow-sm">
      {{ missatge }}
    </BAlert>

    <BCard class="shadow-sm border-0">
      <BListGroup flush>
        <GrupItem
          v-for="grup in grupsFiltrats"
          :key="grup.id"
          :grup="grup"
          :on-editar="obrirEditar"
          :on-eliminar="eliminar"
        />

        <EmptyList v-if="grupsFiltrats.length === 0" text="No s'han trobat grups amb aquest nom" />
      </BListGroup>
    </BCard>

    <BModal
      v-model="isModalOpen"
      :title="isEditing ? 'Editar Grup' : 'Nou Grup'"
      ok-title="Guardar"
      ok-variant="success"
      cancel-title="Cancelar"
      cancel-variant="light"
      @ok="guardar"
      centered
    >
      <BForm @submit.prevent="guardar">
        <BFormGroup label="Nom del grup:" label-for="input-nom" class="mb-3">
          <BFormInput id="input-nom" v-model="form.nom" required placeholder="Amics, Treball..." />
        </BFormGroup>

        <BFormGroup label="Color identificatiu:" label-for="input-color" class="mb-3">
          <BInputGroup>
            <BFormInput
              id="input-color"
              v-model="form.color"
              type="color"
              style="max-width: 60px; padding: 2px;"
            />
            <BFormInput v-model="form.color" placeholder="#000000" />
          </BInputGroup>
        </BFormGroup>
      </BForm>
    </BModal>
  </BContainer>
</template>
