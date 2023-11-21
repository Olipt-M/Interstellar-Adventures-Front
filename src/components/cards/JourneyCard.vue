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
      <img :src="`img-planetes/${journey.planet.picture}`" :alt="journey.planet.name">
    </div>

    <div class="description-container">
      <p>{{ journey.journeyType.name }}</p>
        <div class="journey-duration">
            <p v-if="journey.journeyType.id === 2">
                Du {{ journey.departureDate }} au {{ journey.returnDate }}
            </p>
            <p v-else>Départ le {{ journey.journeyType.departureDate }}</p>
        </div>
    </div>

    <div class="img-ship-container">
      <img :src="`img-vaisseaux/${journey.ship.picture}`" :alt="journey.ship.name">
    </div>
  </div>
</template>

<style lang='scss' scoped>

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
}

.img-planete-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 450px;
}
.description-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color : $color-light;
  margin: 0 3rem;
}

.description-container p{
    border: 1px solid $color-light;
    background-color: $color-dark-blue3;
    border-radius: 0.5rem;
    padding: 0.75rem;
    width: 10vw;
    text-align: center;

}

.duration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color : $color-light;
}

.img-ship-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 450px;
}

img {
  border-radius: 1rem;
  max-width: 40rem;
  min-height: 25rem;
  max-height: 25rem;
}

</style>
