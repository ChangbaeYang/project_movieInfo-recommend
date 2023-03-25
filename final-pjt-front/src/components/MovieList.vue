<template>
  <div class="container">
    <section class="row">
      <MovieListItem
        v-for="movie in movie_page"
        :key="movie.id"
        :movie="movie"
      />
    </section>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
    InfiniteLoading
  },
  data() {
    return {
      page: 0,
      movie_page: [],
    }
  },
  created() {
    this.$store.dispatch('getGenres')
  },
  methods: {
    infiniteHandler($state) {
      this.page += 10
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/movies/page/${this.page}`,
      })
      .then(response => {
        setTimeout(() => {
          if (response.data.length) {
            this.movie_page = this.movie_page.concat(response.data)
            $state.loaded()
            this.page += 10
            if (this.movie_page.length / 10 == 0) {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        }, 1000)
      }). catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>