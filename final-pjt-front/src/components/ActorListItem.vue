<template>
  <article class="d-flex justify-content-center align-items-center col-xs-12 col-sm-3 mb-3">
    <div class="card h-100" style="width: 30rem; cursor:pointer">
      <img :src="imgURL" class="card-img-top" :alt="actor.name" @error="replaceImg">
      <div class="card-body">
        <h5 class="card-title">{{ actor.name }}</h5>
    </div>
    </div>
  </article>
</template>

<script>
import noImg from '../assets/no_image.png'

export default {
  name: "ActorListItem",
  data() {
    return {
      imgURL: `https://image.tmdb.org/t/p/w500${this.actor.profile_path}`,
    }
  },
  props: {
    actor: Object,
  },
  methods: {
    replaceImg(e) {
      e.preventDefault
      e.target.src = noImg
    }
  }
}
</script>

<style>

</style>