<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import MainButton from '@/components/buttons/MainButton.vue';
  import { getPlanet, getShips } from '@/services/api.js';
  import { ref, computed, onBeforeMount } from 'vue';
  import { useRecapStore } from '@/stores/recapStore.js';
  const recapStore = useRecapStore();
  const router = useRouter();

  const planet = ref(undefined);
  const ships = ref(undefined);
  
  const planetId = computed(() => useRoute().params.id);

  onBeforeMount(() => {
    getPlanet(planetId.value)
      .then(response => planet.value = response)
      .catch(error => console.error(error));

    getShips()
      .then(response => ships.value = response)
      .catch(error => console.error(error));
  });

  // Form
  // Filter ships
  const selectedJourneyType = ref(null);

  const filteredships = computed(() => {
    if (selectedJourneyType.value === null) {
      let allJourneyTypesIds = [];
      if (ships.value !== undefined) {
        for (const type of planet.value.journeyTypes) {
          allJourneyTypesIds.push(type.id);
        }
        return ships.value.filter(ship => allJourneyTypesIds.includes(ship.journey_type_id));
      }
    } else {
      return ships.value.filter(ship => ship.journey_type_id === selectedJourneyType.value);
    }
  });
  
  // Journey dates
  const departureDate = ref(null);
  const returnDate = ref(null);
  const journeyDuration = computed(() => {
    if (departureDate.value === null || returnDate.value === null) {
      return null;
    } else {
      const diffDate = Math.ceil(Math.abs(new Date(returnDate.value) - new Date(departureDate.value)) / (1000 * 60 * 60 * 24));
      return diffDate < 1 ? 1 : diffDate;
    }
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  // Select a ship
  const selectedShipId = ref(null);

  // Calculate price
  const calculateJourneyPrice = (shipId) => {
    if (selectedJourneyType.value === 1 || selectedJourneyType.value === 3) {
      if (departureDate.value === null) {
        return `à partir de ${ships.value.find(ship => ship.id === shipId).journeyType.base_price * ships.value.find(ship => ship.id === shipId).coeff_price}`;
      } else {
        return planet.value.journeyTypes.find(type => type.id === selectedJourneyType.value).base_price * ships.value.find(ship => ship.id === shipId).coeff_price;
      }
    } else if (selectedJourneyType.value === 2) {
      if (departureDate.value === null || returnDate.value === null) {
        return `à partir de ${ships.value.find(ship => ship.id === shipId).journeyType.base_price * ships.value.find(ship => ship.id === shipId).coeff_price}`;
      } else {
        return planet.value.journeyTypes.find(type => type.id === selectedJourneyType.value).base_price * ships.value.find(ship => ship.id === shipId).coeff_price * journeyDuration.value;
        }
    } else {
      return `à partir de ${ships.value.find(ship => ship.id === shipId).journeyType.base_price * ships.value.find(ship => ship.id === shipId).coeff_price}`;
    }
  };

  // Submit journey
  // Check if form is completed
  const isFormCompleted = computed(() => {
    if (selectedJourneyType.value === null || selectedShipId.value === null) {
      return false;
    } else {
      if (selectedJourneyType.value === 2) {
        if (departureDate.value === null || returnDate.value === null) {
          return false;
        } else {
          return true;
        }
      } else {
        if (departureDate.value === null) {
          return false;
        } else {
          return true;
        }
      }
    }
  });

  // Check if dates are valid
  const checkDepartureDate = () => {
    if (departureDate.value === null || departureDate.value < getCurrentDate().split('-').reverse().join('-')) {
      recapStore.setDepartureErrorMessage("La date de départ doit au minimum correspondre à la date actuelle.");
      return false;
    } else {
      recapStore.resetDepartureErrorMessage();
      return true;
    }
  }

  const checkReturnDate = () => {
    if (returnDate.value === null || returnDate.value < departureDate.value) {
      recapStore.setReturnErrorMessage("La date de retour doit au minimum correspondre à la date de départ.");
      return false;
    } else {
      recapStore.resetReturnErrorMessage();
      return true;
    }
  }

  // Submit form
  const submitJourney = () => {
    if (checkDepartureDate() && ((selectedJourneyType.value === 2 && checkReturnDate()) || selectedJourneyType.value !== 2)) {
      recapStore.setJourney({
        planet: planet.value,
        journeyType: planet.value.journeyTypes.find(type => type.id === selectedJourneyType.value),
        departureDate: departureDate.value,
        returnDate: returnDate.value,
        journeyDuration: journeyDuration.value,
        ship: ships.value.find(ship => ship.id === selectedShipId.value),
        price: calculateJourneyPrice(selectedShipId.value)
      });

      router.push({ name: 'recap'});

    } else {
      router.push({ name: 'planet'});
    }
  }
</script>

<template>
  <H1TitleLayout>{{ planet === undefined ? '' : planet.name }}</H1TitleLayout>

  <div v-if="planet !== undefined" class="container">
    <main>
      <section>
        <div class="img-container">
          <img :src="`../img-planetes/${planet.picture}`" :alt="planet.name">
        </div>
        <div class="description-container">
            <div>
            <p>Système : {{ planet.system }}</p>
            <p>Distance : {{ planet.distance_from_earth }}</p>
            <p>Capitale : {{ planet.capital === null ? '-' : planet.capital }}</p>
          </div>
          <div>
            <p>Année de colonisation : {{ planet.date_colonization === null ? '-' : planet.date_colonization }}</p>
            <p>Nombre d'habitants : {{ planet.nb_inhabitants === null ? '-' : 
              (planet.nb_inhabitants < 1000000 ? new Intl.NumberFormat("fr-FR").format(planet.nb_inhabitants) : 
                (planet.nb_inhabitants >= 1000000000 ? `${(planet.nb_inhabitants / 1000000000).toFixed(2)} milliards` : `${(planet.nb_inhabitants / 1000000).toFixed(2)} millions`)
              ) }}
            </p>
            <p>Climat : {{ planet.climate.name }}</p>
          </div>
        </div>
      </section>

      <hr class="hr-1">

      <section>
        <form @submit.prevent="submitJourney">
          <div class="journey-types-container">
            <h2 class="title-1">Choisissez un type de voyage</h2>
            <label for="selectJourneyType"></label>
            <select v-model="selectedJourneyType" id="selectJourneyType">
              <option v-for="journeyType in planet.journeyTypes" :key="journeyType.id" :value="journeyType.id">
                {{ journeyType.name }}
              </option>
            </select>

            <div class="form-group">
              <label for="departureDate">Date de départ:</label>
              <p v-if="recapStore.getErrorMessages.departureDate !== ''" class="error-message">{{ recapStore.getErrorMessages.departureDate }}</p>
              <input type="date" v-model="departureDate">
            </div>

            <div v-if="selectedJourneyType === 2" class="form-group">
              <label for="returnDate" >Date de retour:</label>
              <p v-if="recapStore.getErrorMessages.returnDate !== ''" class="error-message">{{ recapStore.getErrorMessages.returnDate }}</p>
              <input type="date" v-model="returnDate">
            </div>
          </div>

          <hr class="hr-2">

          <div class="ships-container">
            <h2 class="title-2">Choisissez votre vaisseau</h2>
              <div class="ships-flex-container">
                <label v-for="ship in filteredships" :key="ship.id" :for="ship.id">
                  <input type="radio" :id="ship.id" name="ship" :value="ship.id" v-model="selectedShipId" class="ship-radio-input"/>

                  <div class="ship-container">
                    <p class="ship-name">{{ ship.name }}</p>
                    <p class="price">Prix du voyage : {{ calculateJourneyPrice(ship.id) }} €</p>
                    <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name" :class="[selectedShipId === ship.id ? 'selected-ship' : '']">
                  </div>
                </label>
              </div>
          </div>

          <div>
            <MainButton 
              colorMode="light" 
              class="main-button" 
              :class="{'disabled': !isFormCompleted}" 
              type="submit">
              Valider
            </MainButton>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  $shipImgWidth: 400px;

  .container {
    display: flex;
    justify-content: center;
    margin: 3rem;

    @media (max-width: $sm-breakpoint) {
      margin: 3rem 0;
    }
  }

  main {
    background: $color-dark-blue2;
    border-radius: 1rem;
    max-width: calc(3.5 * $shipImgWidth);
  }
  
  .img-container {
    width: 100%;
    margin-bottom: 1.5rem;

    img {
      border-radius: 1rem 1rem 0 0;
    }
  }

  .description-container {
    display: flex;
    justify-content: center;
    gap: 10rem;
    margin: 4rem 3rem 0rem;
    color: $color-light;

    div p {
      margin: 0;
      padding: 0.75rem;
    }

    @media (max-width: $md-breakpoint) {
      gap: 5rem;
    }

    @media (max-width: $sm-breakpoint) {
      flex-direction: column;
      align-items: center;
      gap: 0;

      div {
        text-align: center;
      }
    }
  }

  hr {
    width: 75%;
    margin: 4rem auto 2.5rem auto;
    color: $color-light;
  }

  .title-1 {
    text-align: center;
    margin-bottom: 2.5rem;
    color: $color-light;
    background-color: $color-dark-blue1;
    border: 1px solid $color-light;
    padding: 1rem;
    border-radius: 1rem;
    width: 50%;
  }
  .title-2 {
    margin: 4.5rem auto 1rem auto;
    background-color: $color-dark-blue1;
    color: $color-light;
    border: 1px solid $color-light;
    padding: 1rem;
    border-radius: 1rem;
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
    gap: 0.5rem;
  }
  .journey-types-container select {
    width: 20em;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
    text-align: center;
  }

  .journey-types-container option {
    text-align: center;
  }
  .journey-types-container label {
    margin-top: 0.5rem;
    color: $color-light;
  }
  .journey-types-container input { // Dates inputs
    width: 100%;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;

    input {
      text-align: center;
    }
  }

  .error-message {
    color: $color-alert;
    margin-block: 0;
  }

  .ships-flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 3rem auto 7rem;
  }

  .ship-radio-input {
    display: none;
  }

  .ship-container {
      margin: 4rem 2rem 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (max-width: $sm-breakpoint) {
        margin: 4rem 0 0;
      }
    }
  
  .ship-name{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem;
    color: $color-light;
  }

  .price {
    color: $color-light;
    margin: 0 0 1rem;
  }

  .ship-container img {
    border-radius: 1rem;
    width: $shipImgWidth;
    height: calc($shipImgWidth * 9/16);

    &:hover {
      box-shadow: 0 0 1rem $color-light;
      transform: scale(1.03);
      transition: transform 0.3s ease-in-out;
      cursor: pointer;

      @media (max-width: $sm-breakpoint) {
        transform: scale(1);
      }
    }
  }

  .selected-ship {
    border: 2px solid $color-light;
    box-shadow: 0 0 1rem $color-light;
    border-radius: 1rem;
  }
  
  .main-button {
    display: block;
    margin: 2rem auto 7rem auto;
    width: 25%;

    @media (max-width: $md-breakpoint) {
      width: 40%;
    }

    @media (max-width: $sm-breakpoint) {
      width: 60%;
    }

    &.disabled {
      color: $color-light;
      background-color: $color-night-blue;
      opacity: 0.25;
      cursor: default;
    }
  }
</style>
