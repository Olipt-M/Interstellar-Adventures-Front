<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import MainButton from '@/components/buttons/MainButton.vue';
  import { registerJourney } from '@/services/api.js';
  import { useRecapStore } from '@/stores/recapStore.js';
  const recapStore = useRecapStore();
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const journey = recapStore.getJourney;

  const confirmJourney = () => {
    // A FAIRE : D'abord vérifier si l'utilisateur est connecté

    // A FAIRE : Lier le voyage à l'utilisateur
    registerJourney({
      ship_id: journey.ship.id,
      planet_id: journey.planet.id,
      journey_type_id: journey.journeyType.id,
      departure_date: journey.departureDate,
      return_date: journey.returnDate,
      price: journey.price
    })
    .then(() => {
      recapStore.resetJourney;
      router.push({ name: 'account'});
    })
    .catch(error => console.error(error));
  }
</script>

<template>
  <H1TitleLayout>Récapitulatif</H1TitleLayout>

  <div class="container">
    <main>
      <div class="img-container">
        <img :src="`img-planetes/${journey.planet.picture}`" :alt="journey.planet.name">
      </div>

      <div class="recap-container">
        <p>{{ journey.planet.name }}</p>
        <p>Votre voyage : {{ journey.journeyType.name }}</p>
        <p v-if="journey.journeyType.id === 2">Du {{ journey.departureDate.split('-').reverse().join('/') }} au {{ journey.returnDate.split('-').reverse().join('/') }}</p>
        <p v-else>Départ le {{ journey.departureDate }}</p>
        <p>Prix : {{ journey.price }} €</p>
        <p>Votre vaisseau : {{ journey.ship.name }}</p>
      </div>

      <div class="img-container">
        <img :src="`img-vaisseaux/${journey.ship.picture}`" :alt="journey.ship.name">
      </div>

      <MainButton class="confirm-btn" @click="confirmJourney">Confirmer la réservation</MainButton>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  $imgContainerMargin: 5rem;
  @media (max-width: $sm-breakpoint) {
    $imgContainerMargin: 2rem;
  }

  .container {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
  }

  main {
    width: 60vw;
    max-width: $xxl-breakpoint;
    background: $color-dark-blue2;
    color: $color-light;
    border-radius: 1rem;
    border: 1px solid rgba($color-light, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: $lg-breakpoint) {
      width: 75vw;
    }
    @media (max-width: $md-breakpoint) {
      width: 90vw;
    }
    @media (max-width: $sm-breakpoint) {
      width: 100vw;
      border: none;
      border-radius: 0;
    }
  }

  .img-container {
    width: calc(100% - 2 * $imgContainerMargin);
    margin: $imgContainerMargin;

    @media (max-width: $sm-breakpoint) {
      width: 100%;
    }

    &:first-of-type {
      @media (max-width: $sm-breakpoint) {
        margin-top: 0;
      }
    }

    img {
      border-radius: 1rem;
      border: 1px solid rgba($color-light, 0.6);
      width: 100%;
      height: 50vh;
      object-fit: cover;
      object-position: center;

      @media (max-width: $xl-breakpoint) {
        height: 40vh;
      }
      @media (max-width: $md-breakpoint) {
        height: 30vh;
      }
      @media (max-width: $sm-breakpoint) {
        border: none;
        border-radius: 0;
      }
    }
  }

  .recap-container {
    border-radius: 1rem;
    border: 1px solid rgba($color-light, 0.6);
    width: calc(100% - 2 * $imgContainerMargin);
    background: $color-dark-blue1;
    text-align: center;
    margin: 0;
    
    p:first-of-type {
      text-transform: uppercase;
      font-weight: bold;
    }

    @media (max-width: $sm-breakpoint) {
      border: none;
      width: 100%;
      border-radius: 0;
    }
  }

  .confirm-btn {
    margin-bottom: 5rem;

    @media (max-width: $sm-breakpoint) {
      margin-bottom: 3rem;
    }
  }
</style>
