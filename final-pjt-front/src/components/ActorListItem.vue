<template>
  <article class="d-flex justify-content-center align-items-center col-xs-12 col-sm-3 mb-3">
    <div @click="showActorModal" class="card h-100" style="width: 30rem; cursor:pointer">
      <img :src="imgURL" class="card-img-top" :alt="actor.name" @error="replaceImg">
      <div class="card-body">
        <h5 class="card-title">{{ actor.name }}</h5>
    </div>
    </div>

    <DetailModal v-if="actorModal" @close="closeModal">
      <div slot="body">
        <div class="card mb-3" style="max-width: 700px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="imgURL" class="img-fluid rounded-start" :alt="actor.name">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" style="font-size:40px; margin-bottom:20px;">{{ actor.name }}</h5>
                <p class="card-text">birth : {{ actor.birthday }}</p>
                <p class="card-text">popularity : {{ actor.popularity }}</p>
  
                <p class="card-text">masterpiece : {{ repMovieTitle }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Filmography</p>
          <p>{{ actor.biography }}</p>
        </div>
      </div>
    </DetailModal>
  </article>
</template>

<script>
import DetailModal from '@/components/DetailModal'
import noImg from '../assets/no_image.png'

export default {
  name: "ActorListItem",
  data() {
    return {
      imgURL: `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`,
      actorModal: false,
    }
  },
  components: {
    DetailModal,
  },
  props: {
    actor: Object,
  },
  computed: {
    repMovieTitle() {
      const movieIdx = this.actor.acting_movies[0]
      const movies = this.$store.state.movies
      let repMovieTitle = ''
      for (let movie of movies) {
        if (movie.id === movieIdx) {
          console.log('hi')
          repMovieTitle = movie.title
        }
      }
      return repMovieTitle
    },
  },
  methods: {
    showActorModal() {
      this.actorModal = !this.actorModal
      document.body.style.overflow = 'hidden'
    },
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    },
    closeModal() {
      this.actorModal = false
      document.body.style.overflow = 'unset'
    }
  }
}
</script>

<style>

</style>