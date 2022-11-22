<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="logIn">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>
      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password" @keyup.enter="Login()"><br>
      <input type="submit" value="logIn" @click="Login()">
    </form>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
      valid: {
        email: false,
        password: false,
      },
        passwordHasError: false,
      }
  },

  watch: {
    'username': function() {
      this.checkUsername()
    },
    'password': function() {
      this.checkPassword()
    },
  },

  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    },
  }
}
</script>

<style>

</style>