<template>
  <div class="card" style="width:18rem">
    <h5 class="card-header">작성자: {{ article.username }}</h5>
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <router-link class="btn btn-primary" :to="{ name: 'articleDetail', params: { id: article.id } }">
        DETAIL
      </router-link>
    </div>
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