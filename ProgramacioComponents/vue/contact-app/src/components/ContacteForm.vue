<script setup lang="ts">
import { BCol, BForm, BFormGroup, BFormInput, BFormSelect, BRow } from 'bootstrap-vue-next'
import type { Grup } from '@/data/types'

defineProps<{
  form: any
  grups: Grup[]
}>()
</script>

<template>
  <BForm @submit.prevent>
    <BRow>
      <BCol md="6">
        <BFormGroup label="Nom:" class="mb-3">
          <BFormInput v-model="form.nom" required placeholder="Ex: Aimar" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Cognoms:" class="mb-3">
          <BFormInput v-model="form.cognoms" required placeholder="Ex: Martinez" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Telefon:" class="mb-3">
          <BFormInput v-model="form.telefon" required type="tel" placeholder="+34600000000" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Email:" class="mb-3">
          <BFormInput v-model="form.email" type="email" placeholder="correu@exemple.com" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BFormGroup label="Grup:" class="mb-3">
      <BFormSelect v-model="form.grupId" required>
        <option value="" disabled>Selecciona un grup (Obligatori)</option>
        <option v-for="g in grups" :key="g.id" :value="g.id">{{ g.nom }}</option>
      </BFormSelect>
    </BFormGroup>

    <BFormGroup class="mb-0">
      <div class="form-check form-switch">
        <input id="switchFavorit" v-model="form.favorit" class="form-check-input" type="checkbox">
        <label class="form-check-label" for="switchFavorit">Marcar com a favorit</label>
      </div>
    </BFormGroup>
  </BForm>
</template>
