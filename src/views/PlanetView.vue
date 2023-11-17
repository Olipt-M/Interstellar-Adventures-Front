<script setup>
  import { useRoute, RouterLink } from 'vue-router';
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import MainButton from '@/components/buttons/MainButton.vue';
  import { getPlanet, getShips } from '@/services/api.js';
  import { ref, computed } from 'vue';

  const planet = ref(undefined);
  const ships = ref(undefined);
  const selectedJourneyType = ref(null);
  const departureDate = ref(null);
  const returnDate = ref(null);
  const journeyDuration = computed(() => {
    if (departureDate.value === null || returnDate.value === null) {
      return null;
    } else {
      return returnDate.value - departureDate.value;
      // const date1 = new Date(departureDate.value);
      // const date2 = new Date(returnDate.value);
      // const diffTime = Math.abs(date2 - date1);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // return diffDays;
    }
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const planetId = computed(() => {
    return useRoute().params.id;
  });

  getPlanet(planetId.value)
    .then(response => planet.value = response)
    .catch(error => console.error(error));

  getShips()
    .then(response => ships.value = response)
    .catch(error => console.error(error));

  // Filter ships
  const filteredships = computed(() => {
    if (selectedJourneyType.value === null) {
      return ships.value;
    } else {
      return ships.value.filter(ship => ship.journey_type_id === selectedJourneyType.value);
    }
  });
</script>

<template>
  <H1TitleLayout>{{ planet.name }}</H1TitleLayout>

  <div class="container">
    <main>
      <section>
        <div class="img-container">
          <img :src="`../img-planetes/${planet.picture}`" :alt="planet.name">
        </div>
        <div class="description-container">
          <p>{{ planet.system }}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, accusamus excepturi sed mollitia quae fugit facere labore rem ipsam quam soluta incidunt voluptatibus quos obcaecati ipsum sapiente nihil suscipit! Dolorum?
          Et velit dolore recusandae? Modi maiores quaerat quos unde dolore asperiores adipisci, nisi minus culpa iure quibusdam. Enim tempore fuga dolor saepe quisquam molestias dicta! In, ab mollitia! Recusandae, in?
          Alias impedit perspiciatis sequi veritatis sapiente dolorum est similique quibusdam architecto assumenda aut quam voluptatum facilis tempora tempore, quod ab aspernatur delectus numquam non! Laborum deserunt quo suscipit repellat. Amet!
          Molestiae, voluptas minima velit at necessitatibus ut dolores exercitationem ipsa placeat magnam. Ipsam cumque earum ratione. Dolorem reprehenderit ut iure quas, temporibus a? Incidunt aspernatur alias aliquam sed nemo accusantium?
          Atque reprehenderit cumque necessitatibus nobis itaque placeat magni animi. Error ipsam magnam exercitationem unde tenetur distinctio architecto quod beatae animi officiis. Facere eius sint aspernatur facilis id? Animi, repellendus ut?
          </p>
        </div>
      </section>

      <hr class="hr-1">

      <section class="journey-types-container">
        <h2 class="title-1">Choisissez un type de voyage</h2>
        <select v-model="selectedJourneyType">
          <option v-for="journeyType in planet.journeyTypes" :key="journeyType.id" :value="journeyType.id">
            {{ journeyType.name }}
          </option>
        </select>

        <div class="form-group">
          <label for="departureDate">Date de départ:</label>
          <input type="date" v-model="departureDate" :min="getCurrentDate()">

          <label for="returnDate" v-if="selectedJourneyType !== 3" >Date de retour:</label>
          <input type="date" v-if="selectedJourneyType !== 3" v-model="returnDate" :min="departureDate">
        </div>
      </section>

      <hr class="hr-2">

      <section class="ships-container">
        <h2 class="title-2">Choisissez votre vaisseau</h2>
          <div class="ships-flex-container">
            <div class="ship-container" v-for="ship in filteredships" :key="ship.id" :value="ship.id">
              <p class="ship-name">{{ ship.name }}</p>
              <p class="price" v-if="selectedJourneyType === 1">Prix du voyage : {{ planet.journeyTypes.find(type => type.id === selectedJourneyType).base_price * ship.coeff_price }} €</p>
              <p class="price" v-else-if="selectedJourneyType === 2">Prix du voyage : {{ departureDate }} €</p>
              <p class="price" v-else-if="selectedJourneyType === 3">Prix du voyage : {{ planet.journeyTypes.find(type => type.id === selectedJourneyType).base_price * ship.coeff_price }} €</p>
              <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name">
            </div>
          </div>
      </section>

      <div>
        <RouterLink to="/recap">
          <MainButton colorMode="light" class="main-button">
            Valider
          </MainButton>
        </RouterLink>
      </div>
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

  .description-container {
    margin: 4.5rem 1.5rem 0rem 1.5rem;
    color: $color-light;
    text-align: justify;
  }

  .description-container p {
    line-height: 1.7;
  }
  .hr-1 {
    width: 75%;
    margin: 4rem auto 2.5rem auto;
  }
  .hr-2 {
    width: 75%;
    margin: 4.5rem auto 2.5rem auto;
  }
  .img-container {
    width: 100%;
    margin-bottom: 1.5rem;

    img {
      border-radius: 1rem 1rem 0 0;
    }
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
    border-radius: 0.5rem;
    &:hover{
      cursor: pointer;
    }
  }
  .journey-types-container option {
    text-align: center;
  }
  .journey-types-container label {
    margin-top: 0.5rem;
    color: $color-light;
  }
  .journey-types-container input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .ships-flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 3rem auto 7rem;
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
    margin: 0 0 1rem 0;
    color: $color-light;
  }

  .price {
    color: $color-light;
  }

  .ship-container img {
    border-radius: 0.5rem;
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
  
  .main-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 7rem auto;
    width: 25%;
  }
</style>
