<template>
  <div id="app">
    <router-link :to="{ name: 'movies' }">BrandName</router-link>
     

   
     
        <router-link class="nav-link active" aria-current="page" :to="{ name: 'movies' }" style="font-weight:bold;"> Movie </router-link> 
       
     
         <router-link class="nav-link active" aria-current="page" :to="{ name: 'actors' }" style="font-weight:bold;"> Actor </router-link> 
     
        
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'directors' }" style="font-weight:bold;"> Director </router-link> 
     
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'articles' }" style="font-weight:bold;"> Article </router-link>
        
         
      
          
  
            <router-link class="dropdown-item" v-if="isLogin" :to="{ name: 'profile' }"> Profile </router-link>
         
           
          <button class="dropdown-item" v-if="isLogin" @click="logOut">Log-out</button>
         
        

            <input v-model="searchData" @key.enter="searchUp" class="form-control me-2" type="search" placeholder="Movie_Search" aria-label="Search">

            <router-link v-if="!isLogin" :to="{ name: 'login' }"> Login </router-link>
            <router-link v-if="!isLogin" :to="{ name: 'signup' }"> SignUp </router-link>

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
    },
    username() {
      return this.$store.state.user_info.username
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

#main-bar {
  background-color: rgb(218, 220, 224);
}

a {
  text-decoration: none;
}

/* nav {
  padding: 30px;
} */


/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
