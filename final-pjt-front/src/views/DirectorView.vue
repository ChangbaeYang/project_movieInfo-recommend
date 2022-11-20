<template>
  <div>
    <h1>Director</h1>
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

</style>