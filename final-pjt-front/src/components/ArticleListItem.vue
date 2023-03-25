<template>
  <tbody>
    <tr>
      <th scope="row">{{ article.id }}</th>
      <td>{{ article.username }}</td>
      <td colspan="3">
        <router-link :to="{ name: 'articleDetail', params: { id: article.id } }">{{ article.title }}</router-link>
      </td>
      <td>{{ article.created_at}}</td>
    </tr>
  </tbody>
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