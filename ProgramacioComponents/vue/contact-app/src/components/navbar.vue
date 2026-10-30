<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BContainer, BCollapse, BNavbarToggle } from 'bootstrap-vue-next'
</script>

<template>
  <BNavbar toggleable="lg" variant="success" bg="success" class="fixed-top shadow navbar-dark">
    <BContainer class="d-flex justify-content-center">
      
      <BNavbarToggle target="nav-collapse" class="ms-auto" />

      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="mx-auto">
          <BNavItem to="/" active-class="active" class="px-2">
             Contactes
          </BNavItem>
          <BNavItem to="/grups" active-class="active" class="px-2">
             Grups
          </BNavItem>
          <BNavItem to="/historial" active-class="active" class="px-2">
             Historial
          </BNavItem>
          <BNavItem to="/favorits" active-class="active" class="px-2">
             Favorits
          </BNavItem>
          <BNavItem to="/estadistiques" active-class="active" class="px-2">
             Estadístiques
          </BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BContainer>
  </BNavbar>
</template>

<style scoped>
/* Fem que els links siguin blancs explicitament si navbar-dark no és suficient */
:deep(.nav-link) {
  color: rgba(255, 255, 255, 0.85) !important;
}
:deep(.nav-link.active) {
  color: #fff !important;
  font-weight: 600;
}
</style>
