<script setup>
  const props = defineProps({
    colorMode: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  });
</script>

<template>
  <button v-if="colorMode==='light'" 
    type="button" 
    class="light-mode" 
    :class="{'disabled': disabled}" 
    :disabled="disabled">
    <slot/>
  </button>
  <button v-else 
    type="button" 
    class="dark-mode" 
    :class="{'disabled': disabled}" 
    :disabled="disabled">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
  button {
    cursor: pointer;
    padding: 0.5rem 4rem;
    border-radius: 1rem;
    font-size: 2rem;

    &.light-mode {
      border: 1px solid $color-light;
      background: $color-light;
      color: $color-night-blue;
      transition: all 0.3s ease-in-out;

      &:not(.disabled):hover {
        background: $color-dark-blue1;
        color: $color-light;
      }
    }

    &.dark-mode {
      border: 1px solid $color-light;
      background: $color-dark-blue1;
      color: $color-light;
      transition: all 0.3s ease-in-out;

      &:not(.disabled):hover {
        background: $color-light;
        color: $color-night-blue;
      }
    }
  }
</style>
