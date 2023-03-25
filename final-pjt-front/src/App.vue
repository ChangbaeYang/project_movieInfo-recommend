<template>
  <div id="app">
    <HomeView 
      v-if="isHome"
    />
    <footer id="footer" class="fixed-bottom">
  
    </footer>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchData: null,
      isHome: false,
    }
  },
  computed: {
    isLogin() {
      if (this.$store.state.token) { // 로그인이 되어있다면
        return true
      } else { // 로그인이 되어있지 않다면
        return false
      }
    },
    username() {
      return this.$store.state.user_info.username
    },
  },
  methods: {
    logOut() {
      this.$router.push({ name:'HomeView' })
      this.$store.commit('LOGOUT_USER')
      this.$store.dispatch('logOut')
    },
    searchUp() {
      this.$store.dispatch('searchUp', this.searchData)
    },
  }
}
</script>


<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
}

#login-text:hover {
  color: white;
}

#my-page:hover {
  color: black;
}
footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}


</style>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
#login-btn {
  color: black;
}
#login-btn :hover {
  color: white;
  background: black;
}
</style>