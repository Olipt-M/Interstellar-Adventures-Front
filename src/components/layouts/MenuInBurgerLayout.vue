<script setup>
  import IconCross from '@/components/icons/IconCross.vue';
  import { RouterLink } from 'vue-router';
  import { useMenuStore } from '@/stores/menuStore.js';
  const menuStore = useMenuStore();
  import { useUserStore } from '@/stores/userStore.js';
  const userStore = useUserStore();

  const disconnect = () => {
    menuStore.closeMenu();
    userStore.disconnectUser();
  }
</script>

<template>
  <nav :class="{ opened: menuStore.isMenuBurgerOpened }">
    <div class="menu-header">
      <h4>Menu</h4>
      <button type="button" class="close-menu-btn" @click="menuStore.closeMenu()"><IconCross class="close-icon"/></button>
    </div>

    <ul>
      <li><RouterLink :to="{name: 'home'}" class="li-text" @click="menuStore.closeMenu()">Accueil</RouterLink></li>
      <li><RouterLink :to="{name: 'planets'}" class="li-text" @click="menuStore.closeMenu()">Destinations</RouterLink></li>
      <li v-if="userStore.isAuthenticated"><RouterLink :to="{name: 'account'}" class="li-text" @click="menuStore.closeMenu()">Mon compte</RouterLink></li>
      <li v-if="userStore.isAuthenticated"><RouterLink :to="{name: 'login'}" class="li-text" @click="disconnect">Déconnexion</RouterLink></li>
      <li v-else><RouterLink :to="{name: 'login'}" class="li-text" @click="menuStore.closeMenu()">Connexion</RouterLink></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    padding: 3rem 3rem 6rem 3rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: $color-night-blue;
    transform: translate(0, -100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  }

  nav.opened {
    transform: translate(0, 0);
    transition: transform 0.3s ease-in-out;
  }

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    margin-bottom: 2rem;
  }

  h4 {
    color:$color-light;
    text-transform: uppercase;
    margin: 0;
  }

  .close-menu-btn {
    cursor: pointer;
    background: none;
    border: none;
    color: $color-light;
  }

  .close-icon:hover {
    transform: rotate(-180deg);
    transition: transform 0.6s ease-in-out;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    display: block;
    text-align: center;
    padding: 1rem;
    margin: auto;
    color: $color-light;
    cursor: pointer;

    &:hover {
      font-style: italic;
    }
  }

  .li-text {
    width: 100%;
    text-decoration: none;
    color: $color-light;
  }
  
</style>
