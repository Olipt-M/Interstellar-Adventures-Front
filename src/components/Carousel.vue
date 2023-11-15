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
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>


<style scoped>
.carousel__item {
  min-height: 500px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.carousel__slide {
  padding: 0px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
