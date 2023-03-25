<template>
  <div style="margin-top: 65px; padding-left:500px; padding-right:500px;">
    <h1 style="margin-bottom:0px;">Create Article</h1>
    <h5>Show your opinion</h5>
    <form @submit.prevent="createArticle">
      <!-- 카테고리 -->
      <label for="category"></label>
      <select style="margin-bottom:14px;" class="form-select" aria-label="Default select example" id="category" v-model="category">
        <option selected>Select option of article</option>
        <option value=0>Free</option>
        <option value=1>Debate</option>
        <option value=2>Help</option>
      </select>
      <!-- 제목 -->
      <div class="mb-3">
        <input v-model.trim="title" class="form-control" id="title" placeholder="Title">
      </div>
      <!-- 내용 -->
      <div class="mb-3">
        <textarea v-model.trim="content" class="form-control" id="content" rows="20" placeholder="Content"></textarea>
      </div>
      <button type="submit" class="btn btn-outline-dark">
        Git Push Idea!
      </button>
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