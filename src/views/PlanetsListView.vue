<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getClimates, getJourneyTypes, getPlanets } from '@/services/api.js';
  import { ref, onBeforeMount } from 'vue';
  import TailSpin from '@/components/icons/TailSpin.vue';
  import PlanetCard from '@/components/cards/PlanetCard.vue';

  const planets = ref(undefined);
  const isViewLoaded = ref(false);
  const climates = ref(undefined);
  const journeyTypes = ref(undefined);

  onBeforeMount(() => {
    setTimeout(() => {
      getPlanets()
        .then(response => planets.value = response)
        .catch(error => console.error(error));
      isViewLoaded.value = true;
    }, "1500");

    getClimates()
      .then(response => climates.value = response)
      .catch(error => console.error(error));

      getJourneyTypes()
      .then(response => journeyTypes.value = response)
      .catch(error => console.error(error));
  });
</script>

<template>
  <H1TitleLayout>Nos destinations</H1TitleLayout>

  <div class="container">
    <aside class="filters-container">
      <form class="filter journey-filter">
        <h3>Types de voyage</h3>

        <div class="form-group" v-for="journeyType in journeyTypes" :key="journeyType.id">
          <input type="checkbox" name="" id="">
          <label for="">{{ journeyType.name }}</label>
        </div>
      </form>

      <form class="filter climates-filter">
        <h3>Climats</h3>
        
        <div class="form-group" v-for="climate in climates" :key="climate.id">
          <input type="checkbox" name="" id="">
          <label for="">{{ climate.name }}</label>
        </div>
      </form>
    </aside>

    <main class="list-container">
      <PlanetCard v-for="planet in planets" :key="planet.id" :planet="planet"/>
      <TailSpin v-show="!isViewLoaded" class="loader"/>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    max-width: $xl-breakpoint;
    margin: 3rem auto;
    display: flex;
    gap: 3rem;
    justify-content: center;
  }

  .filters-container, .list-container {
    background: $color-dark-blue2;
  }

  .filters-container {
    border-radius: 1rem 0 0 1rem;
  }

  .filter {
    background: $color-light;
    border-radius: 1rem;
  }

  .list-container {
    border-radius: 0 1rem 1rem 0;
  }

  .loader {
    display: block;
    margin: auto;
  }
</style>
