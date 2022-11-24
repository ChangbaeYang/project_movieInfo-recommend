<template>
  <div id="homeMainimg" class="flex">
    <div class="leftMain fixed-left">
      <div style="height: 360px;">
      </div>
      <div>
        <h1 style="padding: 10px;">Picky Movie</h1>
        <p>Pick Your Movie, you really want</p>
        <p>Insommia, you will lose  </p>
        <p>Creative thinking, you can share</p>
        <p>Kill this Movies, We just want</p>
        <p id="you">Y.O.U</p>

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
#you {
  font-size: 30px;
}
h1 {
  font-size: 60px;
}
p {
  font-size: 20px;
}
.leftMain {
  width: 50%;
  height: 1020px;
  background: black;
  color: white;
  float: left;
  box-sizing: border-box;
}
.rightMain {
  width: 50%;
  height: 1020px;
  background:url('../assets/thress.jpeg');
  background-size: cover;
  float: right;
  box-sizing: border-box;
  max-height: 100%;
  max-width: 100%;
  /* display: inline-block; */
}
</style>``