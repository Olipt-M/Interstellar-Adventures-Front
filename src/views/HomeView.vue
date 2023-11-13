<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getPlanets } from '@/services/api.js';
  import { ref, onBeforeMount } from 'vue';
  import Carousel from '@/components/Carousel.vue';
  // import PlanetImageCard from '@/components/cards/PlanetImageCard.vue';

  const planets = ref(undefined);

  onBeforeMount(() => {
    getPlanets()
       .then(response => planets.value = response)
       .catch(error => console.error(error));
  });

</script>

<template>
    <H1TitleLayout>Interstellar Adventures</H1TitleLayout>
    <p>Explore the vast expanse of our solar system</p>
    <div>
      <!-- <PlanetImageCard v-for="planet in planets" :key="planet.id" :planet="planet"/> -->
      <Carousel/>
    </div>
</template>

<style lang='scss' scoped>

  p {
    text-align: center;
    color: $color-light;
    padding: 3rem;
    margin: 0;
  }
  
</style>
