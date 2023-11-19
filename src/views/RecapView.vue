<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import { useRecapStore } from '@/stores/recapStore.js';
  const recapStore = useRecapStore();

  const journey = recapStore.getJourney;
</script>

<template>
  <H1TitleLayout>Récapitulatif</H1TitleLayout>

  <div class="container">
    <main>
      <div class="img-container">
        <img :src="`img-planetes/${journey.planet.picture}`" :alt="journey.planet.name">
      </div>

      <div class="recap-container">

      </div>

      <div class="img-container">
        <img :src="`img-vaisseaux/${journey.ship.picture}`" :alt="journey.ship.name">
      </div>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  $imgContainerMargin: 5rem;

  .container {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
    @media (max-width: $sm-breakpoint) {
      margin: 3rem 0;
    }
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
    @media (max-width: $sm-breakpoint) {
      width: 100vw;
      border: none;
    }
  }

  .img-container {
    width: calc(100% - 2 * $imgContainerMargin);
    margin: $imgContainerMargin;
    @media (max-width: $sm-breakpoint) {
      width: 100%;
    }

    img {
      border-radius: 1rem;
      border: 1px solid rgba($color-light, 0.6);
      width: 100%;
      height: 50vh;
      object-fit: cover;
      object-position: center;
      @media (max-width: $sm-breakpoint) {
        border: none;
        height: 30vh;
      }
    }
  }
</style>
