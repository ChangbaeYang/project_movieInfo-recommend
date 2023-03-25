<template>
  <div style="margin-top:68px;">
    <h1>{{ username }}'s Profile</h1>
    <hr>
    <nav>
      <router-link style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;" :to="{ name : 'myArticles' }">My Articles</router-link> | 
      <!-- <router-link :to="{ name : 'myReviews' }">내가 쓴 리뷰</router-link> |  -->
      <router-link style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;" :to="{ name : 'myComments' }">My Comments</router-link> | 
      <router-link style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;" :to="{ name : 'myLikes' }">My Likes</router-link> |
      <router-link style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;" :to="{ name : 'recommendation' }">Recommendation!</router-link> 
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
  created() {
    this.$router.push({ name: 'myArticles' })
  }
}
</script>

<style>

</style>