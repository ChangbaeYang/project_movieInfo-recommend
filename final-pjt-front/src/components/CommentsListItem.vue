<template>
  <div>
    <p>내용 : {{ comment.content }}</p>
    <p>작성시간 : {{ comment.created_at }}</p>
    <p>수정시간 : {{ comment.updated_at }}</p>
    <div>
      <button>수정</button>
      <button @click="deleteComment">삭제</button>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "CommentsListItem",
  props: {
    comment: Object,
    article: Object,
  },
  methods: {
    deleteComment() { // is not a function -> actions에 보내서 하자
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${this.article.id}/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          console.log('삭제성공')
          console.log(res)
        })
        .error((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>