<template>
    <header class="nav-container">
  <nav class="site-nav">
            <router-link :to="{path: '/articles'}" class="nav-title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-huangguan"></use>
                 </svg>
                <span class="title">&nbsp;Booke</span>
            </router-link>
            <ul class="site-nav-list">
                <li>
                    <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
                </li>
                <li>
                    <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">归档</a>
                </li>
                <li>
                    <a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">标签</a>
                </li>
                <li>
                    <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读列表</a>
                </li>
                <li>
                    <a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">关于我</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  //动态绑定父元素的数据变换
  props: ["maskFlag"],
  data() {
    return {
      isMaskShow: false
    };
  },
  methods: {
    toggleMask() {
      this.isMaskShow = !this.isMaskShow;
    },
    jump(evt) {
      const path = evt.target.name;
      switch (path) {
        case "articles":
          this.$router.push({ path: `/${path}`});
          break;
        case "archives":
          this.$router.push("/archives");
          break;
        case "tags":
          this.$router.push("/tags");
          break;
        case "lists":
          this.$router.push("/lists");
          break;
        case "about":
          this.$router.push("/about");
          break;
        default:
          break;
      }
    }
  },
  watch: {
    maskFlag() {
      this.isMaskShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";
.icon{
  width: 1.5em;
  height: 1.5em;
}
.nav-container {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  //  background: $white;
  background: linear-gradient(to bottom,white 50%,$white 100%);
}
.site-nav {
  position: relative;
  margin: 0 auto;
  @include flex($justify: space-between);
  z-index: 2;
  padding: 0.5em 0;
  height: 4em;
  width: 95%;
  max-width: 850px;
  font-size: 1.6rem;
  // background: $white;
  .site-nav-list {
    @include flex;
    font-size: 14px;
  }
  .nav-title {
    @include flex;
    .logo {
      width: 2.5em;
      height: 2.5em;
      margin-right: 0.5em;
    }
    .title {
      font: {
        size: 2rem;
        family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
      }
      letter-spacing: 0.1em;
    }
  }
  .nav-menu {
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid $word;
    border-radius: 2px;
    fill: $word;
  }
}

.mask-nav {
  z-index: 1;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 235px;
  font-size: 1.6rem;
  padding: 4.5em 1.5em 4em 1.5em;
  background: #f9f9f9;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.25);
  .mask-nav-list {
    li {
      font-size: 1.4rem;
      margin-bottom: 0.8em;
    }
  }
}

[class$="nav-list"] {
  padding: 0;
  list-style: none;
  a {
    padding-bottom: 0.2em;
    margin: auto 0.5em;
     border-bottom: 2px solid transparent;
     transition: 0.3s;
    cursor: pointer;
    &:hover {
      // @include chosen-item;
      border-bottom: 2px solid rgb(171, 204, 248);
    }
  }
  .active {
    @include chosen-item;
  }
}


@media screen and (max-width: 480px) {
  .site-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0.5em;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    .site-nav-list {
      display: none;
    }
    .nav-menu {
      visibility: visible;
    }
  }
}
</style>
