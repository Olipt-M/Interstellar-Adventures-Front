<script setup>
  const props = defineProps({
    planet: {
      type: Object,
      required: true
    }
  });
</script>

<template>
  <div class="container">
    <div class="img-container">
      <img :src="`img-planetes/${planet.picture}`" :alt="planet.name">
    </div>

    <div class="description-container">
      <h3>{{ planet.name }}</h3>
      <p>{{ planet.system }}</p>
      <p>Distance : {{ planet.distance_from_earth }}</p>
      <p>Capitale : {{ planet.capital === null ? '-' : planet.capital }}</p>
      <p>Année de colonisation : {{ planet.date_colonization === null ? '-' : planet.date_colonization }}</p>
      <p>Nombre d'habitants : {{ planet.nb_inhabitants === null ? '-' : planet.nb_inhabitants }}</p>
      <p>Climat : </p>
      <p>Voyages disponibles :</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
    gap: 4rem;
    color: $color-light;
  }

  img {
    border-radius: 1rem;
    $img-width: 450px;
    width: $img-width;
    height: calc($img-width * 9/16);
    object-fit: cover;
    object-position: center;
  }

  h3 {
    margin: 0;
    padding: 1rem;
    font-size: 2.4rem;
  }

  p {
    margin: 0.5rem 0 0 1rem;

    &:first-of-type {
      margin-top: 1rem;
    }

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
</style>
