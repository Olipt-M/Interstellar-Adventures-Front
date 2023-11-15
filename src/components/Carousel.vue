<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import PlanetImageCard from './cards/PlanetImageCard.vue';



export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    PlanetImageCard
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
