<template>
  <div>
    <h5>{{ article.id }}</h5>
    <p>작성자 : {{ article.username }}</p>
    <p>{{ article.title }}</p>
    <p>{{ article.category }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  }
}
</script>

<style>

</style>