<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="logIn">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>
      <p v-show="valid.username" class="input-error" color="red"> 영어와 숫자를 섞어 8글자 이상 입력해주세요 </p>
      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password" @keyup.enter="Login()"><br>
      <p v-show="valid.password" class="input-error"> 영어랑 그 뭐지 특수문자랑 숫자락섞어서 8글자에서 16글자사이로 입력해 </p>
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
    checkUsername() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validateusername = /^(?=.*[a-zA-z])(?=.*[0-9]).{8,}$/

      if (!validateusername.test(this.username) || !this.username) {
        this.valid.username = true
        this.usernameHasError = true
        return
      } this.valid.username = false
        this.usernameHasError = false
    },

    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if (!validatePassword.test(this.password) || !this.password) {
        this.valid.password = true
        this.passwordHasError = true
        return
      } this.valid.password = false
        this.passwordHasError = false
    }
  }
}
</script>

<style>

</style>