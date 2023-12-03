import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useRecapStore = defineStore('recap', () => {
  // State
  const journey = ref({});

  const errorMessages = ref({
    departureDate: "",
    returnDate: ""
  });
  
  // Actions
  const setJourney = (options) => {
    journey.value = options;
  }

  const resetJourney = () => {
    journey.value = {};
  }

  const setDepartureErrorMessage = (message) => errorMessages.value.departureDate = message;
  const setReturnErrorMessage = (message) => errorMessages.value.returnDate = message;

  const resetDepartureErrorMessage = () => errorMessages.value.departureDate = "";
  const resetReturnErrorMessage = () => errorMessages.value.returnDate = "";

  // Getters
  const getJourney = computed(() => journey.value);
  const getErrorMessages = computed(() => errorMessages.value);

  return {
    journey,
    setJourney,
    resetJourney,
    getJourney,
    errorMessages,
    setDepartureErrorMessage,
    setReturnErrorMessage,
    resetDepartureErrorMessage,
    resetReturnErrorMessage,
    getErrorMessages
  };
});
