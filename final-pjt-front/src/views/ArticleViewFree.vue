<template>
  <div>
    <h3>자유 게시판</h3>
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem';

export default {
  name: "ArticleViewFree",
  data() {
    return {
      articles: [],
    }
  },
  components: {
    ArticleListItem,
  },
  created: {
    FreeArticle() {
      for (let article in this.$store.state.articles) {
        console.log(article)
        if (article.category === 1) {
          this.articles.push(article)
        }
      }
    }
  },
}
</script>

<style>

</style>