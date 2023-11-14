<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    planet: {
      type: Object,
      required: true
    }
  });
  
</script>

<template>
  <div class="card-container">
    <div class="img-container">
      <img :src="`img-planetes/${planet.picture}`" :alt="planet.name">
    </div>

    <div class="description-container">
      <h3>{{ planet.name }}</h3>
      <p>{{ planet.system }}</p>
      <p>Distance : {{ planet.distance_from_earth }}</p>
      <p>Capitale : {{ planet.capital === null ? '-' : planet.capital }}</p>
      <p>Année de colonisation : {{ planet.date_colonization === null ? '-' : planet.date_colonization }}</p>
      <p>Nombre d'habitants : {{ planet.nb_inhabitants === null ? '-' : 
        (planet.nb_inhabitants < 1000000 ? new Intl.NumberFormat("fr-FR").format(planet.nb_inhabitants) : 
          (planet.nb_inhabitants >= 1000000000 ? `${(planet.nb_inhabitants / 1000000000).toFixed(2)} milliards` : `${(planet.nb_inhabitants / 1000000).toFixed(2)} millions`)
        ) }}
      </p>
      <p>Climat : {{ planet.climate.name }}</p>
      <p>
        Voyages disponibles :
        <ul class="journey-types">
          <li v-for="(journeyType, index) in planet.journeyTypes" :key="journeyType.id">
            {{index === 0 ? '' : ',&nbsp'}}
            {{ journeyType.name }}
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: $color-light;
    padding: 2rem;
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

  .journey-types {
    display: inline-block;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;

      &:not(:first-of-type) {
        text-transform: lowercase;
      }
      &:first-of-type::first-letter {
        text-transform: capitalize;
      }
    }
  }

  @media screen and (max-width: $lg-breakpoint) {
    .card-container {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
</style>
