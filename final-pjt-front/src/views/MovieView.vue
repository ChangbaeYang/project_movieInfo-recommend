<template>
  <div>
    <h1>Movies</h1>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  name: 'MovieView',
  components: {
    MovieList,
  }
}
</script>

<style>
</style>