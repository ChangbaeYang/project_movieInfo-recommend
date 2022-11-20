<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호 : {{ article.id }}</p>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <p>작성시간 : {{ article.created_at }}</p>
    <p>수정시간 : {{ article.updated_at }}</p>
    <button @click="goBack">뒤로가기</button>
    <router-link :to="{ name: 'updateArticle', params: { id: article.id } }">
      <button>수정</button>
    </router-link>
    <button @click="deleteArticle">삭제</button>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
export default {
  name: "ArticleDetail",
  data() {
    return {
      article: {
        id: 0 // 에러 방지용 임시.
      },
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/${this.$route.params.id}`
      })
        .then((res) => {
          this.article = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goBack() {
      this.$router.push({ name: 'articles' })
    },
    deleteArticle() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${this.$route.params.id}`
      })
        .then((res) => {
          this.article = res.data
          this.$router.push({ name: 'articles' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>