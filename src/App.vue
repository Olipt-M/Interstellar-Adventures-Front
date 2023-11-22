<script setup>
  import { RouterView } from 'vue-router';
  import FooterLayout from '@/components/layouts/FooterLayout.vue';
  import HeaderLayout from '@/components/layouts/HeaderLayout.vue';
  import Overlay from '@/components/overlays/Overlay.vue';
  import OverlayNotConnected from '@/components/overlays/OverlayNotConnected.vue';
  import { useMenuStore } from '@/stores/menuStore.js';
  const menuStore = useMenuStore();
  import { useUserStore } from '@/stores/userStore.js';
  const userStore = useUserStore();
</script>

<template>
  <HeaderLayout />
  <RouterView />
  <FooterLayout />
  <Overlay :opened="menuStore.isMenuBurgerOpened" @click="menuStore.closeMenu()"/>
  <OverlayNotConnected :opened="userStore.isRequiredLoginOverlay"/>
</template>

<style lang='scss'>
  body {
    font-family: 'Electrolize', sans-serif;
    background-color: $color-dark-blue1;
    color: $color-night-blue;
  }

  input, textarea, select, button {
    font-family: 'Electrolize', sans-serif;
  }
</style>
