<script setup lang="ts">
import { ref, computed } from 'vue'

const searchText = ref('')
const tasks = ['Aprender Vue', 'Hacer tarea', 'Comprar pan', 'Llamar al banco', 'Estudiar programació']

const filteredTasks = computed(() => {
  if (searchText.value.length < 3) {
    return tasks
  }
  return tasks.filter(task => task.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <div>
    <h2>Buscador de tasques</h2>
    <input
      v-model="searchText"
      placeholder="Escriu almenys 3 caràcters"
      style="width: 100%; max-width: 300px;"
    />

    <ul style="margin-top: 0.75rem">
      <li v-for="task in filteredTasks" :key="task">{{ task }}</li>
    </ul>

    <div v-if="searchText.length > 0 && searchText.length < 3" style="color: gray">
      Comença a filtrar a partir del tercer caràcter.
    </div>
  </div>
</template>

<style scoped>
input {
  padding: 0.4rem 0.5rem;
}
</style>
