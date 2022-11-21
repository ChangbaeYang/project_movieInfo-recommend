<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호 : {{ article.id }}</p>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <p>작성자 : {{ article.username }}</p>
    <p>작성시간 : {{ article.created_at }}</p>
    <p>수정시간 : {{ article.updated_at }}</p>
    <p>좋아하는 사람 : {{ article.like_users }} -> 몇명좋아하는지로 바꾸자</p>
    <button @click="goBack">뒤로가기</button>
    <router-link :to="{ name: 'updateArticle', params: { id: article.id } }">
      <button>수정</button>
    </router-link>
    <button @click="deleteArticle">삭제</button>
    <hr>
    <p>Comments</p>
    <CommentsListItem
      v-for="comment in articleComments.slice().reverse()"
      :key="comment.id"
      :comment="comment"
      :article="article"
    />
    <form @submit.prevent="createComment">
      <input type="textarea" v-model.trim="comment">
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import CommentsListItem from '@/components/CommentsListItem'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "ArticleDetail",
  components: {
    CommentsListItem,
  },
  data() {
    return {
      article: {
        id: 0, // 에러 방지용 임시.
      },
      comments: [], // 보여줄 댓글
      comment: null,  // 입력되는 댓글
    }
  },
  computed: {
    articleComments() {
      return this.comments 
    },
  },
  created() {
    this.getArticleDetail()
    this.getComments()
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/${this.$route.params.id}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
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
    },
    getComments() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/articles/${this.$route.params.id}/comments/`
      })
        .then((res) => {
          // console.log(res)
          this.comments = res.data // 객체 댓글의 배열이 있다. [{0번댓글}, {1번댓글}, ...]
        })
    },
    createComment() {
      const comment = this.comment
      if (!comment) {
        alert('내용을 입력해주세요')
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/${this.article.id}/comments/`,
        data: {
          content: comment,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.comment = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>