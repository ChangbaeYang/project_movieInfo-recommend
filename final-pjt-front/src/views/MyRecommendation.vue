<template>
  <div>
    <h3>My Recommendation</h3>
  </div>
</template>

<script>
export default {
  name: "MyRecommendation",
  created() {
    this.$store.dispatch('recommendRandomMovie')
  }
}
</script>

<style>

</style>