import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useRecapStore = defineStore('recap', () => {
  const journey = ref({});
  
  const setJourney = (options) => {
    journey.value = options;
  }

  const getJourney = computed(() => journey.value);

  return { journey, getJourney, setJourney };
});
