<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getClimates, getJourneyTypes, getPlanets } from '@/services/api.js';
  import { ref, onBeforeMount, computed } from 'vue';
  import TailSpin from '@/components/icons/TailSpin.vue';
  import PlanetCard from '@/components/cards/PlanetCard.vue';

  const planets = ref(undefined);
  const isViewLoaded = ref(false);
  const climates = ref(undefined);
  const journeyTypes = ref(undefined);
  const checkedClimatesIds = ref([]);
  // const filteredPlanets = computed(() => []);

  const filterClimates = (id) => {
    checkedClimatesIds.value.push(id);
    console.log(checkedClimatesIds.value);
  };

  onBeforeMount(() => {
    setTimeout(() => {
      getPlanets()
        .then(response => planets.value = response)
        // .then(response => response.filter(planet => checkedClimatesIds.value.includes(planet.climate.id)))
        // .then(response => filteredPlanets.value = response)
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

  const filteredPlanets = computed(() => {
    if (checkedClimatesIds.value.length === 0) {
      return planets.value;
    }

    // if (planets.value.find())

    return planets.value.filter(planet => checkedClimatesIds.value.includes(planet.climate.id));
  });
</script>

<template>
  <H1TitleLayout>Nos destinations</H1TitleLayout>

  <div class="container">
    <aside class="filters-container">
      <form class="filter journey-filter">
        <h3>Types de voyage</h3>

        <div class="form-group" v-for="journeyType in journeyTypes" :key="journeyType.id">
          <input type="checkbox" :name="journeyTypeId" :value="journeyType.id" :id="journeyType.id">
          <label :for="journeyType.id">{{ journeyType.name }}</label>
        </div>
      </form>

      <form class="filter climates-filter">
        <h3>Climats</h3>
        
        <div class="form-group" v-for="climate in climates" :key="climate.id">
          <input type="checkbox" :name="climateId" :value="climate.id" :id="climate.id" @change="filterClimates(climate.id)">
          <label :for="climate.id">{{ climate.name }}</label>
        </div>
      </form>
    </aside>

    <main class="list-container">
      <PlanetCard v-for="planet in filteredPlanets" :key="planet.id" :planet="planet"/>
      <TailSpin v-show="!isViewLoaded" class="loader"/>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    max-width: $xl-breakpoint;
    margin: 3rem;
    display: flex;
    gap: 3rem 2rem;
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
    margin: 4rem 2rem;

    h3 {
      padding: 1rem 0.5rem;
      margin: 0;
      text-align: center;
    }

    .form-group {
      padding: 0.5rem 1rem;

      &:first-of-type {
        padding-top: 2rem;
      }

      &:last-of-type {
        padding-bottom: 2rem;
      }
    }
  }

  .list-container {
    border-radius: 0 1rem 1rem 0;
  }

  .loader {
    display: block;
    margin: auto;
  }
</style>
