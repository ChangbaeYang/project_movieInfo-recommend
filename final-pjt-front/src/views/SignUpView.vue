<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>
      <p v-show="valid.username" class="input-error" style="color: red"> 알파벳과  숫자를 섞어 8글자 이상 입력해주세요. </p>
      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1"><br>
      <p v-show="valid.password1" class="input-error" style="color: red"> 알파벳과 숫자, 특수문자를 섞어 8글자 이상 15글자 이하로 입력해 주세요. </p>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2" @blur="checkPassword2">
        <div v-show="!passwordCheckFlag" style="color: red">
          위에서 입력한 비밀번호와 동일하지 않습니다.
        </div>
      <br>
      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      passwordCheckFlag: true,
      valid: {
        password1: false,
        password2: false,
      },
        passwordHasError: false,
        password2HasError: false,
      }
    },
  
  watch: {
    'username': function() {
      this.checkUsername()
    },
    'password1': function() {
      this.checkPassword1()
    },
    'password2': function() {
      this.checkPassword2()
    },
  },  
  
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username: username,
        password1: password1,
        password2: password2,
      }
      this.$store.dispatch('signUp', payload)
    },
    checkUsername() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validateusername = /^(?=.*[a-zA-z])(?=.*[0-9]).{0,15}$/

      if (!validateusername.test(this.username) || !this.username) {
        this.valid.username = true
        this.usernameHasError = true
        return
      } this.valid.username = false
        this.usernameHasError = false
    },

    checkPassword1() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword1 = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if (!validatePassword1.test(this.password1) || !this.password1) {
        this.valid.password1 = true
        this.passwordHasError = true
        return
      } this.valid.password1 = false
        this.password1HasError = false
    },
    checkPassword2() {
      if (this.password1 === this.password2 || this.password2.length === 0) {
        this.passwordCheckFlag = true
      } 
      else {
        this.passwordCheckFlag = false
      }
    }
  }
}
</script>

<style>

</style>