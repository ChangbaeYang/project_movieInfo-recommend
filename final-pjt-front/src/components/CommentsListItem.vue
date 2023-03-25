<template>
  <div class="mb-3" style="margin-top:2px;">
    <input class="form-control" id="title" :value="comment.content" disabled readonly>
    <p style="font-size:10px; margin-bottom: 0px;">username : {{ username }}</p>
    <p style="font-size:5px; margin-bottom: 0px;">created at : {{ comment.created_at }}</p>
    <p style="font-size:10px; margin-bottom: 0px;">updated at : {{ comment.updated_at }}</p>
    <div>
      <button class="btn btn-outline-dark btn-sm" @click="deleteComment">삭제</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "CommentsListItem",
  data() {
    return {
      username: this.comment.username
    }
  },
  props: {
    comment: Object,
  },
  methods: {
      deleteComment() {
        this.$emit('delete-comment', this.comment)
    }
  }
}
</script>

<style>

</style>