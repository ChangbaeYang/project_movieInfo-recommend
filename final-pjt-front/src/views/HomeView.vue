<template>
  <div id="homeMainimg">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {
    this.$store.dispatch('getMovies')
    this.$store.dispatch('getActors')
    this.$store.dispatch('getDirectors')
  }
}
</script>

<style>
#homeMainimg {
  background-image: url('../assets/abc.jpg');
}
</style>