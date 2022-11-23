<template>
  <div class="container">
    <section class="row">
      <DirectorListItem
        v-for="director in directors"
        :key="director.id"
        :director="director"
      />
    </section>
  </div>
</template>

<script>
import DirectorListItem from '@/components/DirectorListItem';

export default {
  name: 'DirectorList',
  components: {
    DirectorListItem,
  },
  computed: {
    directors() {
      return this.$store.state.directors
    }
  },
}
</script>

<style>

</style>