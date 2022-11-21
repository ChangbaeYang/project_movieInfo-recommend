<template>
  <div id="app">
    <nav>
      <h3>MDDM</h3>
      <router-link :to="{ name: 'movies' }"> Movie </router-link> 
      <router-link :to="{ name: 'actors' }"> Actor </router-link> 
      <router-link :to="{ name: 'directors' }"> Director </router-link> 
      <router-link :to="{ name: 'articles' }"> Article </router-link> 
      <router-link v-if="isLogin" :to="{ name: 'profile' }"> Profile </router-link> 
      <router-link v-if="!isLogin" :to="{ name: 'login' }"> Login </router-link>  
      <router-link v-if="!isLogin" :to="{ name: 'signup' }"> SignUp </router-link>
      <button v-if="isLogin" @click="logOut">Log-out</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      if (this.$store.state.token) { // 로그인이 되어있다면
        return true
      } else { // 로그인이 되어있지 않다면
        return false
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
