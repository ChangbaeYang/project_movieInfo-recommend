<template>
  <div style="margin-left:150px; margin-right:150px;">
    <h3>HELP</h3>
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
  name: 'ArticleViewHelp',
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