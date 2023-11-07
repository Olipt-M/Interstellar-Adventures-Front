<script setup>
  import MenuExtendedLayout from '@/components/layouts/MenuExtendedLayout.vue';
  import ButtonBurger from '@/components/buttons/ButtonBurger.vue';
  import MenuInBurgerLayout from '@/components/layouts/MenuInBurgerLayout.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="container">
    <p><RouterLink :to="{name: 'home'}" class="nav-link">Interstellar Adventures</RouterLink></p>
    
    <div class="extended-menu"><MenuExtendedLayout/></div>
    <div class="burger-menu"><ButtonBurger/></div>
    
    <MenuInBurgerLayout/>
  </header>
</template>

<style lang="scss" scoped>
  .container {
    background: $color-night-blue;
    color: $color-light;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem;
  }

  .nav-link {
    color: $color-light;
    text-decoration: none;
    text-transform: uppercase;
  }

  @media (max-width: $md-breakpoint) {
    .extended-menu {
      display: none;
    }
  }

  @media (min-width: calc($md-breakpoint + 1px)) {
    .burger-menu {
      display: none;
    }
  }
</style>
