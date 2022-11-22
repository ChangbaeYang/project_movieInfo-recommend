<template>
  <div>
    <MyArticleListItem
      v-for="myArticle in myArticles"
      :key="myArticle.id"
      :myArticle="myArticle"
    />
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