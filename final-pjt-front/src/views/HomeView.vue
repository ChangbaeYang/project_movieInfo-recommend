<template>
  <div id="homeMainimg" class="flex">
    <div class="leftMain">
      <div>
        <!-- <p>Picky Movie</p>
      <p>Pick your movie with</p>
      <p>Infinite Scroll, you can get</p>
      <p>Creative Thinking, you can share</p>
      <p>Kill this time with us, We are for</p>
      <p>Y.O.U</p> -->
      </div>
    </div>
    <div class="rightMain"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {
    this.$store.dispatch('getMovies')
    this.$store.dispatch('getActors')
    this.$store.dispatch('getDirectors')
  }
}
</script>

<style>
#homeMainimg {
  width: 100%;
}
.leftMain {
  width: 50%;
  height: 1020px;
  background: black;
  color: white;
  display: inline-block;
}
.rightMain {
  width: 50%;
  height: 1020px;
  background:url('../assets/thress.jpeg');
  background-size: cover;
  /* max-height: 100%; */
  max-width: 100%;
  display: inline-block;

}
</style>``