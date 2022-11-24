<template>
  <div class="mb-3" style="margin-top:2px; margin-left:500px; margin-right:500px;">
    <input class="form-control" id="title" :value="myComment.content" disabled readonly>
    <p style="font-size:5px; margin-bottom: 0px;">created at : {{ myComment.created_at }}</p>
    <p style="font-size:10px; margin-bottom: 0px;">updated at : {{ myComment.updated_at }}</p>
  </div>
</template>

<script>
export default {
  name: "MyCommentListItem",
  props: {
    myComment: Object,
  },
  methods: {
      deleteComment() {
        this.$emit('delete-comment', this.myComment)
    }
  }
}
</script>

<style>

</style>