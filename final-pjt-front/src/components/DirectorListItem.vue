<template>
  <article class="d-flex justify-content-center align-items-center col-xs-12 col-sm-3 mb-3">
    <div @click="showDirectorModal" class="card h-100" style="width: 30rem; cursor:pointer">
      <img :src="imgURL" class="card-img-top" :alt="director.name" @error="replaceImg">
      <div class="card-body">
        <h5 class="card-title">{{ director.name }}</h5>
      </div>
    </div>
    
    <DetailModal v-if="directorModal" @close="closeModal">
      <div slot="body">
        <div class="card mb-3" style="max-width: 700px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="imgURL" class="img-fluid rounded-start" :alt="director.name">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" style="font-size:40px; margin-bottom:20px;">{{ director.name }}</h5>
                <p class="card-text">birth : </p>
                <p class="card-text">popularity : {{ director.popularity }}</p>
  
                <p class="card-text">masterpiece : {{ repMovieTitle }}</p>
                <p class="card-text"><small class="text-muted">'' like this director </small></p>
                <button>좋아요</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Filmography</p>
          <p>{{ director.biography }}</p>
        </div>
      </div>
    </DetailModal>
  </article>
</template>

<script>
import DetailModal from '@/components/DetailModal'
import noImg from '../assets/no_image.png'

export default {
  name: "DirectorListItem",
  data() {
    return {
      imgURL: `https://image.tmdb.org/t/p/w500${this.director.profile_path}`,
      directorModal: false,
    }
  },
  components: {
    DetailModal,
  },
  props: {
    director: Object,
  },
  created () {
    this.$store.dispatch('getMovies')
  },
  computed: {
    repMovieTitle() {
      const movieIdx = this.director.directing_movies[0]
      const movies = this.$store.state.movies
      let repMovieTitle = ''
      for (let movie of movies) {
        if (movie.id === movieIdx) {
          repMovieTitle = movie.title
        }
      }
      return repMovieTitle
    },
  },
  methods: {
    showDirectorModal() {
      this.directorModal = !this.directorModal
      document.body.style.overflow = 'hidden'
    },
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    },
    closeModal() {
      this.directorModal = false
      document.body.style.overflow = 'unset'
    },
  }
}
</script>

<style>

</style>