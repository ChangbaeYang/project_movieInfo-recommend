<template>
  <tbody>
    <tr>
      <th scope="row">{{ myArticle.id }}</th>
      <td>{{ myArticle.username }}</td>
      <td colspan="3">
        <router-link :to="{ name: 'articleDetail', params: { id: myArticle.id } }">{{ myArticle.title }}</router-link>
      </td>
      <td>{{ myArticle.created_at}}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "MyArticleListItem",
  props: {
    myArticle: Object,
  },
  computed: {
    categoryType() {
      return typeof this.myArticle.category
    }
  }
}
</script>

<style>

</style>