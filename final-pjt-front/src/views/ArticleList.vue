<template>
  <div>
    <h3>전체 게시판</h3>
    <ArticleListItem
      v-for="article in articles.slice().reverse()"
      :key="article.id"
      :article="article"
    />
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