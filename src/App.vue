<template>
  <div id="app">
    <header class="header" v-if="!isAboutPage">
      <h1>饭否每日精选·日历</h1>
      <nav class="inner">
        <ul>
          <router-link
            to="/day/today"
            tag="li">
            今日精选
          </router-link>
          <router-link
            to="/calendar"
            tag="li">
            日历
          </router-link>
        </ul>
      </nav>
    </header>
    <main :class="shouldHaveTopPadding">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
    <foot/>
  </div>
</template>

<script>
const Foot = () => import(
  /* webpackChunkName: "Foot" */
  './components/Foot.vue'
)

export default {
  name: 'app',

  components: {
    Foot
  },

  data () {
    return {}
  },

  computed: {
    isAboutPage () {
      return this.$route.path === '/about'
    },
    shouldHaveTopPadding () {
      return this.isAboutPage
        ? 'content'
        : 'content content--padding-top-80'
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 15px;
}

body {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
  position: relative;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
  font-size: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 0 auto;
}

a {
  &:link,
  &:hover,
  &:active,
  &:visited {
    color: #42b983;
  }
}

@media (min-width: 800px) {
  #app,
  main {
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

.header {
  z-index: 100;
  width: 100%;
  height: 80px;
  background: #46C1FD;
  color: #ffffff;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
}

.header > h1 {
  @include flexbox();
  @include justify-content(center);
  @include align-items(center);
  height: 40px;
  box-sizing: border-box;
  padding: .65rem 0 0 0;
  font-size: 1.225rem;
}

nav.inner {
  height: 40px;
  box-sizing: border-box;
  padding: .325rem 0 0;
  font-size: 1rem;
}

nav.inner > ul {
  @include flexbox();
  @include flex-flow(row, nowrap);
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
}

nav.inner > ul > li {
  @include flex(1);
  @include flexbox();
  @include align-items(center);
  @include justify-content(center);
  box-sizing: border-box;
  padding: .325rem .325rem 0;
  color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  box-sizing: border-box;
  transition:
    background .3s ease-out,
    color .2s ease-in-out;
}

nav.inner > ul > li:hover{
  background: #ffffff;
  cursor: pointer;
  color: #46C1FD;
}

nav.inner > ul > li.current-page {
  background: #ffffff;
  color: #46C1FD;
}

.content {
  overflow: hidden;
}

.content.content--padding-top-80 {
  padding-top: 80px;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.loading {
  width: 100%;
  height: auto;
  text-align: center;
  padding: 3.225rem 0 0;
}
</style>


