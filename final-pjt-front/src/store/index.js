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
    token: null, // 유저 토큰
    user_info: null,
    director: null, // 선택한 하나의 감독 정보를 담고 있다.
    director_liked: false, // 유저가 감독을 좋아하는지를 담고 있다.
    director_like_count: 0,
    article: null, // 선택한 하나의 게시글 정보를 담고 있다.
    comments: null, // 선택한 하나의 게시글의 댓글정보
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    director_liked(state) {
      return state.director_liked
    },
    director_like_count(state) { // 클릭한 감독의 정보를 받아서 넣어주면 될듯 하다. 
      return state.director_like_count
    },
    comments(state) {
      return state.comments
    }
  },
  mutations: {
/////////////// 게시글 정보, 선택한 게시글정보, 댓글정보 //////////////
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    GET_ARTICLE_DETAIL(state, article_data) {
      state.article = article_data
    },
    GET_COMMENTS(state, comments_data) {
      state.comments = comments_data
    },
    CREATE_COMMENT(state, comments_data) {
      state.comments.push(comments_data) // 새로만든 데이터를 넣어준다.
    },
    DELETE_COMMENT(state, comments_data) {
      state.comments.forEach((comment, index)=> {
        if (comment.content === comments_data.content) {
        state.comments.splice(index, 1);
        }
      })
    },
//////////////////////// 영화정보관련 ///////////////////////////////
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
    LIKE_DIRECTOR(state, payload) {
      // console.log(payload)
      state.director_liked = payload.director_liked
      state.director_like_count = payload.director_like_count
    },
    SELECT_DIRECTOR(state, selected_director) {
      // console.log(selected_director)
      state.director = selected_director
    },
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
    getArticleDetail(context, article_id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/${article_id}/`,
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('GET_ARTICLE_DETAIL', res.data)
        })
        .catch((err) => {
          console.log(err)
      })
    },
    /////////////////////댓글/////////////////////////////////////////
    getComments(context, article_id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/${article_id}/comments/`,
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('GET_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createComment(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/${payload[1]}/comments/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          content: payload[0]
        }
      })
        .then((res) => {
          context.commit('CREATE_COMMENT', res.data)
          // console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment(context, payload) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${payload[1]}/comments/${payload[0].id}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          context.commit('DELETE_COMMENT', res.data)
          alert('성공적으로 댓글이 삭제되었습니다!')
        })
        .catch((err) => {
          console.log(err)
          alert('댓글을 지울 권한이 없습니다.')
        })
    },
////////////////////////////////////////////////////////////////
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
///////////////////회원가입 & 로그인 & 로그아웃 & 회원정보///////////////////////////
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
          // console.log(res.data.key)
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
/////////////////////////////////////////////////////////////////////

    selectDirector(context, selectedDirector) {
      context.commit('SELECT_DIRECTOR', selectedDirector)
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
          // console.log(res.data)
          context.commit('LIKE_DIRECTOR', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    searchUp(context, searchData) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/search/${searchData}`,
        data: {
          search_data: searchData,
        },
      })
        .then((res) => {
          console.log(res.data) // 배열로 나온다.
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
