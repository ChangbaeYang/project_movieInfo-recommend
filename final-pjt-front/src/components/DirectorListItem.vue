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
                <p class="card-text">birth : {{ director.birthday }}</p>
                <p class="card-text">popularity : {{ director.popularity }}</p>
  
                <p class="card-text">masterpiece : {{ repMovieTitle }}</p>
                <p class="card-text"><small class="text-muted">{{ directorLikeCount }} like this director </small></p>
                <p :class="{ 'display-none': Liked }" @click="likeDirector">❤</p>
                <p :class="{ 'display-none': !Liked }" @click="likeDirector">💖</p>
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
    isLogin() { // 좋아요 버튼은 로그인되있어야만 누를 수 있도록했다.
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
        if (this.$store.getters.director_liked) {
          return true
        } else {
          return false
        }
      }
    },
    directorLikeCount() {
      if (this.isLogin) {
        return this.$store.getters.director_like_count
      } else {
        return this.$store.state.director.like_users.length
      }
    }
  },
  methods: {
    showDirectorModal() {
      this.directorModal = !this.directorModal
      document.body.style.overflow = 'hidden'
      this.$store.dispatch('selectDirector', this.director) // 선택한 감독의 정보를 vuex에 넘긴다.
    },
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    },
    closeModal() {
      // 여기에서 기존 디렉터 정보를 지우자.
      this.directorModal = false
      document.body.style.overflow = 'unset'
    },
    likeDirector() {
      if (this.$store.state.token) { // 로그인이 되어있다면
        this.$store.dispatch('likeDirector', this.director.id)
      } else {
        this.$router.push({ name: 'login'})
        alert('로그인이 필요한 기능입니다!🤣')
      }
    },
  }
}
</script>

<style>
.display-none {
  display: none;
}
</style>