<template>
  <div style="margin-top: 65px; padding-left:500px; padding-right:500px;">
    <button class="btn btn-light" @click="goBack" style="float:left; margin-bottom: 2px; font-weight:bold;"> &lt; </button>
    <h5 style="margin-bottom:2px;">Read {{ article.username }}'s idea</h5>
    <form @submit.prevent="Nothing">
      <!-- 제목 -->
      <div class="mb-3" style="margin-top:2px;">
        <input class="form-control" id="title" :value="article.title" disabled readonly>
      </div>
      <!-- 내용 -->
      <div class="mb-3">
        <textarea :value="article.content" class="form-control" id="content" rows="20" disabled readonly></textarea>
      </div>
    </form>
    <div style="width:100%">
      <div style="float:right; width:50%;">
        <p style="font-size: 12px; margin-bottom:0px;">created at: {{ article.created_at }}</p>
        <p style="font-size: 12px; margin-bottom:0px;">updated at: {{ article.updated_at }}</p>
      </div>
      <div style="float:left; width:50%; margin-bottom: 10px;">
        <button type="submit" class="btn btn-outline-dark" style="float:left; margin-right:5px;">
          Like!
        </button>
        <!-- 수정, 삭제 -->
        <button @click="updateArticle" class="btn btn-outline-dark" style="float:left; margin-right:5px;">Edit</button>
        <button @click="deleteArticle" class="btn btn-outline-dark" style="float:left">Delete</button>
      </div>
    </div>
    <!-- 댓글 -->
    <CommentsListItem
      v-for="comment in comments.slice().reverse()"
      :key="comment.id"
      :comment="comment"
      @delete-comment="deleteComment"
    /> 
    <form @submit.prevent="createComment" style="margin-bottom:10px;">
      <div class="mb-3">
        <input type="from-control" v-model.trim="comment">
        <input type="submit" id="submit" value="Push!">
      </div>
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
    nothing() {
      return
    },
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