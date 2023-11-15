<script setup>
  const props = defineProps({
    colorMode: {
      type: String
    }
  });
</script>

<template>
  <button v-if="colorMode==='light'" type="button" class="light-mode"><slot/></button>
  <button v-else type="button" class="dark-mode"><slot/></button>
</template>

<style lang="scss" scoped>
  button {
    cursor: pointer;
    padding: 0.5rem 4rem;
    border-radius: 1rem;
    font-size: 2rem;
    text-decoration: none;

    &.light-mode {
      border: 1px solid $color-light;
      background: $color-light;
      color: $color-night-blue;

      &:hover {
        background: $color-dark-blue1;
        color: $color-light;
      }
    }

    &.dark-mode {
      border: 1px solid $color-light;
      background: $color-dark-blue1;
      color: $color-light;

      &:hover {
        background: $color-light;
        color: $color-night-blue;
      }
    }
  }
</style>
