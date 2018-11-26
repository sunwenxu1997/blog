<template>
  <nav class="head-nav">
    <div class="logo-container">
       <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan"></use>
          </svg>
    </div>
    <div class="content-container">
      <section>
        <h4 class="title">
          孙大旭 Blogs
        </h4>
      </section>
      <a class="log-out" @click="logout">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-chehuisekuai"></use>
        </svg>
        <span>&nbsp;Exit</span>
      </a>
    </div>
  </nav>
</template>

<script>
  import request from '@/utils/request'
  import { removeToken } from "@/utils/auth"
  export default {
    data(){
      return {

      }
    },
    methods:{
      logout(){
        request({
          url:'/logout',
          method:'get'
        }).then(res=>{
          if(res.success == true){
            this.$store.commit('SET_TOKEN','')
            removeToken()
            location.reload();//强制刷新一下当前页面，重新判断下是否具备权限.
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import '../../assets/style/variable';
  .head-nav {
    font-family: KaiShu, Arial, sans-serif;
    @include flex($justify: flex-start);
    font-size: 1.6rem;
    height: 3.5em;
    .logo-container {
      @include flex;
      width: 3em;
      height: inherit;
      border-bottom: 2px solid #ccc;
    }
    .content-container {
      @include flex($justify: space-between);
      padding: 0.5em;
      height: 100%;
      width: calc(100% - 50px);
      border-bottom: 2px solid #ccc;
      .log-out {
        @include flex;
      }
    }
    h4 {
      @include flex;
      margin: 0;
    }
    .subhead {
      width: 130px;
    }
    .log-out {
      cursor: pointer;
      .icon{
        position: relative;
        top: -1px;
      }
    }
  }
</style>

