<script setup lang="ts">
import { BContainer } from 'bootstrap-vue-next'
import Navbar from '@/components/navbar.vue'
</script>

<template>
  <Navbar />

  <main class="py-5 mt-5">
    <BContainer>
      <RouterView />
    </BContainer>
  </main>
</template>
