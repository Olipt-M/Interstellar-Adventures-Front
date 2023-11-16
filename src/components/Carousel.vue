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
        const response = await getPlanets(1, 23);
        planets.value = [...response.data].sort(() => Math.random() - 0.5).slice(0, 5); // [...] permet de créer une copie de la liste sans toucher à l'odre initial des planètes 
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
    <carousel :autoplay="2500" :items-to-show="1">
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


<style lang="scss">
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

.carousel__pagination-item{
  margin-bottom: 3rem;
}

.carousel__pagination{
  margin: 0;
  padding: 0;
}

img{
  width: 100vw;
  height: 80vh;
  object-fit: cover;
}

.carousel__slide {
  padding: 0px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: $color-light;
  &:hover{
    color: $color-light;
  }

}
</style>