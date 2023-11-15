<script setup>
import { ref } from 'vue';
const props = defineProps({
    planet: {
        type: Object,
        required: true
    }
});
</script>

<template>

    <div class="container">
        <div class="img-container">
            <img :src="`/img-planetes/${planet.picture}`" :alt="planet.name">
        </div>
    </div>

</template>



<style lang="scss" scoped>
</style>