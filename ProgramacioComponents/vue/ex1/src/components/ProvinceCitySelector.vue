<script setup lang="ts">
import { ref } from 'vue'

const provinces = ['Barcelona', 'Girona', 'Lleida', 'Tarragona']
const citiesByProvince = {
  Barcelona: ['Barcelona', 'Sabadell', 'Terrassa'],
  Girona: ['Girona', 'Figueres', 'Blanes'],
  Lleida: ['Lleida', 'Balaguer', 'Tremp'],
  Tarragona: ['Tarragona', 'Reus', 'Valls'],
}

const selectedProvince = ref('')
const selectedCity = ref('')
const sentProvince = ref('')
const sentCity = ref('')

function submitSelection() {
  sentProvince.value = selectedProvince.value
  sentCity.value = selectedCity.value
  selectedProvince.value = ''
  selectedCity.value = ''
}

function changeProvince() {
  selectedCity.value = ''
}
</script>

<template>
  <div>
    <h1>Selecciona província i ciutat</h1>

    <div>
      <label>
        Província:
        <select v-model="selectedProvince" @change="changeProvince">
          <option value="">-- tria una província --</option>
          <option v-for="prov in provinces" :key="prov" :value="prov">{{ prov }}</option>
        </select>
      </label>
    </div>

    <div style="margin-top: 0.5rem">
      <label>
        Ciutat:
        <select v-model="selectedCity" :disabled="!selectedProvince">
          <option value="">-- tria una ciutat --</option>
          <option
            v-for="city in (selectedProvince ? citiesByProvince[selectedProvince] : [])"
            :key="city"
            :value="city"
          >
            {{ city }}
          </option>
        </select>
      </label>
    </div>

    <div style="margin-top: 0.75rem">
      <button @click="submitSelection" :disabled="!selectedProvince || !selectedCity">
        Enviar
      </button>
    </div>

    <div v-if="sentProvince || sentCity" style="margin-top: 1rem">
      <strong>Has enviat:</strong>
      <div>Província: {{ sentProvince || '-' }}</div>
      <div>Ciutat: {{ sentCity || '-' }}</div>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
}
select {
  padding: 0.4rem 0.5rem;
}
</style>
