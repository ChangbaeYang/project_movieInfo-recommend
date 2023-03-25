<template>
  <div class="container">
    <section class="row">
      <DirectorListItem
        v-for="director in director_page"
        :key="director.id"
        :director="director"
      />
    </section>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral"></infinite-loading>
  </div>
</template>

<script>
import DirectorListItem from '@/components/DirectorListItem'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'


export default {
  name: 'DirectorList',
  components: {
    DirectorListItem,
    InfiniteLoading
  },
  data() {
    return {
      page: 0,
      director_page: [],
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page += 10
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/directors/page/${this.page}`,
      })
      .then(response => {
        setTimeout(() => {
          if (response.data.length) {
            this.director_page = this.director_page.concat(response.data)
            $state.loaded()
            this.page += 10
            if (this.director_page.length / 10 == 0) {
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