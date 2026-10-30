<script setup lang="ts">
import { ref, computed } from 'vue'
import { provinces, citiesByProvince } from '@/data/locations'
import type { RegisterData } from '@/types/register'
import {
  validarEmail,
  validarData,
  validarContrasenya,
  validarTelefon,
  validarCodiPostal,
} from '@/utils/validation'
import { useRegister } from '@/composables/useRegister'

const form = ref<RegisterData>({
  nom: '',
  cognoms: '',
  email: '',
  telefon: '',
  dataNaiximent: '',
  contrasenya: '',
  verificacioContrasenya: '',
  adreca: '',
  provincia: '',
  poblacio: '',
  codiPostal: '',
})

const errors = ref<Record<string, string>>({})
const confirmat = ref(false)
const { loading, error, enviarRegistre } = useRegister()

const ciutats = computed(() => {
  if (form.value.provincia === '') {
    return []
  }
  return citiesByProvince[form.value.provincia] || []
})

function canviProvincia() {
  form.value.poblacio = ''
}

function validar() {
  errors.value = {}
  let ok = true

  if (form.value.nom.trim() === '') {
    errors.value.nom = 'Obligatori'
    ok = false
  }
  if (form.value.cognoms.trim() === '') {
    errors.value.cognoms = 'Obligatori'
    ok = false
  }
  if (!validarEmail(form.value.email)) {
    errors.value.email = 'Email no valid'
    ok = false
  }
  if (!validarTelefon(form.value.telefon)) {
    errors.value.telefon = '9 numeros'
    ok = false
  }
  if (!validarData(form.value.dataNaiximent)) {
    errors.value.dataNaiximent = 'Format DD/MM/YYYY'
    ok = false
  }
  if (!validarContrasenya(form.value.contrasenya)) {
    errors.value.contrasenya = 'Minim 12 amb lletres numeros i especials'
    ok = false
  }
  if (form.value.contrasenya !== form.value.verificacioContrasenya) {
    errors.value.verificacioContrasenya = 'No coincideix'
    ok = false
  }
  if (form.value.adreca.trim() === '') {
    errors.value.adreca = 'Obligatori'
    ok = false
  }
  if (form.value.provincia === '') {
    errors.value.provincia = 'Tria provincia'
    ok = false
  }
  if (form.value.poblacio === '') {
    errors.value.poblacio = 'Tria poblacio'
    ok = false
  }
  if (!validarCodiPostal(form.value.codiPostal, form.value.provincia)) {
    errors.value.codiPostal = 'CP no va amb la provincia'
    ok = false
  }

  return ok
}

async function enviar() {
  confirmat.value = false
  if (!validar()) {
    return
  }

  const fet = await enviarRegistre(form.value)
  if (fet) {
    confirmat.value = true
    form.value = {
      nom: '',
      cognoms: '',
      email: '',
      telefon: '',
      dataNaiximent: '',
      contrasenya: '',
      verificacioContrasenya: '',
      adreca: '',
      provincia: '',
      poblacio: '',
      codiPostal: '',
    }
  }
}
</script>

<template>
  <div class="container" style="max-width: 520px">
    <h2>Register 2</h2>
    <p>Vue + Bootstrap</p>

    <form @submit.prevent="enviar" class="row g-3">
      <div class="col-12">
        <label class="form-label">Nom</label>
        <input v-model="form.nom" type="text" class="form-control" />
        <small class="text-danger">{{ errors.nom }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Cognoms</label>
        <input v-model="form.cognoms" type="text" class="form-control" />
        <small class="text-danger">{{ errors.cognoms }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Email</label>
        <input v-model="form.email" type="text" class="form-control" />
        <small class="text-danger">{{ errors.email }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Telefon</label>
        <input v-model="form.telefon" type="text" class="form-control" />
        <small class="text-danger">{{ errors.telefon }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Data naiximent (DD/MM/YYYY)</label>
        <input
          v-model="form.dataNaiximent"
          type="text"
          class="form-control"
          placeholder="25/05/2000"
        />
        <small class="text-danger">{{ errors.dataNaiximent }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Contrasenya</label>
        <input v-model="form.contrasenya" type="password" class="form-control" />
        <small class="text-danger">{{ errors.contrasenya }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Verificacio contrasenya</label>
        <input v-model="form.verificacioContrasenya" type="password" class="form-control" />
        <small class="text-danger">{{ errors.verificacioContrasenya }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Adreca</label>
        <input v-model="form.adreca" type="text" class="form-control" />
        <small class="text-danger">{{ errors.adreca }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Provincia</label>
        <select v-model="form.provincia" class="form-select" @change="canviProvincia">
          <option value="">-- tria --</option>
          <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
        </select>
        <small class="text-danger">{{ errors.provincia }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Poblacio</label>
        <select v-model="form.poblacio" class="form-select" :disabled="form.provincia === ''">
          <option value="">-- tria --</option>
          <option v-for="c in ciutats" :key="c" :value="c">{{ c }}</option>
        </select>
        <small class="text-danger">{{ errors.poblacio }}</small>
      </div>

      <div class="col-12">
        <label class="form-label">Codi postal</label>
        <input v-model="form.codiPostal" type="text" class="form-control" />
        <small class="text-danger">{{ errors.codiPostal }}</small>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary" :disabled="loading">Enviar</button>
      </div>
    </form>

    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    <div v-if="confirmat" class="alert alert-success mt-3">Registre fet correctament!</div>
  </div>
</template>
