<template>
  <footer class="footer" v-if="!isAboutPage">
    <img :src="iconSrc" class="logo" alt="饭否每日精选·日历">
    <router-link to="/about" tag="div" class="logo__text">
      饭否每日精选·日历&nbsp;
      <span>ABOUT</span>
    </router-link>
  </footer>
</template>

<script>
import icon from '../../assets/icon-144x144.png'

export default {
  name: 'Foot',

  computed: {
    isAboutPage () {
      return this.$route.path === '/about'
    }
  },

  data () {
    return {
      iconSrc: icon
    }
  } 
}
</script>

<style lang="scss" scoped>
.footer {
  min-height: 70px;
  background: #fefefe;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center; 
  justify-content: center; 
  padding: 1.325rem 0;
}
.footer .logo{
  width: 35px;
  height: 35px;
  margin-bottom: .65rem;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background: #e1e1e1;
}
.footer .logo__text {
  display: flex;
  align-items: center;
  font-size: .75rem;
  color: #676869;
  cursor: pointer;
}
.footer .logo__text span {
  font-size: .65rem;
  color: #4DC2FA;
  margin-left: .325rem;
}
.footer .logo__text:hover span {
  text-decoration: underline;
}
</style>


