<script setup>
  import { RouterView } from 'vue-router';
  import FooterLayout from '@/components/layouts/FooterLayout.vue';
</script>

<template>
  <RouterView />
  <FooterLayout />
</template>

<style lang='scss'>
  body {
    font-family: 'Electrolize', sans-serif;
    background-color: $color-dark-blue1;
  }

  input, textarea, select, button {
    font-family: 'Electrolize', sans-serif;
  }
</style>
