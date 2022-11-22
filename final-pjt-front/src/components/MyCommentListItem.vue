<template>
  <div>
    <p>{{ myComment.content }}</p>
  </div>
</template>

<script>
export default {
  name: "MyCommentListItem",
  props: {
    myComment: Object,
  }
}
</script>

<style>

</style>