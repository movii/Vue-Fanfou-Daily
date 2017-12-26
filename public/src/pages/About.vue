<template>
  <div>
    <header class="about__header" style="">
      <div class="btn__contain">
        <a href="" class="btn__back"  @click.prevent="$router.go(-1)">返回</a>
      </div>
      <img class="logo" :src="iconSrc" style="border: none;" />
      <div class="logo__span" style="color: #ffffff;">饭否每日精选·日历</div>
    </header>
    <article class="about__contain" style="margin-top: .125rem;">
      <h3 class="title">🙏🏻 感谢: </h3>

      <span class="text">
        &bull;&nbsp;鸣谢 Z 姐（@小脸儿）无偿提供的 logo；<br/> 
        &bull;&nbsp;断断续续向 rex 大（@.rex）请教了不少问题，都耐心一一解答，👍；<br/>
        &bull;&nbsp;之前在开发小程序过程中帮助测试反馈的各位小伙伴（奶瓶 @小小小奶瓶 同学发现了很多 bug，尤其感谢）。</span>

      <h3 class="title">☃️ 数据来源: </h3>
      <span class="text" selectable> 数据采集于饭否 Blog 中的「饭否每日精选」，也就是官方的数据来源。对应链接：<a href="http://blog.fanfou.com/digest/">http://blog.fanfou.com/digest/</a>。 </span>

      <h3 class="title">👨🏻‍💻️ Github: </h3>
      <span class="text">
        <a href="https://github.com/movii/vue-fanfou-daily">vue-fanfou-daily</a>，爬虫和前端部分都包含其中，看 README 吧，需要配合 LeanCloud 一起食用。
      </span>

      <h3 class="title" style="margin-bottom: 0; margin-top: 2.325rem;">胡椒</h3>
      <span class="text" style="margin-top: 0;">2017-09-04</span>
    </article>
  </div>
</template>

<script>
import icon from '../../assets/icon-144x144.png'

export default {
  name: 'about',

  data () {
    return {
      iconSrc: icon
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/mixin/flexbox.scss';

header.about__header {
  @include flexbox();
  @include flex-flow(column, nowrap);
  @include justify-content(center);
  @include align-items(center);

  margin-bottom: .125rem; 
  background: #4DC2FA;
  box-sizing: border-box;
  padding: 0 0 1.325rem 0;
}

.about__header .btn__contain {
  @include flexbox();
  @include flex-flow(row, nowrap); 
  @include align-items(center);
  @include justify-content(center);
  width: 100%;
  padding: .65rem;
  box-sizing: border-box;
}

.about__header .btn__contain .btn__back {
  color: #ffffff;
  text-decoration: none;
  margin-right: auto;
}

.about__header .logo{
  width: 55px;
  height: 55px;
  display: inline-block;
  border-radius: 50%;
  margin-bottom: 1rem;
  background: #e1e1e1;
}

.about__header .logo__text {
  display: flex;
  align-items: center;
  font-size: .75rem;
  color: #676869;
}

.about__header .logo__text span {
  font-size: .65rem;
  color: #4DC2FA;
  margin-left: .325rem;
}

.about__contain {
  padding: .65rem;
}

.about__contain h3.title {
  font-size: 1.025rem;
  margin-top: 1rem;

  &:first-child {
    margin-top: 0px;
  }
}

.about__contain  .text {
  display: block;
  font-size: 1rem;
  margin-bottom: .325rem;
  line-height: 1.5rem;
}

.about__contain .text.bold {
  font-weight: bolder;
}
</style>
