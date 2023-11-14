<script setup>
  import { useRoute } from 'vue-router';
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { getPlanet, getJourneyTypes, getShip } from '@/services/api.js';
  import { ref } from 'vue';

  const planet = ref(undefined);
  const journeyTypes = ref(undefined);
  const ship = ref(undefined);
  const route = useRoute();
  const selectedJourneyType = ref(null);
  const departureDate = ref(null);
  const returnDate = ref(null);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  getPlanet(2)
    .then(response => planet.value = response)
    .catch(error => console.error(error));

  getJourneyTypes(1)
    .then(response => journeyTypes.value = response)
    .catch(error => console.error(error));

  getShip(2)
    .then(response => ship.value = response)
    .catch(error => console.error(error));

</script>

<template>
  <div>
    <H1TitleLayout>{{ planet.name }}</H1TitleLayout>

    <div class="container">
      <div class="img-container">
        <img :src="`../img-planetes/${planet.picture}`" :alt="planet.name">
      </div>
    </div>

    <hr class="hr-1">

    <div class="journey-types-container">
      <h2 class="title-1">Choisissez un type de voyage</h2>
      <select v-model="selectedJourneyType" @change="handleJourneyTypeChange">
        <option v-for="journeyType in journeyTypes" :key="journeyType.id" :value="journeyType.id">
          {{ journeyType.name }}
        </option>
      </select>

      <div class="form-group">
        <label for="departureDate">Date de départ:</label>
        <input type="date" v-model="departureDate" :min="getCurrentDate()">

        <label for="returnDate" v-if="selectedJourneyType !== 3" >Date de retour:</label>
        <input type="date" v-if="selectedJourneyType !== 3" v-model="returnDate" :min="departureDate">
      </div>
    </div>

    <hr class="hr-2">

    <div class="ships-container">
      <h2 class="title-2">Choisissez votre vaisseau</h2>
        <div class="ships-flex-container">
          <div class="ships-img-container">
            <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name">
          </div>
          <div class="ships-img-container">
            <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name">
          </div>
          <div class="ships-img-container">
            <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name">
          </div>
        </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

  .hr-1 {
    width: 70%;
    margin: 4em auto 1.5em auto;
  }
  .hr-2 {
    width: 70%;
    margin: 2.5em auto 2.5em auto;
  }
  .img-container {
    width: 100%;
    margin: 1.5em 0 1.5em 0;
  }
  .title-1 {
    text-align: center;
    margin-bottom: 1.5em;
    color: $color-light;
    background-color: $color-dark-blue2;
    border: 1px solid $color-light;
    padding: 0.5em;
    border-radius: 0.5em;
    width: 50%;
  }
  .title-2 {
  margin: 1.5em auto 0.5em auto;
  background-color: $color-dark-blue2;
  color: $color-light;
  border: 1px solid $color-light;
  padding: 0.5em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
  }


  .journey-types-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }
  .journey-types-container select {
    width: 20em;
    padding: 0.5em;
    border-radius: 0.5em;
  }
  .journey-types-container option {
    text-align: center;
  }
  .journey-types-container label {
    margin-top: 0.5em;
    color: $color-light;
  }
  .journey-types-container input {
    width: 100%;
    padding: 0.5em;
    border-radius: 0.5em;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }

  .ships-flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .ships-img-container {

      flex-basis: 30%;
      margin: 4rem 2rem 5rem 2rem; 

      @media (max-width: $lg-breakpoint) {
        flex-basis: 100%;
      }

      @media (max-width: $md-breakpoint) {
        flex-basis: 100%;
      }

      @media (max-width: $sm-breakpoint) {
        flex-basis: 100%;
      }
    }

  .ships-img-container img{
    border-radius: 0.5rem;
  } 
  

</style>
