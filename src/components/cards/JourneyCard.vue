<script setup>
  const props = defineProps({
    journey: {
      type: Object,
      required: true,
    }
  });
  
</script>

<template>
  <div class="card-container">
    <div class="img-planete-container">
      <img :src="`img-planetes/${journey.planet?.picture}`" :alt="journey.planet?.name">
    </div>

    <div class="description-container">
      <p>{{ journey.journeyType?.name }}</p>
        <div class="journey-duration">
            <p v-if="journey.journeyType?.id === 2">
                Du {{ journey.departure_date }} au {{ journey.return_date }}
            </p>
            <p v-else>Départ le {{ journey.departure_date }}</p>
        </div>
    </div>

    <div class="img-ship-container">
      <img :src="`img-vaisseaux/${journey.ship?.picture}`" :alt="journey.ship?.name">
    </div>
  </div>
</template>

<style lang='scss' scoped>

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.img-planete-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 100%;

  img {
    width: 100%; 
    border-radius: 1rem;
    max-width: 40rem; 
    min-height: 25rem;
    max-height: 25rem;
  }
}

.description-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $color-light;
  margin: 1rem 2rem 2rem 1rem;

  p {
    border: 1px solid $color-light;
    background-color: $color-dark-blue3;
    border-radius: 0.5rem;
    padding: 0.75rem;
    text-align: center;
    width: 100%; 
    max-width: 20rem; 
  }

  .journey-duration {
    margin-top: 1rem;

    p {
      width: 100%; 
    }
  }

  @media (min-width: 768px) {
    flex: 1; 
    margin: 0 1rem;
  }
}

.img-ship-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 100%; 

  img {
    width: 100%; 
    border-radius: 1rem;
    max-width: 40rem; 
    min-height: 25rem;
    max-height: 25rem;
  }
}

@media (min-width: 768px) {
  .img-ship-container {
    max-width: 450px; 
  }
}

</style>

