<template>
  <div>
    <h3>Recommendation!</h3>
    <p style="margin-top:0px; color:lightgray;">Please, click ❤️ on movies. You will get more specific Recommendation!</p>
    <div class="container">
      <section class="row">
        <MyRecommendationItem
          v-for="recomMovie in recomMovies"
          :key="recomMovie.id"
          :movie="recomMovie"
        />
      </section>
    </div>
  </div>
</template>

<script>
import MyRecommendationItem from '@/components/MyRecommendationItem'

export default {
  name: "MyRecommendation",
  components: {
    MyRecommendationItem
  },
  computed: {
    recomMovies() {
      return this.$store.getters.recomMovie
    }
  },
  created() { // 이 때 로딩을 띄워놓는 것도...?
    if (this.$store.state.like_movies) {
      this.$store.dispatch('recommendGoodMovie')
    } else {
      this.$store.dispatch('recommendRandomMovie')
    }
  }
}
</script>

<style>

</style>