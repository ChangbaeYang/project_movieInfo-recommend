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
                <a :href="movie.homepage">
                  <div v-if="movie.homepage">
                    <p class="card-text">{{ movie.homepage }}</p>
                  </div>
                </a>
                <div v-if="!movie.homepage">
                  <p style="margin-bottom:5px;">-no homepage-</p>
                </div>
              </div>
              <p style="margin-bottom: 5px; margin-top: 0px;">{{ movieLikeCount }} like this movie</p>
              <p :class="{ 'display-none': Liked }" @click="likeMovie">❤</p>
              <p :class="{ 'display-none': !Liked }" @click="likeMovie">💖</p>
            </div>
          </div>
        </div>
        <div>
          <p>Overview</p>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </DetailModal>
  </article>
</template>

<script>
import DetailModal from '@/components/DetailModal'
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
    },
    isLogin() {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    },
    Liked() {
      if (!this.isLogin) {
        return false
      } else {
        if (this.$store.getters.movie_liked) {
          return true
        } else {
          return false
        }
      }
    },
    movieLikeCount() {
      if (this.isLogin) {
        // console.log(this.$store.getters.movie_like_count)
        return this.$store.getters.movie_like_count
      } else {
        return this.$store.state.movie.like_users.length
      }
    }
  },
  methods: {
    showMovieModal() {
      this.movieModal = !this.movieModal
      document.body.style.overflow = 'hidden'
      this.$store.dispatch('selectMovie', this.movie) // 선택한 감독의 정보를 vuex에 넘긴다.
    },
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    },
    closeModal() {
      this.$store.dispatch('CLOSE_MOVIE_MODAL')
      this.movieModal = false
      document.body.style.overflow = 'unset'
    },
    likeMovie() {
      if (this.$store.state.token) {
        this.$store.dispatch('likeMovie', this.movie.id)
      } else {
        this.$router.push({ name: 'login'})
        alert('로그인이 필요한 기능입니다.🤣')
      }
    },
  },
}
</script>

<style>
.display-none {
  display: none;
}
</style>