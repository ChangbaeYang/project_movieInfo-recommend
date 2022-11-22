<template>
  <div>
    <MyCommentListItem/>
  </div>
</template>

<script>
import MyCommentListItem from '@/components/MyCommentListItem';

export default {
  name: "MyCommentList",
  components: {
    MyCommentListItem,
  },
  computed: {
    myComments() {
      return this.$store.state.my_comments
    }
  },
  created() {
    this.$store.dispatch('getMyComment')
  }
}
</script>

<style>

</style>