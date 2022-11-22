<template>
  <div id="app">
    <nav class="navbar navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand">Hi</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggle-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'movies' }"> Movie </router-link> 
            </li>
            <li>
              <router-link :to="{ name: 'actors' }"> Actor </router-link> 
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'directors' }"> Director </router-link> 
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'articles' }"> Article </router-link> 
            </li>
            <li class="nav-item">
              <input type="text" v-model="searchData" @keyup.enter="searchUp">
            </li>
            <li class="nav-item">
              <router-link v-if="isLogin" :to="{ name: 'profile' }"> Profile </router-link> 
            </li>
            <li class="nav-item">
              <router-link v-if="!isLogin" :to="{ name: 'login' }"> Login </router-link>  
            </li>
            <li class="nav-item">
              <router-link v-if="!isLogin" :to="{ name: 'signup' }"> SignUp </router-link>
            </li>
            <li class="nav-item">
              <button v-if="isLogin" @click="logOut">Log-out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
    <footer></footer>
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


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-image: url("./assets/purple.png")
}

.logo{
  style:"text-decoration: none;"
}

a {
  text-decoration: none;
  color: white;
  text: bord;
}

router-link {
  text-decoration: none;
}
/* nav {
  padding: 30px;
} */

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
