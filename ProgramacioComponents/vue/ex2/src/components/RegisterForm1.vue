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
  <div>
    <h2>Register 1</h2>
    <p>Vue normal (sense Bootstrap)</p>

    <form @submit.prevent="enviar" class="formulari">
      <div class="camp">
        <label>Nom</label>
        <input v-model="form.nom" type="text" />
        <span class="error">{{ errors.nom }}</span>
      </div>

      <div class="camp">
        <label>Cognoms</label>
        <input v-model="form.cognoms" type="text" />
        <span class="error">{{ errors.cognoms }}</span>
      </div>

      <div class="camp">
        <label>Email</label>
        <input v-model="form.email" type="text" />
        <span class="error">{{ errors.email }}</span>
      </div>

      <div class="camp">
        <label>Telefon</label>
        <input v-model="form.telefon" type="text" />
        <span class="error">{{ errors.telefon }}</span>
      </div>

      <div class="camp">
        <label>Data naiximent (DD/MM/YYYY)</label>
        <input v-model="form.dataNaiximent" type="text" placeholder="25/05/2000" />
        <span class="error">{{ errors.dataNaiximent }}</span>
      </div>

      <div class="camp">
        <label>Contrasenya</label>
        <input v-model="form.contrasenya" type="password" />
        <span class="error">{{ errors.contrasenya }}</span>
      </div>

      <div class="camp">
        <label>Verificacio contrasenya</label>
        <input v-model="form.verificacioContrasenya" type="password" />
        <span class="error">{{ errors.verificacioContrasenya }}</span>
      </div>

      <div class="camp">
        <label>Adreca</label>
        <input v-model="form.adreca" type="text" />
        <span class="error">{{ errors.adreca }}</span>
      </div>

      <div class="camp">
        <label>Provincia</label>
        <select v-model="form.provincia" @change="canviProvincia">
          <option value="">-- tria --</option>
          <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
        </select>
        <span class="error">{{ errors.provincia }}</span>
      </div>

      <div class="camp">
        <label>Poblacio</label>
        <select v-model="form.poblacio" :disabled="form.provincia === ''">
          <option value="">-- tria --</option>
          <option v-for="c in ciutats" :key="c" :value="c">{{ c }}</option>
        </select>
        <span class="error">{{ errors.poblacio }}</span>
      </div>

      <div class="camp">
        <label>Codi postal</label>
        <input v-model="form.codiPostal" type="text" />
        <span class="error">{{ errors.codiPostal }}</span>
      </div>

      <button type="submit" :disabled="loading">Enviar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="confirmat" class="ok">Registre fet correctament!</p>
  </div>
</template>

<style scoped>
.formulari {
  max-width: 350px;
}
.camp {
  margin-bottom: 10px;
}
label {
  display: block;
}
input,
select {
  width: 100%;
  padding: 5px;
}
.error {
  color: red;
  font-size: 14px;
}
.ok {
  color: green;
  font-weight: bold;
}
</style>

