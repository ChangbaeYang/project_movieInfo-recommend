<template>
  <div>
    <h1>검색 결과입니다!</h1>
    {{ search_result }}
  </div>
</template>

<script>
export default {
  name: "SearchResultView",
  computed: {
    search_result() {
      return this.$store.state.search_result
    }
  }
}
</script>

<style>

</style>