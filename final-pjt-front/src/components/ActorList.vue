<template>
  <div class="container">
    <section class="row">
      <ActorListItem
        v-for="actor in actor_page"
        :key="actor.id"
        :actor="actor"
      />
    </section>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
  </div>
</template>

<script>
import ActorListItem from '@/components/ActorListItem'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'

export default {
  name: "ActorLists",
    components: {
      ActorListItem,
      InfiniteLoading
    },
  data() {
    return {
      page: 0,
      actor_page: [],
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page += 10
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/actors/page/${this.page}`,
      })
      .then(response => {
        setTimeout(() => {
          if (response.data.length) {
            this.actor_page = this.actor_page.concat(response.data)
            $state.loaded()
            this.page += 10
            if (this.actor_page.length / 10 == 0) {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        }, 1000)
      }). catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>