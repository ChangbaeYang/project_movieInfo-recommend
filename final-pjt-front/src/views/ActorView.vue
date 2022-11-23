<template>
  <div>
    <h1 id="title">Actors</h1>
    <ActorList/>
  </div>
</template>

<script>
import ActorList from '@/components/ActorList'

export default {
  name: 'ActorView',
  components: {
    ActorList,
  }
}
</script>

<style>
#title {
  color: rgb(148, 154, 158)
}
</style>