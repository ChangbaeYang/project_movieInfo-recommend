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
    createPersistedState(),
  ],
  state: {
    movies: [],
    articles: [],
    actors: [],
    all_comments: [],
    directors: [],
    genres: [],
    // user 정보 관련 -> 로그아웃 시 다 지우기
    token: null, // 유저 토큰, 로그아웃할 때 지워주기
    user_info: null, // 유저 정보, 로그아웃할 때 지워주기
    my_articles: [],
    my_comments: [],
  

    // 인스턴스 정보 관련
    director: null, // 선택한 하나의 감독 정보를 담고 있다.
    director_liked: false, // 유저가 감독을 좋아하는지를 담고 있다.
    director_like_count: 0,
    like_directors: [],
    movie: null, // 선택한 하나의 영화 정보를 담고 있다.
    movie_liked: false,
    movie_like_count: 0,
    like_movies: [],
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
    movie_liked(state) {
      return state.movie_liked
    },
    movie_like_count(state) {
      return state.movie_like_count
    },
    comments(state) {
      return state.comments
    }
  },
  /////////////// 게시글 정보, 선택한 게시글정보, 댓글정보 //////////////
  mutations: {
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    GET_ARTICLE_DETAIL(state, article_data) {
      state.article = article_data
    },
    GET_COMMENTS(state, comments_data) {
      state.comments = comments_data
    },
    GET_ALL_COMMENT(state, all_comments_data) {
      state.all_comments = all_comments_data
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
    LOGOUT_USER(state) {
      state.token = null
      state.user_info = null
      state.my_articles = []
      state.my_comments = []
      state.like_directors = []
      state.like_movies = []
      router.replace('/').catch(() => {})
    },
    GET_USER_INFO(state, user_data) {
      state.user_info = user_data
    },
    LIKE_DIRECTOR(state, payload) {
      // console.log(payload)
      state.director_liked = payload.director_liked
      state.director_like_count = payload.director_like_count
      console.log(payload.director_id)
      if (state.like_directors.includes(payload.director_id)) {
        console.log('hi')
        for (let i = 0; i < state.like_directors.length; i++) {
          if (state.like_directors[i] === payload.director_id) {
            state.like_directors.splice(i, 1)
            i--
          }
        }
      } else {
        state.like_directors.push(payload.director_id)
      }
    },
    LIKE_MOVIE(state, payload) {
      state.movie_liked = payload.movie_liked
      state.movie_like_count = payload.movie_like_count
      if (state.like_movies.includes(payload.movie_id)) {
        for (let i = 0; i < state.like_movies; i++) {
          if (state.like_movies[i] === payload.movie_id) {
            state.like_movies.splice(i, 1)
            i--
          }
        }
      } else {
        state.like_movies.push(payload.movie_id)
      }
    },
    SELECT_DIRECTOR(state, selected_director) {
      // console.log(selected_director)
      state.director = selected_director
      state.director_like_count = selected_director.like_users.length
      if (selected_director.like_users.includes(state.user_info.pk)) {
        // 이미 좋아요를 누른 상태라면
        state.director_liked = true
      } else {
        state.director_liked = false
      }
    },
    SELECT_MOVIE(state, selected_movie) {
      state.movie = selected_movie
      state.movie_like_count = selected_movie.like_users.length
      if (selected_movie.like_users.includes(state.user_info.pk)) {
        state.movie_liked = true
      } else {
        state.movie_liked = false
      }
    },
    CLOSE_DIRECTOR_MODAL(state) {
      state.director = null
    },
    CLOSE_MOVIE_MODAL(state) {
      state.movie = null
    },
/////////////////////////////프로필관련///////////////////////////////////
    GET_MY_ARTICLE(state) {
      let a = true // 분기
      for (let article of state.articles) {
        if (article.username === state.user_info.username) {
          for (let my_article of state.my_articles) {
            if (my_article.id === article.id) {
              a = false
              break
            }
          } 
          if (a) {
            state.my_articles.push(article)
          }
        }
      } 
    },
    GET_MY_COMMENT(state) {
      let b = true
      for (let comment of state.all_comments) {
        // console.log(state.all_comments)
        if (comment.user === state.user_info.pk) {
          for (let my_comment of state.my_comments) {
            if (my_comment.id === comment.id) {
              b = false
              break
            }
          }
          if (b) {
            state.my_comments.push(comment)
          }
        }
      }
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
    getMyArticle(context) {
      context.dispatch('getArticles') // 바로 유저정보에 갔을 경우를 대비한다.
      context.commit('GET_MY_ARTICLE')
    },
    getAllComment(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/comments/`
      })
      .then((res) => {
        // console.log(res)
        context.commit('GET_ALL_COMMENT', res.data)
      })
    },
    getMyComment(context){
      context.dispatch('getAllComment')
      context.commit('GET_MY_COMMENT')
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
        .then(() => {
          axios({
            method: 'get',
            url: `${API_URL}/api/v3/userLikeMovie/${this.state.user_info.pk}/`,
            headers: { // 아니라면 지우기
              Authorization: `Token ${context.state.token}`
            },
          })
          .then(() => {
            // console.log(res)
          })
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
          alert('성공적으로 로그인되었습니다!')
          context.commit('SAVE_TOKEN', res.data.key)
          this.dispatch('getUserInfo')
        })
        .error((err) => {
          console.log(err)
          // alert('로그인정보가 잘못되었습니다!')
        })
    },
    logOut(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
      })
        .then(() => {
          context.commit('LOGOUT_USER')
        })
    },
/////////////////////////////////////////////////////////////////////
    selectDirector(context, selectedDirector) {
      // console.log(selectedDirector)
      context.commit('SELECT_DIRECTOR', selectedDirector)
    },
    selectMovie(context, selectedMovie) {
      context.commit('SELECT_MOVIE', selectedMovie)
    },
    likeDirector(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/directors/${payload}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        },
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('LIKE_DIRECTOR', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    likeMovie(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/movies/${payload}/like/`, // payload에는 movie.id가 들어있다.
        headers: {
          Authorization: `Token ${this.state.token}`
        },
      })
        .then((res) => {
          context.commit('LIKE_MOVIE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    searchUp(context, searchData) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/search/${searchData}`,
        data: {
          search_data: searchData,
        },
      })
        .then(() => {
          // console.log(res.data) // 배열로 나온다.
        })
        .catch((err) => {
          console.log(err)
        })
    },
  })
