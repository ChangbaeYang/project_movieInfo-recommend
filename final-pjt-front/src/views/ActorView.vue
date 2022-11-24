<template>
  <div>
    <ActorList style="padding-top:65px;"/>
  </div>
</template>

<script>
import ActorList from '@/components/ActorList'

export default {
  name: 'ActorView',
  components: {
    ActorList,
  },
  created() {
    this.$store.dispatch('getMovies')
  }
}
</script>

<style>
</style>