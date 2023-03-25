<template>
  <div>
    <h3>My Articles</h3>
    <div style="margin-left:150px; margin-right:150px;">
    <h3>ALL</h3>
      <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th scope="col">num</th>
          <th scope="col">writer</th>
          <th scope="col" colspan="3">title</th>
          <th scope="col">created at</th>
        </tr>
      </thead>
        <MyArticleListItem
          v-for="myArticle in myArticles"
          :key="myArticle.id"
          :myArticle="myArticle"
        />
      </table>
    </div>
  </div>
</template>

<script>
import MyArticleListItem from '@/components/MyArticleListItem';

export default {
  name: "MyArticleList",
  components: {
    MyArticleListItem,
  },
  computed: {
    myArticles() {
      return this.$store.state.my_articles
    }
  },
  created() {
    this.$store.dispatch('getMyArticle')
  }
}
</script>

<style>

</style>