<template>
  <div>
    <h1 id="title">Movies</h1>
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
#title {
  color: rgb(148, 154, 158)
}
</style>