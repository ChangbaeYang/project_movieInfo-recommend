<template>
  <div>
    <h1>Actors</h1>
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

</style>