<template>
  <div class="container">
    <section class="row">
      <ActorListItem
        v-for="actor in actors"
        :key="actor.id"
        :actor="actor"
      />
    </section>
  </div>
</template>

<script>
import ActorListItem from '@/components/ActorListItem'

export default {
  name: "ActorLists",
  components: {
    ActorListItem,
  },
  computed: {
    actors() {
      return this.$store.state.actors
    }
  },
}
</script>

<style>

</style>