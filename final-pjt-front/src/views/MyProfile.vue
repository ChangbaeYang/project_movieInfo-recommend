<template>
  <div>
    <h1>{{ username }}</h1>
    <hr>
    <nav>
      <router-link :to="{ name : 'myArticles' }">내가 쓴 게시글</router-link> | 
      <!-- <router-link :to="{ name : 'myReviews' }">내가 쓴 리뷰</router-link> |  -->
      <router-link :to="{ name : 'myComments' }">내가 쓴 댓글</router-link> | 
      <router-link :to="{ name : 'myLikes' }">좋아하는 영화</router-link> |
      <router-link :to="{ name : 'recommendation' }">추천 영화</router-link> 
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  computed: {
    username() {
      return this.$store.state.user_info.username
    }
  },
}
</script>

<style>

</style>