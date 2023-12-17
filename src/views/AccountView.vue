<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import JourneyCard from '@/components/cards/JourneyCard.vue';
  import { getUserJourneys } from '@/services/api.js';
  import { ref, onBeforeMount } from 'vue';
  import { useUserStore } from '@/stores/userStore.js';
  const userStore = useUserStore();

  const journeys = ref([]);

  onBeforeMount(() => {
  if (userStore.isAuthenticated) {
    getUserJourneys(userStore.getAuthenticatedUser.id)
      .then(response => journeys.value = response)
      .catch(err => {
        console.error(err);
        err.value = "Erreur lors du chargement des voyages";
    });
  }
});

</script>

<template>
  <H1TitleLayout>Mon compte</H1TitleLayout>
    <div class="container-form">
      <h2>Mes prochains voyages</h2>
      <div v-for="(journey, index) in journeys" :key="journey.id">
        <JourneyCard :journey="journey"/>
        <hr v-if="index < journeys.length - 1">
      </div>
    </div>
</template>

<style lang='scss' scoped>

.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-radius: 1rem;
  margin: 3rem 5rem 5rem 5rem;
  gap: 1.5rem;
  padding: 1.5rem;
  background : $color-dark-blue2;
}

h2 {
  color: $color-light;
  background-color: $color-dark-blue1;
  margin: 3rem;
  border: 2px solid $color-light;
  border-radius: 1rem;
  padding: 0.75rem;
  width: 70vw;
  text-align: center;
}

hr {
    margin: 1rem auto;
    width: 60%;
    color: $color-light;
  }
</style>


