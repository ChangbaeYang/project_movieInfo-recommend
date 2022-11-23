<template>
  <div>
    <h1 id="title">Directors</h1>
    <DirectorList/>
  </div>
</template>

<script>
import DirectorList from '@/components/DirectorList';

export default {
  name: "DirectorView",
  components: {
    DirectorList,
  }
}
</script>

<style>
#title {
  color: rgb(148, 154, 158)
}
</style>