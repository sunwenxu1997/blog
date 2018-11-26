<template>
  <aside class="side-nav">
    <router-link to="/list" class="link">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
      <p class="descript">列表</p>
    </router-link>
    <router-link to="/tags" class="link">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-youhui"></use>
      </svg>
      <p class="descript">标签</p>
    </router-link>
    <router-link to="/readinglists" class="link">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_yulan"></use>
      </svg>
      <p class="descript">阅读</p>
    </router-link>
    <router-link to="/about" class="link">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_zhanghao"></use>
      </svg>
      <p class="descript">关于我</p>
    </router-link>
  </aside>
</template>

<script>
  export default {

  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import '../../assets/style/variable';
  .side-nav {
    float: left;
    @include flex($flow: column wrap);
    font-size: 1.6rem;
    height: calc(100% - 3em);
    width: 4em;
    background: $base;
  }

  .link {
    @include flex($flow: column wrap);
    margin-bottom: 3em;
    width: 100%;
    transition: 0.3s ease;
    border-left: 0px solid transparent;
    .icon {
      fill: rgb(125, 242, 250);
      width: 1.5em;
      height: 1.5em;
      transition: 0.5s;
      margin-top: 0.5em;
    }
    .descript {
      color: rgb(125, 242, 250);
      font-size: 1rem;
      margin: 0px;
      line-height:30px;
    
    }
    &:hover {
      border-left: 2px solid white;
    }
    &:hover > .icon {
      fill: white;
    }
    &:hover > .descript {
       transition: 0.3s;
      color: white;
    }
  }
  .router-link-active {
    border-left: 2px solid $white;
    .icon {
      fill: $white;
    }
    .descript {
      color: $white;
    }
  }
</style>
