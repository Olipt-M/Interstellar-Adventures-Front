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
  <main>
    <H1TitleLayout>{{ planet.name }}</H1TitleLayout>

    <section class="container">
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
            <p class="class">{{ ship.name }}</p>
            <img :src="`../img-vaisseaux/${ship.picture}`" :alt="ship.name">
          </div>
        </div>
    </section>

    <div>
      <RouterLink to="/recap">
        <MainButton class="main-button">
          <span>Valider</span>
        </MainButton>
      </RouterLink>
    </div>
  </main>  
</template>

<style lang='scss' scoped>

  .main-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem auto 5rem auto;
    width: 25%;
  }

  .description-container {
    margin: 4.5rem 1.5rem 0rem 1.5rem;
    color: $color-light;
    text-align: justify;
  }

  .description-container p{
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
    margin: 3rem 0 1.5rem 0;
  }
  .title-1 {
    text-align: center;
    margin-bottom: 2.5rem;
    color: $color-light;
    background-color: $color-dark-blue2;
    border: 1px solid $color-light;
    padding: 1rem;
    border-radius: 1rem;
    width: 50%;
  }
  .title-2 {
  margin: 4.5rem auto 1rem auto;
  background-color: $color-dark-blue2;
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
  }

  .ship-container,
  .ships-img-container-eco, 
  .ships-img-container-standard, 
  .ships-img-container-premium {

      flex-basis: 30%;
      margin: 4rem 2rem 4rem 2rem; 

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
  
  .class{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem 0;
    color: $color-light;
  }

  .ship-container img,
  .ships-img-container-eco img, 
  .ships-img-container-standard img, 
  .ships-img-container-premium img{
    border-radius: 0.5rem;
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 0 1rem $color-light;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
    }
  }
</style>
