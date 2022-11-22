<template>
  <div>
    <p>작성자 : {{ article.username }}</p>
    <p>{{ article.title }}</p>
    <router-link :to="{ name: 'articleDetail', params: { id: article.id } }">
      [DETAIL]
    </router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  computed: {
    categoryType() {
      return typeof this.article.category
    }
  }
}
</script>

<style>

</style>