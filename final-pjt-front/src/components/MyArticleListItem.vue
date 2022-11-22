<template>
  <div>
    <p>{{ myArticle.content }}</p>
  </div>
</template>

<script>
export default {
  name: "MyArticleListItem",
  props: {
    myArticle: Object,
  }
}
</script>

<style>

</style>