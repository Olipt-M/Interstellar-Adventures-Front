<script setup>
  import { useRoute } from 'vue-router'; // Rajouter un getPlanetID en computed (avec params.id)
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getPlanet } from '@/services/api.js';
  import { ref } from 'vue';

  const planet = ref(undefined);
  
  getPlanet(2)
    .then(response => planet.value = response)
    .catch(error => console.error(error));
</script>

<template>
  <H1TitleLayout>{{ planet.name }}</H1TitleLayout>

  <div class="container">
    <div class="img-container">
      <img :src="`../img-planetes/${planet.picture}`" :alt="planet.name">
    </div>
  </div>
  
</template>

<style lang='scss' scoped>
  
</style>
