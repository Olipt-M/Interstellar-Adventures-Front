<script setup>
  import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
  import Carousel from '@/components/Carousel.vue';

</script>

<template>
    <H1TitleLayout>Interstellar Adventures</H1TitleLayout>
      <p>
        Voyagez jusqu’aux confins de l’univers grâce à nos services, à bord des vaisseaux les plus modernes. 
        Embarquez pour les destinations et les durées de votre choix.
      </p>
    <div>
      <Carousel/>
    </div>
</template>

<style lang='scss' scoped>

  p {
    text-align: center;
    color: $color-light;
    padding: 3rem;
    margin: 0;
  }
  
</style>
