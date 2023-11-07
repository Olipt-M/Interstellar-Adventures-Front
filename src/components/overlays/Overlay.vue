<template>
  <div class="overlay-container" :class="{ opened }"><slot/></div>
</template>

<script setup>
  defineProps({
    opened: {
      type: Boolean,
      required: false,
      default: false
    }
  });
</script>

<style scoped>
  .overlay-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease-in-out;

    &.opened {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>