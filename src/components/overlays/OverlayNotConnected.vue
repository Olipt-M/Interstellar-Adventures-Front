<script setup>
  import Overlay from '@/components/overlays/Overlay.vue';
  import MainButton from '@/components/buttons/MainButton.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  import { useUserStore } from '@/stores/userStore.js';
  const userStore = useUserStore();

  defineProps({
    opened: {
      type: Boolean,
      default: false
    }
  });

  const redirect = () => {
    userStore.closeLoginOverlay();
    router.push({ name: 'login' });
  }
</script>

<template>
  <Overlay :opened="opened">
    <div class="modal-box">
      <h2>Vous n'êtes pas connecté !</h2>
      <p>Merci de vous connecter pour finaliser votre commande.</p>
      <MainButton @click="redirect">Connexion</MainButton>
    </div>
  </Overlay>
</template>

<style lang='scss' scoped>
  .modal-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $color-light;
    color: $color-night-blue;
    border-radius: 1rem;
    padding: 2rem;
  }

  h2 {
    margin: 0;
  }

  p {
    margin-block: 2rem;
  }
</style>