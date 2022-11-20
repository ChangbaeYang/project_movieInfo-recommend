<template>
  <div>
    <h1>Article Page</h1>
    <router-link :to="{ name: 'createArticle' }">[글쓰기]</router-link>
    <hr>
    <nav>
      <router-link :to="{ name : 'articleList' }">전체 게시판</router-link> |
      <router-link :to="{ name : 'articleFree' }">자유 게시판</router-link> | 
      <router-link :to="{ name : 'articleDebate' }">토론 게시판</router-link> | 
      <router-link :to="{ name : 'articleHelp' }">건의 게시판</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ArticleView',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      if (this.isLogin === true) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인이 필요한 서비스 입니다.')
        this.$router.push({ name: 'login'})
      }
    }
  }
}
</script>

<style>

</style>