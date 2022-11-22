<template>
  <div>
    <p>내용 : {{ comment.content }}</p>
    <p>작성시간 : {{ comment.created_at }}</p>
    <p>수정시간 : {{ comment.updated_at }}</p>
    <p>작성자 : {{ username }}</p>
    <div>
      <button @click="deleteComment">삭제</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "CommentsListItem",
  data() {
    return {
      username: this.$store.state.user_info.username
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