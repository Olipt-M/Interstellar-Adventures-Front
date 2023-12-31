<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getClimates, getJourneyTypes, getPlanets } from '@/services/api.js';
  import { ref, onBeforeMount, computed } from 'vue';
  import TailSpin from '@/components/icons/TailSpin.vue';
  import PlanetCard from '@/components/cards/PlanetCard.vue';
  import MainButton from '@/components/buttons/MainButton.vue';

  // Consume API
  const planets = ref(undefined);
  const newPlanets = ref(undefined);
  const planetsArray = ref([]);
  const isViewLoaded = ref(false);
  const climates = ref(undefined);
  const journeyTypes = ref(undefined);
  const page = ref(1);
  const maxPlanetsAtOnce = ref(10);
  const nbOfPlanets = ref(undefined);
  const checkedClimatesIds = ref([]);
  const checkedJourneyTypesIds = ref([]);

  onBeforeMount(() => {
    getPlanets(page.value, maxPlanetsAtOnce.value)
      .then(response => planets.value = response)
      .then(response => planetsArray.value = response.data)
      .then(() => nbOfPlanets.value = planets.value.meta.total)
      // .then(() => console.log(planets.value))
      .catch(error => console.error(error));
    isViewLoaded.value = true;

    getClimates()
      .then(response => climates.value = response)
      .catch(error => console.error(error));

    getJourneyTypes()
      .then(response => journeyTypes.value = response)
      .catch(error => console.error(error));
  });

  const displayMore = () => {
    isViewLoaded.value = false;

    getPlanets(++page.value, maxPlanetsAtOnce.value)
    .then(response => newPlanets.value = response)
    .then(response => planetsArray.value = planetsArray.value.concat(response.data))
    // .then(() => console.log(planetsArray.value))
    .catch(error => console.error(error));
    isViewLoaded.value = true;
  }

  // Filter planets
  const filteredPlanets = computed(() => {
    if (checkedClimatesIds.value.length === 0 && checkedJourneyTypesIds.value.length === 0) {
      return planetsArray.value;
    }
    else if (checkedClimatesIds.value.length !== 0 && checkedJourneyTypesIds.value.length === 0) {
      return planetsArray.value.filter(planet => checkedClimatesIds.value.includes(planet.climate.id));
    }
    else if (checkedClimatesIds.value.length === 0 && checkedJourneyTypesIds.value.length !== 0) {
      return planetsArray.value.filter(planet => planet.journeyTypes.some(journeyType => checkedJourneyTypesIds.value.includes(journeyType.id)));
    }
    else {
      return planetsArray.value.filter(planet => 
        checkedClimatesIds.value.includes(planet.climate.id) 
        && planet.journeyTypes.some(journeyType => checkedJourneyTypesIds.value.includes(journeyType.id))
      );
    }
  });
</script>

<template>
  <H1TitleLayout>Nos destinations</H1TitleLayout>

  <div class="container">
    <aside class="filters-container">
      <form class="journeys-filter">
        <h3>Types de voyage</h3>

        <div class="form-group" v-for="journeyType in journeyTypes" :key="journeyType.id">
          <input
            type="checkbox"
            name="journeyTypeId"
            :value="journeyType.id"
            :id="journeyType.name"
            v-model="checkedJourneyTypesIds"
          >
          <label :for="journeyType.name">{{ journeyType.name }}</label>
        </div>
      </form>

      <form class="climates-filter">
        <h3>Climats</h3>
        
        <div class="form-group" v-for="climate in climates" :key="climate.id">
          <input
            type="checkbox"
            name="climateId"
            :value="climate.id"
            :id="climate.name"
            v-model="checkedClimatesIds"
          >
          <label :for="climate.name">{{ climate.name }}</label>
        </div>
      </form>
    </aside>

    <main class="list-container">
      <div class="list">
        <div v-for="(planet, index) in filteredPlanets" :key="planet.id">
          <PlanetCard :planet="planet" class="planet-card"/>
          <hr v-if="index < filteredPlanets.length - 1">
        </div>
      </div>
      <TailSpin v-show="!isViewLoaded" class="loader"/>
      <MainButton v-show="isViewLoaded && page < nbOfPlanets / maxPlanetsAtOnce" class="display-button" @click="displayMore">Afficher plus</MainButton>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    margin: auto;
    padding: 3rem;
    display: flex;
    gap: 0 2rem;
    justify-content: center;
    max-width: $xxl-breakpoint;
  }

  .filters-container, .list-container {
    background: $color-dark-blue2;
  }

  .filters-container {
    border-radius: 1rem 0 0 1rem;
    flex-basis: 15%;
    min-width: 200px;
  }

  .journeys-filter, .climates-filter {
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

      label, input {
        cursor: pointer;
      }
    }
  }

  .list-container {
    border-radius: 0 1rem 1rem 0;
    flex-basis: 80%;
  }

  .planet-card:first-of-type {
    margin-top: 2rem;
  }

  hr {
    margin: 1rem auto;
    width: 60%;
    color: $color-light;
  }

  .display-button {
    display: block;
    margin: 3rem auto 5rem;
  }

  .loader {
    display: block;
    margin: 3rem auto;
  }

  @media screen and (max-width: $lg-breakpoint) {
    .container {
      padding: 3rem 1rem;
    }
  }
</style>
