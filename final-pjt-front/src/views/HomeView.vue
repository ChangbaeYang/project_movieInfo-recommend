<template>
  <div>
    <h1>Home</h1>
    
    <a :href="{ name: 'articles' }">articles</a>
    <a :href="{ name: 'movies' }">movies</a>
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

</style>