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
    <!-- <router-link :to="{ name: 'updateArticle', params: { id: article.id } }"> -->
      <button @click="updateArticle" >수정</button>
    <!-- </router-link> -->
    <button @click="deleteArticle">삭제</button>
    <hr>
    <p>Comments</p>
    <CommentsListItem
      v-for="comment in comments.slice().reverse()"
      :key="comment.id"
      :comment="comment"
      @delete-comment="deleteComment"
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
      comment: null,  // 입력되는 댓글
    }
  },
  computed: {
    article() {
      return this.$store.state.article
    },
    comments() {
      if (this.$store.state.comments) {     // 댓글이 있다면 받아오기
        return this.$store.state.comments
      } else {                              // 댓글이 없다면 빈값
        return []
      }
    },
  },
  created() {
    this.getArticleDetail()
    this.getComments()
  },
  methods: {
    getArticleDetail() {
      this.$store.dispatch('getArticleDetail', this.$route.params.id)
    },
    goBack() {
      this.$router.push({ name: 'articles' })
    },
    deleteArticle() {
      // this.$store.dispatch('deleteArticle', this.$route.params.id)
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${this.article.id}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          // console.log(res)
          // context.commit('DELETE_ARTICLE', res.data)
          alert('성공적으로 삭제되었습니다!')
          this.$router.push({ name: 'articles' })
        })
        .catch(() => {
          alert('글을 삭제할 권한이 없습니다.')
        })
    },
    updateArticle() {
      if (this.article.user == this.$store.state.user_info.pk) {
        this.$router.push({ name: 'updateArticle', params: { id:this.article.id }})
      } else {
        alert('수정할 권한이 없습니다.')
      }
    },
    getComments() {
      this.$store.dispatch('getComments', this.$route.params.id)
    },
    createComment() {
      if (!this.comment) {
        alert('내용을 입력하세요~!')
      } else {
        let payload = [this.comment, this.$route.params.id]
        this.$store.dispatch('createComment', payload)
        this.comment = ''
      }
    },
    deleteComment(commentData) {
      let payload = [commentData, this.article.id]
      this.$store.dispatch('deleteComment', payload)
    }
  }
}
</script>

<style>

</style>