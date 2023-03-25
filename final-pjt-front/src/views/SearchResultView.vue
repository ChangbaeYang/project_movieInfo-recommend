<template>
  <div style="margin-top:60px;">
    <h3>Movie Result</h3>
      <div class="container">
        <section class="row">
          <SearchResultMovie
            v-for="movie in movie_results"
            :key="movie.id"
            :movie="movie"
            />
        </section>
      </div>
    <hr>
    <h3 style="margin-bottom:20px;">Actor Result</h3>
      <div class="container">
        <section class="row">
          <SearchResultActor
            v-for="actor in actor_results"
            :key="actor.id"
            :actor="actor"
            />
        </section>
      </div>
    <hr>
    <h3 style="margin-bottom:20px;">Director Result</h3>
      <div class="container">
        <section class="row">
          <SearchResultDirector
            v-for="director in director_results"
            :key="director.id"
            :director="director"
            />
        </section>
      </div>
  </div>
</template>

<script>
import SearchResultMovie from '@/components/SearchResultMovie'
import SearchResultActor from '@/components/SearchResultActor'
import SearchResultDirector from '@/components/SearchResultDirector'

export default {
  name: "SearchResultView",
  components: {
    SearchResultMovie,
    SearchResultActor,
    SearchResultDirector,
  },
  data() {
    return {
      search_results: this.$store.state.search_result
    }
  },
  computed: {
    movie_results() {
      let movie_results = []
      for (let result of this.search_results) {
        if (Object.keys(result).includes('budget')) {
          movie_results.push(result)
        }
      }
      return movie_results
    },
    actor_results() {
      let actor_results = []
      for (let result of this.search_results) {
        if (Object.keys(result).includes('acting_movies')) {
          actor_results.push(result)
        }
      }
      return actor_results
    },
    director_results() {
      let director_results = []
      for (let result of this.search_results) {
        if (Object.keys(result).includes('directing_movies')) {
          director_results.push(result)
        }
      }
      return director_results
    },
  }
}
</script>

<style>

</style>