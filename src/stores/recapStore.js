import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useRecapStore = defineStore('recap', () => {
  const journey = ref({});
  
  const setJourney = (options) => {
    journey.value = options;
  }

  const resetJourney = () => {
    journey.value = {};
  }

  const getJourney = computed(() => journey.value);

  return { journey, setJourney, resetJourney, getJourney };
});
