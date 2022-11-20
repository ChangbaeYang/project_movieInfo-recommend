<template>
  <div>
    <h3>토론게시판</h3>
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
  name: 'ArticleViewDebate',
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      let articles = [] 
      let inputArticles = this.$store.state.articles
      // console.log(inputArticles)
      for (let article of inputArticles) {
        // console.log(article)
        if (article.category === 2) {
          articles.push(article)
        } 
      }
      return articles
    }
  }
}
</script>

<style>

</style>