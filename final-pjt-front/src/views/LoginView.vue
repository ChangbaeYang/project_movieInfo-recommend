<template>
  <div style="margin-top: 75px; margin-left:600px; margin-right:600px; margin-bottom: 30px;">
    <h1>Login Page</h1>
    <form @submit.prevent="logIn">
      <label for="username">username : </label>
      <input style="margin:5px;" type="text" id="username" v-model="username"><br>
      <label for="password"> password : </label>
      <input style="margin: 8px;" type="password" id="password" v-model="password"><br>
      <button class="btn btn-outline-dark">
        LogIn
      </button>
    <hr>
    </form>
    <p>Not Yet Our Client?</p>
    <button class="btn btn-outline-dark" @click="goToSignUp">Join Us!</button>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
      }
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
    goToSignUp() {
      this.$router.push({ name: 'signup'})
    }
  }
}
</script>

<style>

</style>