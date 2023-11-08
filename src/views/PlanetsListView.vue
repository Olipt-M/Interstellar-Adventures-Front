<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getClimates, getPlanets } from '@/services/api.js';
  import { ref, onBeforeMount } from 'vue';
  import TailSpin from '@/components/icons/TailSpin.vue';

  const planets = ref(undefined);
  const isViewLoaded = ref(false);

  onBeforeMount(() => {
    setTimeout(() => {
      getPlanets()
      .then(response => planets.value = response)
      .catch(error => console.error(error));
      isViewLoaded.value = true;
    }, "1500");
  });
</script>

<template>
  <H1TitleLayout>Nos destinations</H1TitleLayout>

  <div class="container">
    <aside class="filters-container">

    </aside>

    <main class="list-container">
      <p v-for="planet in planets" :key="planet.id">{{ planet.name }}</p>
      <TailSpin v-show="!isViewLoaded" class="loader"/>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    max-width: $xl-breakpoint;
    margin: 3rem auto;
  }

  .filters-container, .list-container {
    background: $color-dark-blue2;
  }
</style>
