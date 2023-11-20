import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useRecapStore = defineStore('recap', () => {
  // User
  const user = ref(undefined);

  const authenticateUser = (credentials) => {
    user.value = credentials;
  }
  const disconnectUser = () => {
    user.value = undefined;
  }

  const isAuthenticated = computed(() => {
    return user.value !== undefined && user.value !== null;
  })
  const getAuthenticatedUser = () => {
    return user.value;
  }

  // Overlay when user is not authenticated
  const loginOverlay = ref(false);

  const openLoginOverlay = () => {
    loginOverlay.value = true;
  }
  const closeLoginOverlay = () => {
    loginOverlay.value = false;
  }

  const isRequiredLoginOverlay = () => {
    return loginOverlay.value;
  }

  // Return variables
  return { 
    user, 
    authenticateUser, 
    disconnectUser, 
    isAuthenticated, 
    getAuthenticatedUser, 
    loginOverlay, 
    openLoginOverlay, 
    closeLoginOverlay, 
    isRequiredLoginOverlay
   };
});
