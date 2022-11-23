<template>
  <div class="container">
    <section class="row">
      <MovieListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </section>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem';

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  computed: {
    movies() {
      return this.$store.state.movies
    }
  },
  created() {
    this.$store.dispatch('getMovies')
  }
}
</script>

<style scoped>
.container {
  background-color:black ;
  margin-right: 0px;
  padding-right: 0px;
  width: 100%;
  height: 100%;
}

</style>