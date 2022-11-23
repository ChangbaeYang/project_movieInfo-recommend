<template>
  <div id="app">
    <div class = 'app1'>
      <h3>Logo 나 프로젝트 이름</h3>
      <router-link :to="{ name: 'movies' }" class = 'text1'> Movie </router-link> 
      <router-link :to="{ name: 'actors' }" class = 'text1'> Actor </router-link> 
      <router-link :to="{ name: 'directors'}" class = 'text1'> Director </router-link> 
      <router-link :to="{ name: 'articles' }" class = 'text1'> Article </router-link> 
      <input type="text" v-model="searchData" @keyup.enter="searchUp">
      <router-link v-if="isLogin" :to="{ name: 'profile' }"> Profile </router-link> 
      <router-link v-if="!isLogin" :to="{ name: 'login' }"> Login </router-link>  
      <router-link v-if="!isLogin" :to="{ name: 'signup' }"> SignUp </router-link>
      <button v-if="isLogin" @click="logOut">Log-out</button>
    </div>
    <!-- <div class = "logoimg"> -->
      <!-- <img src="./assets/kuk202204250322.jpg" alt=""> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchData: null,
    }
  },
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
    },
    searchUp() {
      this.$store.dispatch('searchUp', this.searchData)
    },
  }
}
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CBCE91;
}

.app1 {
  color: #CBCE91;
  background-color:#033049; 
  height: 100vh;
  float: left;
  width: 70vh;
  position:fixed;
  }

 .text1 {
  font-size: 66px;
    padding: 0;
    display: inline-block;
    font-weight: 800;
    -webkit-text-stroke: 1px #000;
    text-decoration: none;
    color: #ffffff;
    font-family: KOMTITP;
    position: relative;
    z-index: 999;
    display: grid;
    place-items: center;
 }

 
</style>
