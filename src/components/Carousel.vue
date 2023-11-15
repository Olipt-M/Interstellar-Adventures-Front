<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { getPlanets } from '@/services/api.js';
import { ref, onBeforeMount } from 'vue';

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    const planets = ref([]);

    onBeforeMount(async () => {
      try {
        const response = await getPlanets();
        planets.value = response.data;
        console.log(planets.value);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des planètes :', error);
      }
    });

    return { planets };
  },
};
</script>

<template>
  <div>
    <carousel :autoplay="3000" :items-to-show="1">
      <slide v-for="planet in planets" :key="planet.id">
        <img :src="`img-planetes/${planet.picture}`" :alt="planet.name">
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
</style>
