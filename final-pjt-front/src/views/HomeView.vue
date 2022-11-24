<template>
  <div id="wrap">
    <div class="main_banner">
      <div class="main_l">
        <ul>
          <li><router-link :to="{ name: 'movies' }" style="font-weight:bold;"> Movie </router-link></li> 
          <li><router-link :to="{ name: 'actors' }" style="font-weight:bold;"> Actor </router-link></li>
          <li><router-link :to="{ name: 'directors' }" style="font-weight:bold;"> Director </router-link></li>
          <li><router-link :to="{ name: 'articles' }" style="font-weight:bold;"> Article </router-link></li>
        </ul>
        <div class="header_icon">
          <ul class="xans-element- xans-layout xans-layout-statelogoff ">
            <form @submit.prevent="searchUp">
              </form>
              <li><router-link v-if="!isLogin" :to="{ name: 'login' }"> Login </router-link></li>
              <li><router-link v-if="!isLogin" :to="{ name: 'signup' }"> SignUp </router-link></li>
              <li><router-link v-if="isLogin" :to="{ name: 'profile' }"> Profile </router-link></li>
          </ul>
        </div>
        </div>
      <div class="main_r">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="banner01"><a href=""></a></div>
            </div>
            <div class="swiper-slide">
              <div class="banner01"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
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

html, body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, img {
  margin: 0;
  padding: 0;
}

div {
  display: block;
}

wrap {
    position: relative;
    width: 100%;
    margin: 0 auto 0;
    margin: 0px 0px 0px 0px;
}

.main_banner {
  width: 100%;
  overflow: hidden;
  height: 100vh;
}

.main_banner>div.main_l {
    box-sizing: border-box;
    width: 500px;
    padding: 250px 0 0 2.5%;
    padding-top: 250px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 2.5%;
    background: #adb5bd;
}

.main_banner>div {
    float: left;
    width: 50%;
    height: 100vh;
}

.main_banner>div ul {
    text-align: center;
}
main_banner>div.main_l>ul li {
    position: relative;
}

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}



a {
    text-decoration: none;
    color: #000;
}
user agent stylesheet
a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
li {
    list-style: none;
}

user agent stylesheet
li {
    text-align: -webkit-match-parent;
}
.main_banner>div ul {
    text-align: center;
}
user agent stylesheet
ul {
    list-style-type: disc;
}

.main_banner>div.main_l>ul li span {
    position: Absolute;
    left: 5px;
    top: 8px;
    font-size: 66px;
    font-family: KOMTITP;
    width: 100%;
    text-align: center;
}

.main_banner>div.main_l>ul li a {
    font-size: 66px;
    padding: 0;
    display: inline-block;
    font-weight: 800;
    -webkit-text-stroke: 1px #000;
    text-decoration: none;
    color: #ffffff;
    font-family: KOMTITP;
    position: relative;
    z-index: 999;
}

.main_banner>div.main_l .header_icon {
    width: 70%;
    margin: 5% auto 15px;
}

.main_banner>div.main_l .header_icon ul {
    overflow: hidden;
}

.main_banner>div ul {
    text-align: center;
}

.main_banner>div.main_l .header_icon ul.xans-layout-statelogoff li {
    float: left;
    width: 25%;
    text-align: center;
}

.main_banner>div.main_l .header_icon ul li:first-child {
    background: none;
}

  

.main_banner>div {
    float: left;
    width: 50%;
    height: 100vh;
}

.main_banner>div.main_r .swiper-container {
    height: 100vh;
}

.swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}

.swiper-container-android .swiper-slide, .swiper-wrapper {
    transform: translate3d(0px,0,0);
}

.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}

.swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}

.main_banner>div.main_r .swiper-container .swiper-slide>div.banner01 {
    background-image: url(../assets/35mm_movie_negative.jpg);
}

.main_banner>div.main_r .swiper-container .swiper-slide>div {
    height: 100vh;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-reepeat;
}

.main_banner>div.main_r .swiper-container .swiper-slide a {
    display: block;
    width: 100%;
    height: 100vh;
}

a {
    margin: 0px 0px 10px 10px;
    text-decoration: none;
    color: #000;
}

.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
}




.main_banner>div.main_r .swiper-container .swiper-slide>div {
    height: 80vh;
    width: 100%;
    background-position: right;
    background-size: 100%;
    background-repeat: no-reepeat;
}

.main_banner>div.main_l>ul li a {
    font-size: 66px;
    padding: 0;
    display: inline-block;
    font-weight: 800;
    -webkit-text-stroke: 1px #000;
    text-decoration: none;
    color: #ffffff;
    font-family: KOMTITP;
    position: relative;
    z-index: 999;
}

.main_banner>div.main_l>ul li span {
    position: Absolute;
    left: 5px;
    top: 8px;
    font-size: 66px;
    font-family: KOMTITP;
    width: 100%;
    text-align: center;
}

.main_banner>div.main_l .header_icon a {
    font-weight: 700;
    font-size: 44px;
    text-decoration: none;
    font-family: LondrinaSolid;
    color: #fff;

    div {
        width: 100%;
        height: 300px;
        border: 1px solid #000;
    }
}
</style>