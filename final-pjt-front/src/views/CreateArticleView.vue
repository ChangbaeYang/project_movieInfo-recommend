<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model.trim="content"></textarea><br>
      <label for="category">게시판 : </label>
      <select id="category" v-model="category">
        <option value=1>자유게시판</option>
        <option value=2>토론게시판</option>
        <option value=3>건의게시판</option>
      </select>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateArticleView',
  data() {
    return {
      title: null,
      content: null,
      category: null,
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content
      const category = this.category
      if (!title) {
        alert('제목을 입력해주세요')
        return
      } else if (!content) {
        alert('내용을 입력해주세요')
        return
      } else if (!category) {
        alert('올릴 게시판을 선택해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/`,
        data: {
          title: title,
          content: content,
          category: category,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$router.push({ name: 'articleList' })
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