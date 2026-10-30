<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About Us</RouterLink>
      <RouterLink to="/register-1">Register 1</RouterLink>
      <RouterLink to="/register-2">Register 2</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.menu {
  background: #eee;
  padding: 12px 20px;
  display: flex;
  gap: 16px;
}
.menu a {
  color: #333;
  text-decoration: none;
}
.menu a.router-link-active {
  font-weight: bold;
}
</style>
