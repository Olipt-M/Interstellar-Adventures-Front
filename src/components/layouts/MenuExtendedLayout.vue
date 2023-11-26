<script setup>
  import { RouterLink } from 'vue-router';
  import { useUserStore } from '@/stores/userStore.js';
  const userStore = useUserStore();
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink :to="{name: 'home'}" class="nav-link">Accueil</RouterLink></li>
      <li><RouterLink :to="{name: 'planets'}" class="nav-link">Destinations</RouterLink></li>
      <li v-if="userStore.isAuthenticated"><RouterLink :to="{name: 'account'}" class="nav-link">Mon compte</RouterLink></li>
      <li v-if="userStore.isAuthenticated"><RouterLink :to="{name: 'login'}" class="nav-link" @click="userStore.disconnectUser()">Déconnexion</RouterLink></li>
      <li v-else><RouterLink :to="{name: 'login'}" class="nav-link">Connexion</RouterLink></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  ul {
    margin: 0;
  }
  
  li {
  display: inline-block;
  margin-right: 2rem;
  position: relative;
  padding-block: 1rem;

  &::after {
    content: '';
    border-bottom: 2px solid $color-light;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
}

.nav-link {
  color: $color-light;
  text-decoration: none;
}
</style>
