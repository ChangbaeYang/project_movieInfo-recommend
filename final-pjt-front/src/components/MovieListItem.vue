<template>
  <article class="d-flex justify-content-center align-items-center col-xs-12 col-sm-3 mb-3">
    <div @click="showMovieModal" class="card h-100" style="width: 30rem; cursor:pointer">
      <img :src="imgURL" class="card-img-top" :alt="movie.title" @error="replaceImg">
    </div>

    <DetailModal v-if="movieModal" @close="closeModal">
      <div slot="body">
        <iframe :src="vedioURL" frameborder="0" width="600" height="400" allowfullscreen></iframe>
        <div class="card mb-3" style="max-width: 600px; margin-left: 20px;">
          <div class="row g-0">
            <div class="col-md-5">
              <img :src="imgURL" class="img-fluid rounded-start" alt="movie.title">
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title" style="font-size:20px; margin-bottom:20px;">{{ movie.title }}</h5>
                <span style="margin-bottom: 5px;">genre:</span>
                <span v-for="(genre, index) in genresName" :key="index"> {{ genre }} </span>
                <p style="margin-bottom: 5px; margin-top: 5px;">runtime: {{ movie.runtime }}min</p>
                <p style="margin-bottom: 5px;">vote average: {{ movie.vote_average }}</p>
                <p style="margin-bottom: 5px;">release date: {{ movie.release_date }}</p>
                <!-- <p style="margin-bottom: 5px;">language: {{ movie.original_language }}</p> -->
                <!-- <p style="margin-bottom: 5px;">popularity: {{ movie.popularity }}</p> -->
                homepageURL:
                <a :href="movie.homepage">
                  <div v-if="movie.homepage">
                    <p class="card-text">{{ movie.homepage }}</p>
                  </div>
                </a>
                <div v-if="!movie.homepage">
                  <p style="margin-bottom:5px;">-no homepage-</p>
                </div>
              </div>
              <p style="margin-bottom: 5px; margin-top: 0px;">'' like this movie</p>
              <button>좋아요</button>
            </div>
          </div>
        </div>
        <div>
          <p>Overview</p>
          <p>{{ movie.overview }}</p>
        </div>
        <!-- <textarea name="hi" id="" cols="30" rows="10"></textarea> -->
      </div>
    </DetailModal>
  </article>
</template>

<script>
import DetailModal from '@/components/DetailModal';
import noImg from '../assets/no_image.png'

export default {
  name: 'MovieListItem',
  data () {
    return {
      imgURL: `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`,
      dropImgURL: `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`,
      vedioURL: `https://www.youtube.com/embed/${this.movie.youtube_key}?autoplay=1&mute=1`,
      movieModal: false,
    }
  },
  components: {
    DetailModal,
  },
  props: {
    movie: Object,
  },
  created () {
    this.$store.dispatch('getGenres')
  },
  computed: {
    genresName() {
      let genresName = []
      const genreIdxList = this.movie.genres
      const genres = this.$store.state.genres
      for (let genreIdx of genreIdxList) {
          for (let genre of genres) {
            if (genre.id === genreIdx)
            genresName.push(genre.name)
          }
      }
      return genresName
    }
  },
  methods: {
    showMovieModal() {
      this.movieModal = !this.movieModal
      document.body.style.overflow = 'hidden'
    },
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    },
    closeModal() {
      this.movieModal = false
      document.body.style.overflow = 'unset'
    },
  },
}
</script>

<style>

</style>