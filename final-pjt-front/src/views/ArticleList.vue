<template>
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
      <ArticleListItem
        v-for="article in articles.slice().reverse()"
        :key="article.id"
        :article="article"
      />
    </table>
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles
    }
  }
}
</script>

<style>

</style>