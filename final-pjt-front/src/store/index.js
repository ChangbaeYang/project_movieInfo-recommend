import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// import SecureLS from "secure-ls"
// var ls = new SecureLS({ isCompression: false })

import router from '@/router'

Vue.use(Vuex)
  
const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(
      // {
      // storage: {
      //   getItem: (key) => ls.get(key),
      //   setItem: (key, value) => ls.set(key, value),
      //   removeItem: (key) => ls.remove(key)
      // }
    // }
    ), // 난독화
  ],
  state: {
    movies: [],
    articles: [],
    actors: [],
    directors: [],
    genres: [],
    director_liked: '',
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    // 게시글 정보
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    // 영화 정보
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_DIRECTORS(state, directors) {
      state.directors = directors
    },
    GET_ACTORS(state, actors) {
      state.actors = actors
    },
    GET_GENRES(state, genres) {
      state.genres = genres
    },
    // 회원가입 & 로그인
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'movies' })
    },
    // 로그아웃
    DELETE_TOKEN(state) {
      state.token = null
      router.replace('/').catch(() => {})
    },
    GET_USER_INFO(state, user_data) {
      state.user_info = user_data
    },
    LIKE_DIRECTOR(state, director_liked) {
      state.director_liked = director_liked
    }
  },
  actions: {
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((res) => {
        // console.log(res)
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((res) => {
          context.commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getActors(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/actors/`,
      })
        .then((res) => {
          context.commit('GET_ACTORS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDirectors(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/directors/`,
      })
        .then((res) => {
          context.commit('GET_DIRECTORS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/genres/`,
      })
        .then((res) => {
          context.commit('GET_GENRES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((res) => {
          console.log(res.data.key)
          context.commit('SAVE_TOKEN', res.data.key)
        })
      },
    getUserInfo(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          context.commit('GET_USER_INFO', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
          this.dispatch('getUserInfo')
        })
    },
    logOut(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
      })
        .then(() => {
          context.commit('DELETE_TOKEN')
        })
    },
    likeDirector(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/directors/${payload}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        },
        data: {
          director_pk: payload,
        }
      })
        .then((res) => {

          context.commit('LIKE_DIRECTOR', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
