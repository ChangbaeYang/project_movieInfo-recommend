<template>
  <div style="margin-top:65px;">
    <h1>Share Thinking</h1>
    <router-link style="text-decoration:none; color: lightslategray;" :to="{ name: 'createArticle' }">[CREATE]</router-link>
    <hr>
    <nav>
      <router-link class="hooo" :to="{ name : 'articleList' }" style="text-decoration:none; color: lightslategray; margin-right:5px; margin-right:5px;">ALL</router-link> |
      <router-link class="hooo" :to="{ name : 'articleFree' }" style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;">FREE</router-link> | 
      <router-link class="hooo" :to="{ name : 'articleDebate' }" style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;">DEBATE</router-link> | 
      <router-link class="hooo" :to="{ name : 'articleHelp' }" style="text-decoration:none; color: lightslategray; margin-left:5px; margin-right:5px;">HELP</router-link>
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
  mounted() {
    if (this.isLogin) {
      this.$router.push({ name: 'articleList' }).catch(()=> {}) // 게시판 누르면 전체 게시판이 보이게 하기
    }
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
.hooo:hover {
  color: black;
}
</style>