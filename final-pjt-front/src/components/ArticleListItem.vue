<template>
  <div>
    <h5>{{ article.id }}</h5>
    <p>작성자 : {{ article.username }}</p>
    <p>{{ article.title }}</p>
    <p>{{ article.category }}</p>
    <p>{{ categoryType }}</p>
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