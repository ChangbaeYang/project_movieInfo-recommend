<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'HomeView' }" style="font-weight:bold;">Picky Movie</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{ name: 'movies' }" style="font-weight:bold;"> Movie </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'actors' }" style="font-weight:bold;"> Actor </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'directors' }" style="font-weight:bold;"> Director </router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" :to="{ name: 'articles' }" style="font-weight:bold;"> 
                Article 
              </router-link>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" @submit.prevent="searchUp">
            <input class="form-control me-2" type="search" placeholder="Search & Enter" aria-label="Search" v-model="searchData">
            <button v-if="!isLogin" class="btn btn-outline-success">
              <router-link :to="{ name: 'login' }"> Login </router-link>
            </button>
            <button v-if="isLogin" class="btn btn-outline-success">
              <router-link v-if="isLogin" :to="{ name: 'profile' }"> MyPage </router-link>
            </button>
            <button v-if="isLogin" @click="logOut" class="btn btn-outline-danger" style="margin-left: 5px;">
              LogOut
            </button>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
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
}
</style>