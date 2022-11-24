import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '@/views/MovieView'
import ArticleView from '@/views/ArticleView'
import MyProfile from '@/views/MyProfile'
import LoginView from '@/views/LoginView'
import SignUpView from '@/views/SignUpView'
import ArticleDetail from '@/views/ArticleDetail'
import ArticleList from '@/views/ArticleList'
import SearchResultView from '@/views/SearchResultView'
import NotFound404 from '@/views/NotFound404'
import HomeView from '@/views/HomeView'
// import GetInView from '@/views/GetInView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  // {
  //   path: '/LogIn&SignUp',
  //   name: 'GetInView',
  //   component: GetInView,
  // },
  {
    path: '/movies', // 메인페이지 바뀌면 바꾸기
    name: 'movies',
    component: MovieView
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: SearchResultView
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticleView,
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        component: ArticleList
      },
      {
        path: 'articleFree',
        name: 'articleFree',
        component: () => import('@/views/ArticleViewFree')
      },
      {
        path: 'articleDebate',
        name: 'articleDebate',
        component: () => import('@/views/ArticleViewDebate')
      },
      {
        path: 'articleHelp',
        name: 'articleHelp',
        component: () => import('@/views/ArticleViewHelp')
      }
    ]
  },
  {
    path: '/createArticle',
    name: 'createArticle',
    component: () => import('@/views/CreateArticleView')
  },
  {
    path: '/articles/:id',
    name: 'articleDetail',
    component: ArticleDetail,
  },
  {
    path: '/articles/:id/update',
    name: 'updateArticle',
    component: () => import('@/views/UpdateArticleView')
  },
  {
    path: '/actors',
    name: 'actors',
    component: () => import('@/views/ActorView')
  },
  {
    path: '/directors',
    name: 'directors',
    component: () => import('@/views/DirectorView')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/profile',
    name: 'profile',
    component: MyProfile,
    children: [
      {
        path: 'recommendation',
        name: 'recommendation',
        component: () => import('@/views/MyRecommendation')
      },
      {
        path: 'myArticles',
        name: 'myArticles',
        component: () => import('@/views/MyArticleList')
      },
      {
        path: 'myComments',
        name: 'myComments',
        component: () => import('@/views/MyCommentList')
      },
      {
        path: 'myReviews',
        name: 'myReviews',
        component: () => import('@/views/MyReviewList')
      },
      {
        path: 'myLikes',
        name: 'myLikes',
        component: () => import('@/views/MyLikeList')
      },
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: NotFound404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
