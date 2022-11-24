<template>
  <div>
    <h3>My Likes</h3>
    <div class="container">
      <section class="row">
        <MyLikeListItem
          v-for="like_movie in like_movies_info"
          :key="like_movie.id"
          :movie="like_movie"
        />
      </section>
    </div>
  </div>
</template>

<script>
import MyLikeListItem from '@/components/MyLikeListItem';

export default {
  name: "MyLikeList",
  components: {
    MyLikeListItem,
  },
  computed: {
    like_movies_info() {
      return this.$store.state.like_movies_info
    }
  },
  created() {
    this.$store.commit('GET_LIKE_MOVIE_INFO')
  },
  // destroyed() {
  //   this.$store.commit('DELETE_LIKE_MOVIE_INFO')
  // },
}
</script>

<style>

</style>